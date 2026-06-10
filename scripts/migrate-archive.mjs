import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const sourceDir = new URL('../../wildglobalization/src/pages/', import.meta.url);
const outputDir = new URL('../src/content/archive/', import.meta.url);

const files = [
	'about-2.html',
	'chapter-1-summary.html',
	'g-2-0-settlingcultivating-the-neolithic-10000-bce-to-32-ce.html',
	'hints.html',
	'opening-act.html',
	'welcome.html',
	'wild-ecology.html',
	'wild-governance.html',
	'wild-sex.html',
	'wild-tech.html',
	'wild-value.html'
];

function frontMatterValue(source, key) {
	const line = source
		.split('\n')
		.find((candidate) => candidate.startsWith(`${key}:`));
	if (!line) return '';
	const raw = line.slice(key.length + 1).trim();
	if (raw.startsWith('"') && raw.endsWith('"')) {
		return raw.slice(1, -1).replace(/\\"/g, '"').trim();
	}
	return raw.trim();
}

function body(source) {
	return source
		.replace(/^---[\s\S]*?---\s*/, '')
		.replace(/href="Source:\s*(https?:\/\/[^"]+)"/g, 'href="$1"')
		.replace(/data-id="Source:\s*(https?:\/\/[^"]+)"/g, 'data-id="$1"')
		.replace(/href="http:\/\/wild%20tech%20hyperlink%202-17-22%20\.docx\/"/g, 'href="/wild-tech/"')
		.replace(/href="http:\/\/wild%20economy%20hyperlink%202-17-22%20\.docx\/"/g, 'href="/wild-value/"')
		.trim();
}

await mkdir(outputDir, { recursive: true });

for (const [index, file] of files.entries()) {
	const source = await readFile(new URL(file, sourceDir), 'utf8');
	const title = frontMatterValue(source, 'title') || basename(file, '.html');
	const permalink = frontMatterValue(source, 'permalink') || `/${basename(file, '.html')}/`;
	const date = new Date(Date.UTC(2022, 0, index + 1)).toISOString().slice(0, 10);
	const output = `---\nlayout: layouts/archive.njk\ntitle: ${JSON.stringify(title)}\npermalink: ${permalink}\ndate: ${date}\ntags: archive\ndescription: ${JSON.stringify(`${title} from the Wild Globalization archive.`)}\n---\n${body(source)}\n`;

	await writeFile(new URL(file, outputDir), output, 'utf8');
}
