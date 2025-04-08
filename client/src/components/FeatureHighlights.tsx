export default function FeatureHighlights() {
  const features = [
    {
      icon: "map-marked-alt",
      title: "Location-Based Recommendations",
      description: "Find study spaces near you or in any area you're planning to visit."
    },
    {
      icon: "clock",
      title: "Real-Time Availability",
      description: "See how many seats are currently available at each location before you go."
    },
    {
      icon: "calendar-alt",
      title: "Easy Booking System",
      description: "Reserve your seat in advance to guarantee availability when you arrive."
    },
    {
      icon: "star",
      title: "User Reviews & Ratings",
      description: "Read authentic feedback from other students to find the perfect spot for you."
    },
    {
      icon: "filter",
      title: "Customizable Filters",
      description: "Filter by amenities like Wi-Fi, power outlets, noise level, and more."
    },
    {
      icon: "bell",
      title: "Availability Alerts",
      description: "Get notified when your favorite study spot has open seats."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-[#ff5722] font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Everything you need for productive study sessions
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-[#3949ab] text-2xl mb-4">
                  <i className={`fas fa-${feature.icon}`}></i>
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
