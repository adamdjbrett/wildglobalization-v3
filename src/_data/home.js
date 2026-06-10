export default {
	nav: [
		{ label: 'The Book', href: '#book' },
		{ label: 'About', href: '#about' },
		{ label: 'The Author', href: '#author' },
		{ label: 'Blog', href: '/blog/' },
		{
			label: 'Pages',
			href: '/pages/',
			children: [
				{ label: 'Welcome', href: '/pages/welcome/' },
				{ label: 'Opening Act', href: '/pages/opening-act/' },
				{ label: 'Wild Globalization 1.0', href: '/pages/wild-globalization-1-0/' },
				{ label: 'Wild Globalization 2.0', href: '/pages/wild-globalization-2-0/' },
				{ label: 'Wild Ecology', href: '/pages/wild-ecology/' },
				{ label: 'Wild Sex & Culture', href: '/pages/wild-sex-culture/' },
				{ label: 'Wild Tech', href: '/pages/wild-tech/' },
				{ label: 'Wild Economy', href: '/pages/wild-economy/' },
				{ label: 'Wild Governance', href: '/pages/wild-governance/' },
				{ label: 'Hints', href: '/pages/hints/' },
				{ label: 'About the Author', href: '/pages/about-the-author/' }
			]
		},
		{ label: 'Timeline', href: '/timeline/' },
		{ label: 'Archive', href: '/archive/' }
	],
	images: {
		hero: 'https://media.base44.com/images/public/6a2994f052f2dbdf5cbadfde/1c9c0b43b_generated_image.png',
		book: 'https://media.base44.com/images/public/6a2994f052f2dbdf5cbadfde/66f102da8_generated_image.png',
		port: 'https://media.base44.com/images/public/6a2994f052f2dbdf5cbadfde/837df0bfc_generated_image.png',
		author: 'https://media.base44.com/images/public/6a2994f052f2dbdf5cbadfde/7d3da1181_generated_image.png'
	},
	forces: [
		{
			icon: 'I',
			label: 'Wild Force I',
			heading: 'Wild Ecology',
			url: '/wild-ecology/',
			body:
				"From fire, ice, and glaciations to Yellowstone's looming eruption, civilization's 10,000-year history has run during a rare climate optimum."
		},
		{
			icon: 'II',
			label: 'Wild Force II',
			heading: 'Wild Culture & Demographics',
			url: '/wild-sex/',
			body:
				"Over one million souls per week flood into cities. Demographic and cultural expressions emerge as spontaneous, uncontrollable wild orders."
		},
		{
			icon: 'III',
			label: 'Wild Force III',
			heading: 'Wild Technology',
			url: '/wild-tech/',
			body:
				"From bipedalism and big brains to the Internet of Things and the Cloud, technology's gifts now threaten to overwhelm the grids that sustain us."
		},
		{
			icon: 'IV',
			label: 'Wild Force IV',
			heading: 'Wild Economy',
			url: '/wild-value/',
			body:
				'Markets, resources, debt, and supply chains arrange themselves with a logic that surpasses any single government or ideology.'
		},
		{
			icon: 'V',
			label: 'Wild Force V',
			heading: 'Wild Governance',
			url: '/wild-governance/',
			body:
				"From tribal bands to billion-person states, humanity's attempts to form social contracts struggle against the tide of complexity."
		},
		{
			icon: '?',
			label: 'The Big Question',
			heading: 'Can We Re-Emerge from the Wilderness?',
			url: '/opening-act/',
			body:
				'Can we turn our creative-destructive hyper-tech nature back on itself to gain new comparative advantages for our own survival?'
		}
	],
	aboutCards: [
		{
			icon: 'Globe',
			title: 'Pan-Historical Lens',
			body:
				'Wild Globalization traces the full 250,000-year footprint of homo sapiens, from primal ecological survival to hyper-connected megacities.'
		},
		{
			icon: 'Book',
			title: 'Pan-Cultural Perspective',
			body:
				'Every ideological response is leveraged by the same five wild forces. The book invites a heuristic that refuses lazy simplification.'
		},
		{
			icon: 'Bolt',
			title: 'Finite Time Singularities',
			body:
				'Civilization grows exponentially, reaches crisis, and undergoes paradigm shifts that reset the next growth cycle.'
		}
	]
};
