const header = document.querySelector('[data-site-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

function syncHeader() {
	if (!header) return;
	header.classList.toggle('is-scrolled', window.scrollY > 48);
}

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && mobileNav) {
	menuToggle.addEventListener('click', () => {
		const isOpen = mobileNav.classList.toggle('is-open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});

	mobileNav.addEventListener('click', (event) => {
		if (event.target.closest('a')) {
			mobileNav.classList.remove('is-open');
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	});
}

const timeline = document.querySelector('[data-timeline]');

if (timeline) {
	const buttons = [...timeline.querySelectorAll('[data-timeline-filter]')];
	const items = [...timeline.querySelectorAll('[data-timeline-item]')];
	const empty = timeline.querySelector('[data-timeline-empty]');

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const filter = button.dataset.timelineFilter;
			let visibleCount = 0;

			buttons.forEach((candidate) => {
				candidate.classList.toggle('is-active', candidate === button);
			});

			items.forEach((item) => {
				const isVisible = filter === 'all' || item.dataset.category === filter;
				item.hidden = !isVisible;
				if (isVisible) visibleCount += 1;
			});

			if (empty) {
				empty.hidden = visibleCount > 0;
			}
		});
	});
}
