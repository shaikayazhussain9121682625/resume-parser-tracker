"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResumesPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const { data } = await supabase
      .from("resumes")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setResumes(data);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    await supabase
      .from("resumes")
      .delete()
      .eq("id", deleteId);

    setDeleteId(null);
    fetchResumes();
  };

  return (
    <div className="p-6 min-h-screen
      bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Parsed Resumes</h1>
        <p className="text-gray-600 text-sm mt-1">
          AI extracted candidate details
        </p>
      </div>

      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <table className="w-full">
            <thead className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">Candidate</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Uploaded</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {resumes.map((resume) => {
                const initial =
                  resume.full_name?.charAt(0)?.toUpperCase() || "?";

                return (
                  <tr
                    key={resume.id}
                    className="border-t hover:bg-indigo-50 transition cursor-pointer"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center
                        bg-indigo-600 text-white rounded-full font-bold">
                        {initial}
                      </div>

                      <span className="font-semibold text-gray-800">
                        {resume.full_name}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600 break-all">
                      {resume.email}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {resume.phone}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {new Date(resume.created_at).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setDeleteId(resume.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl p-6 w-80">

            <h2 className="text-lg font-semibold mb-2">
              Delete Resume?
            </h2>

            <p className="text-gray-600 text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
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
