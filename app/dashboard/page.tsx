import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: jobs } = await supabase
    .from("job_applications")
    .select("*");

  const resumeCount = resumes?.length || 0;
  const jobCount = jobs?.length || 0;
  const recentResumes = resumes?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Resume parsing and job tracking summary
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Resume Count */}
          <div
            className="p-6 rounded-xl text-white
            bg-linear-to-r from-indigo-600 to-blue-600
            shadow-md hover:shadow-xl hover:scale-[1.02]
            transition cursor-pointer"
          >
            <p className="opacity-90 text-sm">
              Total Resumes Parsed
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {resumeCount}
            </h2>
          </div>

          {/* Job Count */}
          <div
            className="p-6 rounded-xl text-white
            bg-linear-to-r from-purple-600 to-pink-600
            shadow-md hover:shadow-xl hover:scale-[1.02]
            transition cursor-pointer"
          >
            <p className="opacity-90 text-sm">
              Job Applications
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {jobCount}
            </h2>
          </div>

        </div>

        {/* Recent resumes */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Section Header */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Resumes
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Latest uploaded candidates
            </p>
          </div>

          {recentResumes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No resumes uploaded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4 text-left">Candidate</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Uploaded</th>
                  </tr>
                </thead>

                <tbody>
                  {recentResumes.map((resume) => {
                    const initial =
                      resume.full_name?.charAt(0)?.toUpperCase() || "?";

                    return (
                      <tr
                        key={resume.id}
                        className="border-t hover:bg-indigo-50 transition cursor-pointer"
                      >
                        {/* Candidate */}
                        <td className="p-4 flex items-center gap-3">

                          <div
                            className="w-10 h-10 flex items-center justify-center
                            bg-indigo-600 text-white rounded-full font-bold"
                          >
                            {initial}
                          </div>

                          <span className="font-semibold text-gray-800">
                            {resume.full_name}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="p-4 text-gray-600 break-all hover:text-indigo-600 transition">
                          {resume.email}
                        </td>

                        {/* Phone */}
                        <td className="p-4">
                          <span
                            className="inline-block px-3 py-1
                            bg-green-100 text-green-700
                            rounded-full text-sm font-medium
                            hover:bg-green-200 transition"
                          >
                            {resume.phone}
                          </span>
                        </td>

                        {/* Uploaded Time */}
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(resume.created_at)
                            .toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
