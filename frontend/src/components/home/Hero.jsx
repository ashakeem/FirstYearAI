const Hero = ({ navigate }) => {
  return (
    <section className="relative isolate px-4 sm:px-6 lg:px-8 pt-14 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Launch your tech career with confidence
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Get personalized career advice, ask questions about breaking into tech 
            and landing internships, and connect with a supportive community.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('signup')}
              className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 sm:px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Get started
            </button>
            <button
              onClick={() => navigate('login')}
              className="w-full sm:w-auto text-sm font-semibold leading-6 text-gray-900"
            >
              Sign in <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 