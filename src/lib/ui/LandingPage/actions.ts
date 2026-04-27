export function useScrollReveal(node: HTMLElement, options?: { from?: 'left' | 'right' }) {
	const direction = options?.from ?? 'left';
	const hideClass = direction === 'left' ? '-translate-x-20' : 'translate-x-20';

	node.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', hideClass);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.remove('opacity-0', hideClass);
					node.classList.add('opacity-100', 'translate-x-0');
				} else {
					node.classList.remove('opacity-100', 'translate-x-0');
					node.classList.add('opacity-0', hideClass);
				}
			});
		},
		{ threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
	);

	observer.observe(node);
	return { destroy() { observer.disconnect(); } };
}

export function useParallax(node: HTMLElement) {
	function update() {
		const rect = node.getBoundingClientRect();
		const progress = (rect.top + rect.height) / (window.innerHeight + rect.height);
		const offset = (progress - 0.5) * 40;
		node.style.transform = `translateY(${offset}px) scale(1.05)`;
	}

	function onScroll() { requestAnimationFrame(update); }

	update();
	window.addEventListener('scroll', onScroll);
	return { destroy() { window.removeEventListener('scroll', onScroll); } };
}

export function useReveal(node: HTMLElement) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.remove('opacity-0', 'translate-y-16');
					node.classList.add('opacity-100', 'translate-y-0');
				}
			}
		},
		{ threshold: 0.2 }
	);

	observer.observe(node);
	return { destroy() { observer.disconnect(); } };
}
