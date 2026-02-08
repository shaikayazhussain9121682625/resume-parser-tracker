# Resume Parsing Application

A full-stack Resume Parsing application built using **Next.js** and **Supabase**.  
The application allows users to upload resumes and extracts basic information which is then stored and displayed from a database.

---

## Overview

This project demonstrates a basic understanding of frontend development, backend APIs, database integration, authentication, and file storage using modern web technologies.

Users can upload resume files (PDF/DOCX), parse relevant details, and manage resume data through a simple user interface.

---

## Features

- Upload resumes (PDF / DOCX)
- Extract resume text
- Parse basic details:
  - Name
  - Email
  - Phone Number
  - Skills
- Store resume files in Supabase Storage
- Store parsed data in Supabase PostgreSQL
- Optional authentication using Supabase Auth
- Clean and minimal UI

---

## Tech Stack

- Frontend: Next.js (App Router)
- Backend: Next.js API Routes
- Database: Supabase (PostgreSQL)
- Storage: Supabase Storage
- Authentication: Supabase Auth (optional)

---

## Folder Structure

resume-parser-tracker/
│
├── app/
│   ├── api/
│   │   └── parse-resume/
│   │       └── route.ts
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── jobs/
│   │   └── page.tsx
│   │
│   ├── resumes/
│   │   └── page.tsx
│   │
│   ├── upload/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   └── PageTransition.tsx
│
├── lib/
│   └── supabase.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md


---

## Environment Variables

Create a `.env.local` file in the root directory and add the following values:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

---

## Installation

Clone the repository:

git clone https://github.com/your-username/resume-parser.git  
cd resume-parser

Install dependencies:

npm install

Run the development server:

npm run dev

Open the application in your browser:

http://localhost:3000

---

## How It Works

1. User uploads a resume file
2. The file is stored in Supabase Storage
3. Resume text is extracted on the backend
4. Parsed details are saved to the Supabase database
5. Parsed resume information is displayed on the UI

---

## Supabase Configuration

- Uses Supabase free plan
- Storage bucket configured for resume uploads
- Row Level Security (RLS) disabled for demo purposes
- Authentication can be enabled or disabled based on requirement

---

## Limitations

- Resume parsing is basic and rule-based
- No advanced AI or NLP processing
- Designed for demo and evaluation purposes

---

## Future Improvements

- AI-based resume parsing
- Resume-to-job matching
- Resume scoring system
- Admin dashboard for recruiters
- Export parsed data (CSV / JSON)

---

## License

This project is intended for learning, demo, and assessment purposes only.
