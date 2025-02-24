const CallToAction = ({ navigate, user }) => {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to accelerate your tech career?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join thousands of students who are already on their way to successful tech careers. Get started today with personalized guidance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 lg:justify-start">
              <button
                onClick={() => navigate('waitlist')}
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Join Waitlist
              </button>
              {/* <button
                onClick={() => navigate(user ? 'dashboard' : 'signup')}
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {user ? 'Dashboard' : 'Get started for free'}
              </button>
              <button
                onClick={() => navigate('login')}
                className={`text-base font-semibold leading-7 text-white ${user ? 'hidden' : ''}`}
              >
                learn more <span aria-hidden="true">→</span>
              </button> */}
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction 