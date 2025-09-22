import fs from 'node:fs';
import path from 'node:path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | ReHand',
  description: 'Polityka prywatności ReHand.',
};

function readMarkdownFile(relativePath: string): string {
  const absolutePath = path.join(process.cwd(), relativePath);
  try {
    return fs.readFileSync(absolutePath, 'utf8');
  } catch (error) {
    return '# Not found\nPlik z treścią polityki prywatności nie został jeszcze dodany.';
  }
}

export default function PrivacyPage() {
  const markdown = readMarkdownFile('content/privacy.md');
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-20 pb-10 lg:pt-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <Badge className="bg-white/15 text-white border-white/20">Informacje prawne</Badge>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">Polityka Prywatności (Privacy Policy)</h1>
            </div>
            <p className="text-blue-100 max-w-3xl">Jak przetwarzamy i chronimy dane w ReHand. Finalna treść zostanie wstawiona wkrótce.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                Powrót
              </Link>
            </Button>
          </div>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 md:p-8">
              <article className="prose prose-neutral max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}


