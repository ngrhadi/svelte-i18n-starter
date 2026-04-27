<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import heroImage from "$lib/assets/images/image.png";

    // Data untuk Gallery
    let galleryItems = [
        {
            title: 'Premium Quality',
            desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis rerum dignissimos quibusdam esse commodi earum eos, non dolores culpa voluptatum similique consequatur quaerat corporis officia eligendi quae neque itaque quisquam tenetur minus qui dolor fugiat expedita. Voluptate at tempore, maiores, voluptatem officia id dicta corrupti excepturi esse consequatur eveniet!',
            from: 'left',
            to: 'right'
        },
        {
            title: 'Professional Grade',
            desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis rerum dignissimos quibusdam esse commodi earum eos, non dolores culpa voluptatum similique consequatur quaerat corporis officia eligendi quae neque itaque quisquam tenetur minus qui dolor fugiat expedita. Voluptate at tempore, maiores, voluptatem officia id dicta corrupti excepturi esse consequatur eveniet!',
            from: 'right',
            to: 'left'
        },
        {
            title: 'Innovation Meets Design',
            desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis rerum dignissimos quibusdam esse commodi earum eos, non dolores culpa voluptatum similique consequatur quaerat corporis officia eligendi quae neque itaque quisquam tenetur minus qui dolor fugiat expedita. Voluptate at tempore, maiores, voluptatem officia id dicta corrupti excepturi esse consequatur eveniet!',
            from: 'left',
            to: 'right'
        }
    ];

    // Data untuk Testimonials (dipindahkan ke script untuk kerapian)
    const testimonials = [
        {
            quote: "The best investment I ever made for my studio setup.",
            name: "Alex Johnson",
            role: "Music Producer"
        },
        {
            quote: "Crystal clear sound and incredible comfort for long sessions.",
            name: "Maria Chen",
            role: "Professional Gamer"
        },
        {
            quote: "Superior quality that rivals headphones twice the price.",
            name: "James Wilson",
            role: "Audio Engineer"
        }
    ];

    /* ACTIONS */

    /**
     * useIntersection: Memicu animasi masuk saat elemen masuk viewport.
     * Menggunakan class Tailwind: hapus 'opacity-0 translate-y-8', tambahkan 'opacity-100 translate-y-0'.
     */
    function useScrollReveal(node: HTMLElement, options?: { from?: 'left' | 'right' }) {
        const direction = options?.from || 'left';

        // Set style awal (hidden state) menggunakan Tailwind logic
        node.classList.add('transition-all', 'duration-700', 'ease-out');

        // Tentukan class transform berdasarkan arah
        const hideClass = direction === 'left' ? '-translate-x-20' : 'translate-x-20';
        const showClass = 'translate-x-0';

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Masuk viewport: Tampilkan
                        node.classList.remove('opacity-0', hideClass);
                        node.classList.add('opacity-100', showClass);
                    } else {
                        // Keluar viewport: Sembunyikan kembali (Reset)
                        node.classList.remove('opacity-100', showClass);
                        node.classList.add('opacity-0', hideClass);
                    }
                });
            },
            {
                threshold: 0.2, // Trigger ketika 20% terlihat
                rootMargin: '0px 0px -50px 0px' // Sedikit margin bawah
            }
        );

        // Set state awal sebelum observe (langsung hidden)
        node.classList.add('opacity-0', hideClass);

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    /**
     * useParallax: Efek parallax vertikal.
     * Dipindahkan ke <img> agar tidak konflik dengan transform translateX di container.
     */
    function useParallax(node: HTMLElement) {
        // ... (fungsi useParallax sama persis seperti sebelumnya) ...
        // (Salin fungsi useParallax dari kode sebelumnya di sini)
        function update() {
            const rect = node.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = (rect.top + rect.height) / (windowHeight + rect.height);
            const offset = (progress - 0.5) * 40; // Kurangi sedikit offset agar halus
            node.style.transform = `translateY(${offset}px) scale(1.05)`; // Tambah scale sedikit karena overflow hidden
        }
        function onScroll() { requestAnimationFrame(update); }
        update();
        window.addEventListener('scroll', onScroll);
        return { destroy() { window.removeEventListener('scroll', onScroll); } };
    }

    /**
     * useReveal: Mengungkap elemen (Gallery) saat scroll.
     * Menggunakan class Tailwind untuk transisi halus.
     */
    function useReveal(node: HTMLElement) {
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
</script>

<!-- Hero Section -->
<!-- Menggunakan grid responsif, gradien, dan utilitas spasi -->
<section class="min-h-[90vh] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[var(--bg-1)] to-[var(--bg-2,var(--bg-1))]">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl w-full items-center">
        <div class="space-y-6 text-center lg:text-left">
            <!-- Animasi masuk menggunakan class kustom yang didefinisikan di <style> -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--fg-1)] leading-tight animate-slide-in-left">
                {m.hero_title()}
            </h1>
            <p class="text-lg sm:text-xl text-[var(--fg-1)] opacity-80 animate-slide-in-up animation-delay-200">
                {m.hero_subtitle()}
            </p>
            <button class="px-6 py-3 bg-[var(--link)] text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-slide-in-up animation-delay-400">
                {m.hero_cta()}
            </button>
        </div>
        <div class="flex justify-center items-center">
            <img
                src={heroImage}
                alt="Start Audio"
                class="w-full max-w-md h-auto animate-float"
            />
        </div>
    </div>
