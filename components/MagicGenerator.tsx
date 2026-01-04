'use client';

import { useState } from 'react';
import { generateComponent, MagicComponentRequest } from '@/lib/magic-service';
import { FloatingInput, RippleButton, GradientCard } from '@/components/EnhancedUI';

export default function MagicGenerator() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<'minimal' | 'modern' | 'glassmorphism' | 'gradient'>('glassmorphism');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a component description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const request: MagicComponentRequest = {
        prompt,
        style,
        theme: 'dark',
        framework: 'react',
      };

      const response = await generateComponent(request);
      setGeneratedCode(response.code);
    } catch (err) {
      setError('Failed to generate component. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter'] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-[#FFD700]">✨</span> Magic Component Generator
        </h1>
        <p className="text-[#B0B0B0] mb-8">Generate beautiful UI components with AI</p>

        <GradientCard className="mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-[#FFD700]">Component Description</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a trading card component with price, change percentage, and buy button"
                className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg px-4 py-3 text-[#E0E0E0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-[#FFD700]">Style</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['minimal', 'modern', 'glassmorphism', 'gradient'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-2 px-4 rounded-lg transition-all text-sm font-bold ${
                      style === s
                        ? 'bg-[#FFD700] text-[#0A0A0A]'
                        : 'border border-[#FFD700]/30 text-[#FFD700] hover:border-[#FFD700]'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <RippleButton onClick={handleGenerate} className="w-full">
              {loading ? 'Generating...' : 'Generate Component'}
            </RippleButton>
          </div>
        </GradientCard>

        {generatedCode && (
          <GradientCard>
            <h2 className="text-xl font-bold mb-4 text-[#FFD700]">Generated Code</h2>
            <pre className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="mt-4 px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] rounded-lg hover:bg-[#FFD700]/30 transition-all text-sm font-bold"
            >
              Copy Code
            </button>
          </GradientCard>
        )}
      </div>
    </div>
  );
}
