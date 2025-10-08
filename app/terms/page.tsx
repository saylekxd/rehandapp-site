import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export const metadata = {
  title: 'Terms of Use | Rehand',
};

export default async function TermsPage() {
  const mdPath = path.join(process.cwd(), 'public', 'docs', 'Terms_US_EN.md');
  const raw = fs.readFileSync(mdPath, 'utf-8');
  const parsed = matter(raw);
  const html = marked.parse(parsed.content) as string;
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <aside className="hidden lg:block sticky top-24 h-fit">
          <nav className="text-sm space-y-2">
            <div className="font-semibold text-foreground/80">Contents</div>
            <ol className="list-decimal pl-5 space-y-1">
              {Array.from(html.matchAll(/<h2 id=\"(.*?)\">(.*?)<\/h2>/g)).map((m, i) => (
                <li key={i}><a className="hover:text-primary" href={`#${m[1]}`}>{m[2].replace(/<[^>]+>/g, '')}</a></li>
              ))}
            </ol>
          </nav>
        </aside>
        <article className="prose prose-lg prose-slate dark:prose-invert prose-headings:scroll-mt-24 prose-p:leading-relaxed prose-li:leading-relaxed">
          <header className="not-prose mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms of Use</h1>
            <p className="text-muted-foreground mt-2">Rehand App</p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <footer className="not-prose mt-12 border-t pt-6 text-sm text-muted-foreground">
            <p>
              Questions about these Terms? Contact us at
              {' '}<a className="text-primary underline" href="mailto:support@rehand.app">support@rehand.app</a>.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}


