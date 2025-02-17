import Form from "../components/auth/Form"

const Login = () => {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
        
          <Form route="/api/token/" method="login" />
        </div>
      </div>

      {/* Right side - Image and Text */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-700 opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="People working"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative p-8 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Start your journey with FirstYear.ai
          </h2>
          <p className="text-base sm:text-lg text-indigo-100">
            Get personalized career advice and connect with a supportive community.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login