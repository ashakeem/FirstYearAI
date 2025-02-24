import { SignUp } from "@clerk/clerk-react";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Waitlist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mt-4 flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-xl mx-auto py-12 sm:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Join the Waitlist
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Be the first to access personalized tech career guidance and join our community of aspiring developers.
            </p>
          </div>

          <div className="mt-8">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                  formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500",
                  footerAction: "hidden"
                }
              }}
              afterSignUpUrl="/waitlist-success"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist; 