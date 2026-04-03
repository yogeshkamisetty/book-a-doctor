import DoctorIllustration from "./DoctorIllustration";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-blue-700">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/30 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-400/30 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/90">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              A Healthier Tomorrow Starts Today
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Book Your Doctor
              <br />
              Appointment Online.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
              Schedule your appointment with confidence. Browse doctors, pick a time
              slot, and manage everything in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/find-doctors"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
              >
                Book An Appointment
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
              >
                Call now
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <DoctorIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

