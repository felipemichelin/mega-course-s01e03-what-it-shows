import { createServer } from 'vite';
import { readFile, writeFile, readdir } from 'node:fs/promises';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: Page } = await server.ssrLoadModule('/src/routes/kb/incidents/4471-reassessment/+page.svx');
  const { render } = await server.ssrLoadModule('svelte/server');
  const result = render(Page);
  const template = (await readFile('dist/index.html', 'utf8'))
    .replace('<title>Support knowledge base</title>', '');
  const html = template.replace('<!--ssr-head-->', result.head).replace('<!--ssr-body-->', result.body);
  await writeFile('dist/index.html', html);
  const styles = await Promise.all((await readdir('dist/assets'))
    .filter(name => name.endsWith('.css')).map(name => readFile('dist/assets/' + name, 'utf8')));
  const standalone = html.replace(/<script\b[^>]*src=[^>]*><\/script>/g, '')
    .replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, '')
    .replace('</head>', '<style>' + styles.join('\n') + '</style></head>');
  await writeFile('rendered-page.html', standalone.replace(/[\t ]+$/gm, ''));
  console.log('Rendered the signed page and imported course components to dist/index.html and rendered-page.html.');
} finally { await server.close(); }
