export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    let text = "";
    try {
      text = await file.text();
    } catch {
      text = "";
    }

    const emailMatch = text.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );

    const phoneMatch = text.match(
      /(\+91[\s-]?\d{10}|\b\d{10}\b)/
    );

    const phone = phoneMatch
      ? phoneMatch[0].replace(/\s+/g, "")
      : "Not found";

    let full_name = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[_\-]/g, " ")
      .replace(/resume|cv/gi, "")
      .replace(/\d+/g, "")
      .trim();

    if (!full_name || full_name.length < 3) {
      full_name = "Unknown";
    }

    const { error } = await supabase.from("resumes").insert({
      full_name: full_name.slice(0, 50),
      email: emailMatch?.[0] || "Not found",
      phone,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        full_name,
        email: emailMatch?.[0] || "Not found",
        phone,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
