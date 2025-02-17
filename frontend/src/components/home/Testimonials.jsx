const testimonials = [
  {
    content: "FirstYear.ai helped me land my dream internship at a top tech company. The roadmap feature was a game-changer!",
    author: "Sarah Chen",
    role: "Software Engineering Intern",
    company: "Tech Giant Corp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The mentorship and community support here is incredible. I learned so much about preparing for technical interviews.",
    author: "Michael Rodriguez",
    role: "Junior Developer",
    company: "StartupX",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The structured learning paths and real-world projects helped me transition into tech smoothly.",
    author: "Alex Kim",
    role: "Software Developer",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  }
]

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hear from our community
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-white p-8 rounded-2xl shadow-sm">
              <blockquote className="text-gray-600 mb-6">"{testimonial.content}"</blockquote>
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt="" />
                <div className="ml-4">
                  <p className="text-base font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials