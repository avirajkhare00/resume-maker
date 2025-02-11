'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [optimizedContent, setOptimizedContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && !selectedFile.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }
    setFile(selectedFile || null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to optimize resume');
      }

      setOptimizedContent(data.optimizedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            Resume Optimizer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your resume and job description to get AI-powered optimization
          </p>
        </div>

        <div className="card p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Resume (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-hover"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="input-field h-32"
                placeholder="Paste job description here..."
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/50 p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Optimizing...
                </span>
              ) : (
                'Optimize Resume'
              )}
            </button>
          </form>
        </div>

        {optimizedContent && (
          <div className="card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Optimized Resume</h2>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="whitespace-pre-wrap text-sm">{optimizedContent}</pre>
            </div>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(optimizedContent);
                  alert('Content copied to clipboard!');
                } catch (err) {
                  console.error('Failed to copy:', err);
                  alert('Failed to copy content');
                }
              }}
              className="btn btn-success w-full"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
