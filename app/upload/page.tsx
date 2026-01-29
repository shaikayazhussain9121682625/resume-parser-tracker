"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
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
      alert("Resume parsed and saved!");
    } else {
      alert("Failed to parse resume");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upload Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mt-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Parsing..." : "Upload & Parse"}
      </button>
    </div>
  );
}
