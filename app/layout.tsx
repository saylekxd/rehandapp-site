import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReHand - Smart Rehabilitation Trainer | AI Motion Analysis for Safe Home Recovery',
  description: 'ReHand uses AI motion analysis to guide safe home rehabilitation. Get real‑time feedback, personalized plans, clear instructions, and track your progress with goals. Perfect for post-injury recovery, seniors, and prevention.',
  keywords: 'rehabilitation, physiotherapy, exercises, health, AI, motion analysis, hand, elbow, shoulder, mobility, training, posture',
  authors: [{ name: 'ReHand' }],
  openGraph: {
    title: 'ReHand - Smart Rehabilitation Trainer',
    description: 'AI-powered rehabilitation app with real-time motion analysis for safe home recovery',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}