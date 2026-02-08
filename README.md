# Resume Parser & Job Application Tracker

A modern full-stack web application that allows users to upload resumes, extract candidate details using OpenAI, and track job applications in a unified dashboard.

This project was developed as part of a full-stack development assignment to demonstrate API integration, structured data extraction, database usage, and clean UI implementation.

---

## 🚀 Features

### Resume Upload & Parsing

* Upload resumes in **PDF or image format**
* Resume content is parsed using **OpenAI API**
* Extracted candidate details include:

  * Full Name
  * Email
  * Phone Number
* Parsed data is stored in the database
* Uploaded resumes are listed with extracted data

### Job Application Tracking

* Add job applications
* Track:

  * Company Name
  * Job Role
  * Status (Applied, Interview, Offer, Rejected)
  * Applied Date
* Delete applications with in-app confirmation UI

### Dashboard Overview

* Total resumes parsed
* Total job applications
* Recent resumes list

### UI & UX

* Responsive layout for desktop and mobile
* Hover interactions and cursor feedback
* Smooth page transitions
* Professional UI styling

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Framer Motion (page transitions)

### Backend

* Next.js API routes
* Supabase Database
* OpenAI API

### Validation

* Zod schema validation for structured output

---

## 📁 Project Folder Structure

```text
resume-parser-tracker/
├── app/
│ ├── api/
│ │ └── parse-resume/
│ │ └── route.ts
│ │
│ ├── dashboard/
│ │ └── page.tsx
│ ├── jobs/
│ │ └── page.tsx
│ ├── resumes/
│ │ └── page.tsx
│ ├── upload/
│ │ └── page.tsx
│ │
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
│
├── components/
│ ├── Navbar.tsx
│ └── PageTransition.tsx
│
├── lib/
│ └── supabase.ts
│
├── public/
│ ├── file.svg
│ ├── globe.svg
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
│
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd resume-parser-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a file named .env.local in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
```

⚠️ Important:

Never commit .env.local to GitHub

.gitignore already prevents this

### 4. Run Development Server

```bash
npm run dev
```

Open the app at:

[http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema Example

```sql
create table resumes (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  raw_text text,
  created_at timestamp with time zone default now()
);

create table job_applications (
  id uuid primary key default gen_random_uuid(),
  company text,
  role text,
  status text,
  applied_date date,
  resume_id uuid references resumes(id),
  created_at timestamp with time zone default now()
);
```

## 📹 Submission Checklist

Submission includes:

GitHub repository containing source code

README file with setup instructions

Demo video showing:

Resume upload

Parsed resume data displayed

Job application tracking workflow

## 🔒 Security Notes

API keys stored in .env.local

Keys never exposed to frontend

.env.local ignored by Git

Safe for GitHub publishing

## 📌 Assumptions & Trade-offs

Single-user environment assumed

Authentication not implemented

Focus is on parsing and tracking functionality

Resume files themselves are not stored, only extracted data

## ✨ Possible Future Improvements

User authentication

Resume file storage

Advanced filtering/search

Analytics dashboard

Resume preview viewer

Export parsed data

## 🧑‍💻 Author

Developed as part of a Full Stack Developer assignment demonstrating:

Next.js full-stack architecture

API integration

Structured data parsing

Database integration

Responsive UI development

## 📜 License

This project is licensed under the MIT License.


