"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  company: string;
  role: string;
  status: string;
  applied_date: string | null;
};

export default function JobApplicationsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setJobs(data);
  };

  const addJob = async () => {
    if (!company.trim() || !role.trim()) return;

    setLoading(true);

    await supabase.from("job_applications").insert({
      company,
      role,
      status,
      applied_date: new Date().toISOString().split("T")[0],
    });

    setCompany("");
    setRole("");
    setStatus("applied");
    setLoading(false);
    fetchJobs();
  };

  const requestDelete = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    await supabase
      .from("job_applications")
      .delete()
      .eq("id", deleteId);

    setShowModal(false);
    setDeleteId(null);
    fetchJobs();
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700";
      case "interview":
        return "bg-yellow-100 text-yellow-700";
      case "offer":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-purple-100 px-4 md:px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Job Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Track companies and monitor application status.
          </p>
        </div>

        {/* Add Job */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-10 hover:shadow-xl transition">

          <h2 className="text-lg font-semibold mb-5">
            Add Job Application
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none hover:border-indigo-400 transition"
            />

            <input
              placeholder="Role / Position"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none hover:border-indigo-400 transition"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none hover:border-indigo-400 transition cursor-pointer"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

          </div>

          <button
            onClick={addJob}
            disabled={loading}
            className="mt-6 px-8 py-3 rounded-lg text-white font-semibold
              bg-linear-to-r from-indigo-600 to-blue-600
              hover:scale-105 hover:shadow-lg transition cursor-pointer"
          >
            {loading ? "Saving..." : "Add Job"}
          </button>

        </div>

        {/* Job Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {jobs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No job applications yet.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm">
                  <tr>
                    <th className="p-4 text-left">Company</th>
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Applied Date</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-t hover:bg-indigo-50 transition cursor-pointer"
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        {job.company}
                      </td>

                      <td className="p-4 text-gray-700">
                        {job.role}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td className="p-4 text-gray-500 text-sm">
                        {job.applied_date ?? "-"}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => requestDelete(job.id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

      {/* Delete Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">

            <h2 className="text-lg font-semibold mb-2">
              Delete Application
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this job entry?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
