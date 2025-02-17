import Form from "../components/auth/Form"

const Signup = () => {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          
          <Form route="/api/user/signup/" method="signup" />
        </div>
      </div>

      {/* Right side - Image and Text */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Student studying"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative p-8 flex flex-col justify-center">
          <blockquote className="mb-6">
            <p className="text-xl sm:text-2xl font-medium text-indigo-100 italic">
              "The best investment you can make is in yourself."
            </p>
            <footer className="mt-2 text-indigo-200">- Warren Buffett</footer>
          </blockquote>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <svg className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white text-sm sm:text-base">Personalized career guidance</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white text-sm sm:text-base">Access to curated resources</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white text-sm sm:text-base">Community support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup