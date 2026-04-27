<script lang="ts">
	import { page } from '$app/state';
    import { m } from '$lib/paraglide/messages'
</script>

<!-- Footer -->
<footer class="footer">
	<div class="footer-content">
		<div class="footer-section">
			<h4 class="">Start Audio</h4>
			<p>Premium headsets for audio enthusiasts</p>
		</div>
		<div class="footer-section">
			<h4>Links</h4>
			<ul>
				<li><a href={`/${page.params.locale}/about`}>{m.footer_about()}</a></li>
				<li><a href="#">{m.footer_contact()}</a></li>
				<li><a href="#">{m.footer_privacy()}</a></li>
			</ul>
		</div>
	</div>
	<div class="footer-bottom">
		<p>{m.footer_copyright()}</p>
	</div>
</footer>


<style>

	/* Footer */
	.footer {
		background: var(--bg-1);
		padding: 4rem 2rem 2rem;
		border-top: 1px solid var(--fg-1);
		border-opacity: 0.1;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto 3rem;
	}

	.footer-section h4 {
		color: var(--fg-1);
		margin-bottom: 1rem;
	}

	.footer-section p,
	.footer-section a {
		color: var(--fg-1);
		opacity: 0.7;
		text-decoration: none;
		transition: opacity 0.3s ease;
	}

	.footer-section a:hover {
		opacity: 1;
		color: var(--link);
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-section li {
		margin-bottom: 0.5rem;
	}

	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid var(--fg-1);
		border-opacity: 0.1;
		color: var(--fg-1);
		opacity: 0.6;
	}
</style>
