import baseline, { config as baselineConfig } from '@apleasantview/eleventy-plugin-baseline';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import yaml from 'js-yaml';
import settings from './src/_data/settings.js';

const siteUrl = settings.url.replace(/\/$/, '');

function absoluteUrl(path = '/') {
	return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function excerpt(content = '') {
	return decodeEntities(String(content)
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, 240));
}

function decodeEntities(value = '') {
	return String(value)
		.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	await eleventyConfig.addPlugin(
		baseline(settings, {
			verbose: true,
			sitemap: true,
			navigator: false,
			head: {
				titleSeparator: ' | ',
				showGenerator: true
			},
			assets: {
				esbuild: {}
			}
		})
	);

	eleventyConfig.addPlugin(feedPlugin, {
		outputPath: '/feed/feed.xml',
		stylesheet: 'pretty-atom-feed.xsl',
		collection: {
			name: 'archive',
			limit: 20
		},
		metadata: {
			language: 'en',
			title: settings.title,
			subtitle: settings.tagline,
			base: siteUrl,
			author: {
				name: settings.author.name
			}
		}
	});

	eleventyConfig.addCollection('archive', (collectionApi) => {
		return collectionApi
			.getFilteredByGlob('src/content/archive/**/*.html')
			.filter((item) => item.data.feed !== false)
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection('blog', (collectionApi) => {
		return collectionApi
			.getFilteredByGlob('src/content/blog/**/*.{html,md,njk}')
			.filter((item) => item.url !== '/blog/' && item.data.draft !== true)
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection('pages', (collectionApi) => {
		return collectionApi
			.getFilteredByGlob('src/content/pages/**/*.{md,njk}')
			.filter((item) => item.data.draft !== true && item.data.showInPagesNav === true)
			.sort((a, b) => {
				const orderA = a.data.timelineOrder ?? 999;
				const orderB = b.data.timelineOrder ?? 999;
				return orderA - orderB || a.data.title.localeCompare(b.data.title);
			});
	});

	eleventyConfig.addCollection('timelinePages', (collectionApi) => {
		return collectionApi
			.getFilteredByGlob('src/content/pages/**/*.{md,njk}')
			.filter((item) => item.data.draft !== true && item.data.showInTimeline === true)
			.sort((a, b) => {
				const orderA = a.data.timelineOrder ?? 999;
				const orderB = b.data.timelineOrder ?? 999;
				return orderA - orderB || a.data.title.localeCompare(b.data.title);
			});
	});

	eleventyConfig.addDataExtension('yml,yaml', (contents) => yaml.load(contents));
	eleventyConfig.addGlobalData('currentYear', new Date().getFullYear());
	eleventyConfig.addFilter('absoluteUrl', absoluteUrl);
	eleventyConfig.addFilter('fullUrl', absoluteUrl);
	eleventyConfig.addFilter('excerpt', excerpt);
	eleventyConfig.addFilter('plainText', decodeEntities);
	eleventyConfig.addFilter('dateToRfc3339', (date) => new Date(date).toISOString());
	eleventyConfig.addFilter('dateToRfc822', (date) => new Date(date).toUTCString());
	eleventyConfig.addFilter('json', (value) => JSON.stringify(value));
	eleventyConfig.addFilter('limit', (array, count) => array.slice(0, count));
}

export const config = baselineConfig;
