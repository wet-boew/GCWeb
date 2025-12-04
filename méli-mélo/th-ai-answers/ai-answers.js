/**
 * @title WET-BOEW GC AI answers thematic
 * @overview AI answers thematic
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */

(function () {
	const trigger = document.querySelector(".ai-answers-trigger");
	if (!trigger) return; // exit if no trigger

	const lang = document.documentElement.lang;
	const pageHeader = document.querySelector("header");
	const dateModifiedElm = document.querySelector(".pagedetails > h2");
	const closed = sessionStorage.getItem("aiaClosed") === "true";
	const banners = {
		main: {
			fr: `
				<aside class="aia-banner">
					<h2 class="wb-inv">Bannière Réponses IA</h2>
					<div class="container">
						<div class="d-flex align-items-center">
							<img src="https://canada.ca/content/dam/canada/ai-stars.png" alt="">
							<p><strong>Besoin d'aide?</strong>
							<a href="https://reponses-ia.alpha.canada.ca" referrerpolicy="unsafe-url" data-gc-analytics-customclick=”ESDC-EDSC:AI Answers Banner Click:Essayez une version bêta de Réponses IA”>
							Essayez une version bêta de Réponses IA</a></p>
						</div>
					</div>
					<button class="aia-close" type="button" aria-label="Essayez une version bêta de Réponses IA">×</button>
				</aside>`,
			en: `
				<aside class="aia-banner">
					<h2 class="wb-inv">AI answers banner</h2>
					<div class="container">
						<div class="d-flex align-items-center">
							<img src="https://canada.ca/content/dam/canada/ai-stars.png" alt="">
							<p><strong>Need help?</strong>
							<a href="https://ai-answers.alpha.canada.ca" referrerpolicy="unsafe-url" data-gc-analytics-customclick=”ESDC-EDSC:AI Answers Banner Click:Try a beta test of AI Answers”>
							Try a beta test of AI Answers</a></p>
						</div>
					</div>
					<button class="aia-close" type="button" aria-label="Close AI answers banner">×</button>
				</aside>`
		},
		rescue: {
			fr: `
				<section class="aia-rescue">
					<h3 class="wb-inv">Bannière Réponses IA</h3>
					<div class="d-flex align-items-center">
						<img src="https://canada.ca/content/dam/canada/ai-stars-blue.png" alt="">
						<p><strong>Besoin d'aide?</strong>
						<a href="https://reponses-ia.alpha.canada.ca" referrerpolicy="unsafe-url" data-gc-analytics-customclick=”ESDC-EDSC:AI Answers Banner Click:Try a beta test of AI Answers”>
						Essayez une version bêta de Réponses IA</a></p>
					</div>
				</section>`,
			en: `
				<section class="aia-rescue">
					<h3 class="wb-inv">AI answers banner</h3>
					<div class="d-flex align-items-center">
						<img src="https://canada.ca/content/dam/canada/ai-stars-blue.png" alt="">
						<p><strong>Need help?</strong>
						<a href="https://ai-answers.alpha.canada.ca" referrerpolicy="unsafe-url" data-gc-analytics-customclick=”ESDC-EDSC:AI Answers Banner Click:Try a beta test of AI Answers”>
						Try a beta test of AI Answers</a></p>
					</div>
				</section>`
		}
	};

	dateModifiedElm.insertAdjacentHTML("afterend", banners.rescue[lang]);

	if (!closed) {
		// If in AEM page
		if ( document.querySelector(".global-header") ) {
			const skiplinks = document.querySelector(".global-header > nav");

			document.body.insertAdjacentHTML("afterbegin", banners.main[lang]);
			document.body.prepend(skiplinks);
		} else {
			pageHeader.insertAdjacentHTML("beforebegin", banners.main[lang]);
		}

		const closeBtn = document.querySelector(".aia-close");

		closeBtn.addEventListener("click", () => {
			closeBtn.parentElement.remove();
			sessionStorage.setItem("aiaClosed", "true");
		});
	}

	aiAnswersAvailabilityCheck();
})();

// Check if chat service is available
async function aiAnswersAvailabilityCheck() {
	const banners = document.querySelectorAll(".aia-banner, .aia-rescue");
	const hideBanner = () => banners.forEach(el => el.remove());
	const AVAILABILITY_ENDPOINT = "https://ai-answers.alpha.canada.ca/api/chat/chat-session-availability";

	try {
		const res = await fetch(AVAILABILITY_ENDPOINT);

		if (!res?.ok) {
			hideBanner();
			return;
		}

		const data = await res.json();

		// If the required flags are absent or false → hide the banner
		if (!data?.siteStatus || !data?.sessionAvailable) {
			hideBanner();
		}
	} catch {
		// Any error (network, parse, CORS)
		hideBanner();
	}
}
