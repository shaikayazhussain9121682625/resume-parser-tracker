import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data, error } = await supabase
    .from("resumes")
    .select("*");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {error && (
        <pre className="mt-4 text-red-600">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      {!error && (
        <p className="mt-4 text-gray-600">
          Resumes in DB: {data?.length ?? 0}
        </p>
      )}
    </div>
  );
}
