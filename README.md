# Resume Maker

A modern web application that helps users optimize their resumes for specific job descriptions using OpenAI's GPT model. The app analyzes both the resume and job description to provide tailored suggestions and improvements.

## Features

- Upload PDF resumes
- Input job descriptions
- AI-powered resume optimization
- Clean, modern UI with Tailwind CSS
- Instant feedback and suggestions

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-maker.git
cd resume-maker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [OpenAI API](https://openai.com) - AI-powered resume optimization
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) - PDF text extraction

## Project Structure

```
resume-maker/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── optimize/      # Resume optimization endpoint
│   ├── page.tsx          # Main application page
│   └── layout.tsx        # Root layout
├── public/               # Static assets
└── package.json          # Project dependencies
```

## API Endpoints

### POST /api/optimize
Optimizes a resume based on a job description.

**Request Body:**
- `resume`: PDF file
- `jobDescription`: string

**Response:**
```json
{
  "success": true,
  "optimizedContent": "optimized resume content"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
