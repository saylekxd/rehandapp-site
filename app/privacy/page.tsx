import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

function extractHeadings(html: string) {
  const div = globalThis.document?.createElement?.('div');
  if (!div) return [] as { id: string; text: string }[];
  div.innerHTML = html;
  const headings = Array.from(div.querySelectorAll('h2, h3')) as HTMLElement[];
  return headings.map((el) => {
    const id = el.id || el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
    el.id = id;
    return { id, text: el.textContent || '' };
  });
}

export const metadata = {
  title: 'Privacy Policy | Rehand',
};

export default async function PrivacyPage() {
  const mdPath = path.join(process.cwd(), 'public', 'docs', 'Privacy_Policy_EN.md');
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Rehand App</p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <footer className="not-prose mt-12 border-t pt-6 text-sm text-muted-foreground">
            <p>
              If you have any questions about this Policy, contact us at
              {' '}<a className="text-primary underline" href="mailto:privacy@rehand.app">privacy@rehand.app</a>.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}


