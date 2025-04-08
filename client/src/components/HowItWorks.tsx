export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-[#ff5722] font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Find and book study spaces in 3 simple steps
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#eaecf6] text-[#3949ab] text-2xl">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="mt-5 text-xl leading-6 font-medium text-slate-800">1. Search</h3>
              <p className="mt-2 text-base text-slate-500">
                Enter your location, preferred time, and any specific amenities you need for your study session.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#eaecf6] text-[#3949ab] text-2xl">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="mt-5 text-xl leading-6 font-medium text-slate-800">2. Select</h3>
              <p className="mt-2 text-base text-slate-500">
                Browse through available study spaces with real-time seat availability, reviews, and amenities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#eaecf6] text-[#3949ab] text-2xl">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="mt-5 text-xl leading-6 font-medium text-slate-800">3. Book</h3>
              <p className="mt-2 text-base text-slate-500">
                Reserve your spot in advance, receive confirmation, and enjoy a guaranteed study seat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
