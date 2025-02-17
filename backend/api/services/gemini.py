import google.generativeai as genai
from django.conf import settings
import json
import re

# Create the model
generation_config = {
    "temperature": 0.9,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
}

class RoadmapGenerator:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            model_name="gemini-pro",
            generation_config=generation_config
        )

    def generate_roadmap(self, user_data):
        try:
            # 1. Generate content
            prompt = self._create_prompt(user_data)
            response = self.model.generate_content(prompt)
            print("Raw response:", response.text)  # Debug log
            
            # 2. Clean the response
            cleaned_text = self._clean_response(response.text)
            print("Cleaned response:", cleaned_text)  # Debug log
            
            # 3. Parse JSON
            roadmap_content = json.loads(cleaned_text)
            print("Parsed JSON:", roadmap_content)  # Debug log
            
            return roadmap_content
            
        except Exception as e:
            print(f"Error: {str(e)}")
            return self._get_fallback_roadmap()

    def _clean_response(self, text):
        # Remove markdown code blocks
        text = re.sub(r'```json\s*', '', text)
        text = re.sub(r'```\s*', '', text)
        return text.strip()

    def _get_fallback_roadmap(self):
        return {
            "milestones": [
                {
                    "title": "Getting Started",
                    "description": "Initial setup and basic concepts",
                    "estimated_hours": 10,
                    "resources": [
                        {
                            "title": "Documentation",
                            "url": "https://docs.example.com",
                            "type": "article"
                        }
                    ],
                    "project": {
                        "title": "Hello World",
                        "description": "Basic setup project"
                    },
                    "assessment": {
                        "checklist": ["Complete basic setup"]
                    }
                }
            ]
        }

    def _create_prompt(self, user_data):
        return f"""You are an expert curriculum designer and educational consultant. 
Create a personalized learning roadmap in JSON format.

USER PROFILE:
Goal: {user_data.get('goal', 'frontend')} development
Current Level: {user_data.get('currentLevel', 'BEGINNER')}
Time Available: {user_data.get('timeCommitment', 10)} hours per week
Interests: {', '.join(user_data.get('primaryInterests', []))}
Learning Style: {user_data.get('learningStyle', 'VISUAL')}

RESPONSE FORMAT:
{{
    "milestones": [
        {{
            "title": "string",
            "description": "string",
            "estimated_hours": number,
            "resources": [
                {{
                    "title": "string",
                    "url": "string",
                    "type": "string"
                }}
            ],
            "project": {{
                "title": "string",
                "description": "string"
            }},
            "assessment": {{
                "checklist": ["string"]
            }}
        }}
    ]
}}

REQUIREMENTS:
- Return ONLY valid JSON
- Include 4-6 milestones
- Each milestone should have 2-3 resources
- Resources should match the learning style
- Time estimates should be realistic
- Include practical projects
- Provide clear success criteria

IMPORTANT: Response must be valid JSON only. No additional text or explanations."""



