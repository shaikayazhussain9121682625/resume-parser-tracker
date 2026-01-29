import { supabase } from "@/lib/supabase";

export default async function ResumesPage() {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to load resumes
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Parsed Resumes
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-500">
          No resumes found.
        </p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {data.map((resume) => (
              <tr key={resume.id} className="border-t">
                <td className="p-3">{resume.full_name}</td>
                <td className="p-3">{resume.email}</td>
                <td className="p-3">{resume.phone}</td>
                <td className="p-3 text-sm text-gray-500">
                  {new Date(resume.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
