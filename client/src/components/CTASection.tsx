import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 bg-[#3949ab]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to find your perfect study spot?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-[#eaecf6]">
          Join thousands of students who are finding and booking study spaces with ease.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link href="/study-spaces">
              <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#3949ab] bg-white hover:bg-[#eaecf6]">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <Link href="#how-it-works">
              <Button variant="outline" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#3949ab] border-white hover:bg-[#2e399c]">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
