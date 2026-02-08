"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-resume", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      showToast();
      setFile(null);
    } else {
      alert("Failed to parse resume");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">

      {/* Notification */}
      {toast && (
        <div
          className="fixed top-6 right-6 w-80 bg-white shadow-xl
          rounded-xl overflow-hidden border animate-slide-in z-50"
        >
          <div className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 flex items-center justify-center
              bg-green-100 text-green-600 rounded-full text-xl">
              ✓
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                Resume Uploaded
              </p>
              <p className="text-sm text-gray-500">
                Resume parsed & saved successfully
              </p>
            </div>
          </div>

          <div className="h-1 bg-green-500 animate-progress"></div>
        </div>
      )}

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2">
          Upload Resume
        </h1>

        <p className="text-gray-500 text-center mb-6">
          PDF or Image resumes supported
        </p>

        {/* Upload Area */}
        <label
          className="flex flex-col items-center justify-center
          border border-gray-300 rounded-xl p-6 cursor-pointer
          hover:border-indigo-500 hover:bg-indigo-50
          transition"
        >
          <span className="text-3xl mb-2">📄</span>

          <p className="font-medium text-gray-700">
            Click to Upload Resume
          </p>

          <p className="text-sm text-gray-500">
            PDF, JPG, PNG supported
          </p>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="hidden"
          />
        </label>

        {file && (
          <p className="text-center mt-4 text-sm text-gray-600">
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl
          bg-indigo-600 text-white font-semibold
          hover:bg-indigo-700 hover:scale-105
          transition"
        >
          {loading ? "Parsing..." : "Upload Resume"}
        </button>

      </div>
    </div>
  );
}
