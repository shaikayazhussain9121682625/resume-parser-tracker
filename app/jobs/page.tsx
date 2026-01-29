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


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

 
    if (error && error.message) {
      console.error("Fetch jobs error:", error.message);
      return;
    }

    if (data) {
      setJobs(data);
    }
  };

  const addJob = async () => {
    if (!company.trim() || !role.trim()) {
      alert("Company and role are required");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("job_applications")
      .insert({
        company: company.trim(),
        role: role.trim(),
        status,
        applied_date: new Date().toISOString().split("T")[0],
      });

    setLoading(false);

    if (error) {
      alert(`Failed to add job: ${error.message}`);
      return;
    }

 
    setCompany("");
    setRole("");
    setStatus("applied");

   
    fetchJobs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Job Applications
      </h1>

 
      <div className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-3">
          Add Job Application
        </h2>

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 mr-2 mb-2"
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mr-2 mb-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-2"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>

        <br />

        <button
          onClick={addJob}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Saving..." : "Add Job"}
        </button>
      </div>

     
      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No job applications yet.
        </p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-2">{job.company}</td>
                <td className="p-2">{job.role}</td>
                <td className="p-2 capitalize">{job.status}</td>
                <td className="p-2 text-sm text-gray-600">
                  {job.applied_date ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
