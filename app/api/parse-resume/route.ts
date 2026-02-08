export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log("===== API HIT =====");

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("File received:", file.name);

    // Convert file to base64
    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const base64 = buffer.toString("base64");

    console.log("Sending PDF to OpenAI...");

    // Send PDF directly to OpenAI
    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        messages: [
          {
            role: "system",
            content:
              'Extract full_name, email and phone from this resume. Return ONLY JSON: {"full_name":"","email":"","phone":""}',
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract candidate details.",
              },
              {
                type: "file",
                file: {
                  filename: file.name,
                  file_data: `data:application/pdf;base64,${base64}`,
                },
              },
            ],
          },
        ],
      });

    console.log("OpenAI response received");

    const content =
      completion.choices[0].message.content || "{}";

    const match =
      content.match(/\{[\s\S]*\}/);

    const data = match
      ? JSON.parse(match[0])
      : {};

    const full_name =
      data.full_name || "Unknown";
    const email =
      data.email || "Not found";
    const phone =
      data.phone || "Not found";

    console.log("Parsed:", full_name, email, phone);

    await supabase.from("resumes").insert({
      full_name,
      email,
      phone,
    });

    console.log("Saved successfully");

    return NextResponse.json({
      success: true,
      data: { full_name, email, phone },
    });

  } catch (err) {
    console.error("Parsing failed:", err);

    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
