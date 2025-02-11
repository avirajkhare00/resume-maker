import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!resumeFile || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!resumeFile.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Convert PDF to text (simplified for MVP)
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const resumeText = resumeBuffer.toString('utf-8');

    // Use OpenAI to optimize the resume
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: "You are a professional resume optimizer. Analyze the job description and optimize the resume content to better match the requirements while maintaining honesty and accuracy."
        },
        {
          role: "user",
          content: `Job Description: ${jobDescription}\n\nResume Content: ${resumeText}`
        }
      ],
    });

    const optimizedContent = completion.choices[0].message.content;

    return NextResponse.json({ 
      success: true,
      optimizedContent 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}
