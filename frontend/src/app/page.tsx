import DoctorSearchBar from "@/components/DoctorSearchBar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />

      <section className="pb-4 bg-white">
        <DoctorSearchBar />
      </section>

      <HowItWorks />

      <section id="about" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900">About Us</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
            BookADoctor helps you connect with approved doctors, pick a
            convenient time slot, and manage appointments easily.
          </p>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
            For help, contact us at <span className="font-semibold">support@example.com</span>.
          </p>
        </div>
      </section>
    </div>
  );
}
