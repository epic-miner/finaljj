export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Engineering Student",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      quote: "Calm Corners saved me during finals week! I could easily find quiet spots to study without wasting time looking for seats."
    },
    {
      name: "Priya Patel",
      role: "MBA Student",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      quote: "The booking feature is so convenient. I can reserve a spot before my group meetings and know we'll have space to work."
    },
    {
      name: "Arjun Singh",
      role: "Freelance Writer",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.5,
      quote: "As a freelancer, finding quiet places to work was always a challenge until I found this app. The filters help me find exactly what I need."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-[#ff5722] font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            What our users are saying
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow border border-slate-100">
                <div className="flex items-center mb-4">
                  <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={`${testimonial.name} avatar`} />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={
                        i < Math.floor(testimonial.rating)
                          ? "fas fa-star"
                          : i < testimonial.rating
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                      }
                    ></i>
                  ))}
                </div>
                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