</section>

<!-- Features Section -->
<!-- Fitur hover menggunakan 'group' dan 'group-hover' dari Tailwind, menghapus kebutuhan state 'hoveredFeature' -->
<section class="py-20 sm:py-24 px-4 bg-[var(--bg-1)] text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-[var(--fg-1)] mb-12">{m.why_product()}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {#each [
            { title: m.feature_1_title(), desc: m.feature_1_desc() },
            { title: m.feature_2_title(), desc: m.feature_2_desc() },
            { title: m.feature_3_title(), desc: m.feature_3_desc() }
        ] as feature}
            <div
                class="group p-6 bg-[var(--bg-2,var(--bg-1))] rounded-xl border border-[var(--fg-1)]/10
                       transition-all duration-300 cursor-pointer
                       hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--link)]/30"
                role="button"
                tabindex="0"
            >
                <!-- Ikon dengan animasi hover -->
                <div class="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">
                    📱
                </div>
                <h3 class="text-xl font-semibold text-[var(--fg-1)] mb-2 transition-colors duration-300 group-hover:text-[var(--link)]">
                    {feature.title}
                </h3>
                <p class="text-[var(--fg-1)] opacity-70">{feature.desc}</p>
            </div>
        {/each}
    </div>
</section>

<!-- Gallery Section -->
<section class="py-20 sm:py-32 px-4 bg-[var(--bg-1)]">
    <div class="max-w-5xl mx-auto">
        <h2 class="text-center text-3xl sm:text-4xl font-bold text-[var(--fg-1)] mb-20">Featured Showcase</h2>

        <div class="flex flex-col gap-24">
            {#each galleryItems as item}
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    use:useScrollReveal={{ from: item.from }}
                >
                    <!-- Image Container -->
                    <!-- Menghapus aspect-square di parent flex untuk menghindari layout aneh dengan teks panjang -->
                    <div class="overflow-hidden rounded-2xl shadow-lg aspect-video md:aspect-[4/3] bg-[var(--bg-2)]">
                        <img
                            src={heroImage}
                            alt={item.title}
                            class="w-full h-full object-cover will-change-transform transition-transform duration-500 hover:scale-110"
                            use:useParallax
                        />
                    </div>

                    <!-- Text Container -->
                    <div class="flex flex-col gap-4">
                        <h3 class="text-2xl lg:text-3xl font-bold text-[var(--fg-1)]">{item.title}</h3>
                        <p class="text-[var(--fg-1)] opacity-70 text-base lg:text-lg leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="py-16 sm:py-24 px-4 bg-gradient-to-br from-[var(--bg-2,var(--bg-1))] to-[var(--bg-1)]">
    <div class="max-w-6xl mx-auto">
        <!-- Header dengan animasi scroll -->
        <div
            use:useReveal
            class="text-center mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--fg-2)] mb-4">
                Loved by Audio Enthusiasts
            </h2>
            <p class="text-lg text-[var(--fg-2)] opacity-75">
                Join thousands of satisfied customers worldwide
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {#each testimonials as t, i}
                <div
                    use:useReveal
                    class="p-6 lg:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-[var(--fg-1)]/10
                           hover:shadow-lg hover:-translate-y-2 transition duration-300
                           opacity-0 translate-y-8 delay-{i * 100}"
                >
                    <div class="flex gap-1 mb-4">
                        {#each Array(5) as _}
                            <span class="text-yellow-400 text-lg">★</span>
                        {/each}
                    </div>
                    <p class="text-[var(--fg-2)] mb-6 leading-relaxed italic">
                        "{t.quote}"
                    </p>
                    <div>
                        <p class="font-semibold text-[var(--fg-2)]">{t.name}</p>
                        <p class="text-sm text-[var(--fg-2)] opacity-60">{t.role}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600">
    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{m.cta_title()}</h2>
    <p class="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{m.cta_desc()}</p>
    <button class="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-opacity-90 transition-all duration-300">
        {m.cta_button()}
    </button>
</section>

<style>
    /*
       Keyframes kustom untuk animasi kompleks yang tidak bisa dicapai
       hanya dengan utilitas transition Tailwind default.
    */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }

    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Class helper untuk menerapkan animasi */
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }

    .animate-slide-in-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }

    .animate-slide-in-up {
        animation: slideInUp 0.8s ease-out forwards;
    }

    /* Helper untuk delay animasi */
    .animation-delay-200 { animation-delay: 200ms; }
    .animation-delay-400 { animation-delay: 400ms; }
</style>
