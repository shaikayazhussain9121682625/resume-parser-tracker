import Link from "next/link";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">

        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Resume Parser & <br />
            Job Application Tracker
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl">
            Automatically extract candidate information from resumes
            and manage job applications in one professional dashboard.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition text-center cursor-pointer">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="font-semibold mb-2">Upload Resume</h3>
              <p className="text-gray-600 text-sm">
                Upload resumes in PDF or image format.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition text-center cursor-pointer">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-semibold mb-2">AI Parsing</h3>
              <p className="text-gray-600 text-sm">
                AI extracts name, email and phone instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition text-center cursor-pointer">
              <div className="text-3xl mb-4">🗄️</div>
              <h3 className="font-semibold mb-2">Store Data</h3>
              <p className="text-gray-600 text-sm">
                Candidate data stored securely in database.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition text-center cursor-pointer">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Track Jobs</h3>
              <p className="text-gray-600 text-sm">
                Manage job applications efficiently.
              </p>
            </div>

          </div>
        </section>

        {/* PARSED RESULT DEMO */}
        <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Example Parsed Resume Output
          </h2>

          <div className="bg-white shadow-xl rounded-xl p-8 text-left max-w-xl mx-auto">
            <p className="font-semibold mb-2">Candidate Details</p>

            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> Rahul Sharma</p>
              <p><strong>Email:</strong> rahul.sharma@gmail.com</p>
              <p><strong>Phone:</strong> 9876543210</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer">
              <h3 className="font-semibold mb-2">
                Smart Resume Extraction
              </h3>
              <p className="text-gray-600 text-sm">
                AI-powered parsing extracts structured candidate data.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer">
              <h3 className="font-semibold mb-2">
                Application Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Track company applications and statuses in one place.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer">
              <h3 className="font-semibold mb-2">
                Dashboard Insights
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor resumes parsed and job applications easily.
              </p>
            </div>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="flex flex-col items-center pb-24">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Start Parsing Resumes Smarter
          </h2>

          <Link
            href="/upload"
            className="px-10 py-4 rounded-lg text-white font-semibold text-lg
            bg-indigo-600 hover:bg-indigo-700
            hover:scale-105 transition shadow-md cursor-pointer"
          >
            Get Started →
          </Link>
        </section>

      </div>
    </PageTransition>
  );
}
