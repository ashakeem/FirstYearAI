import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';

const WaitlistSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <div className="mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You&apos;re on the list!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for joining our waitlist. We&apos;ll notify you as soon as we launch. In the meantime, check your email for updates and exclusive content.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default WaitlistSuccess; 