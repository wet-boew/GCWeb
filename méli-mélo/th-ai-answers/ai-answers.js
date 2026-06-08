/**
 * @title WET-BOEW GC AI answers thematic
 * @overview AI answers thematic
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */

(function () {
	const trigger = document.querySelector(".ai-answers-trigger");
	if (!trigger) return;

	const lang = document.documentElement.lang === "fr" ? "fr" : "en";
	const pageDetailsH2 = document.querySelector(".pagedetails > h2");
	const closed = sessionStorage.getItem("aiaClosed") === "true";
	const getAttr = (name, fallback) => {
		const value = trigger.getAttribute(name);
		return value !== null ? value.replaceAll("&lt;", "<").replaceAll("&gt;", ">") : fallback;
	};
	const allowedHTML = {
		ALLOWED_TAGS: ["section","div","p","a","img","h2","h3","button","strong"],
		ALLOWED_ATTR: ["class","href","src","alt","type","aria-label","referrerpolicy","data-gc-analytics-customclick"]
	};

	// Default i18n
	const baseI18n = {
		fr: {
			defaultTitle: "<strong>Besoin d'aide?</strong>",
			defaultLinkText: "Essayez une version bêta de Réponses IA",
			mainClickLabel: "ESDC-EDSC:Réponses IA:Bannière en bas",
			rescueClickLabel: "ESDC-EDSC:Réponses IA:Lien contenu",
			aiAnswersURL: "https://reponses-ia.alpha.canada.ca",
			hiddenBannerTitle: "Bannière Réponses IA",
			hiddenRescueTitle: "Réponses IA",
			closeLabel: "Fermer la bannière de Réponses IA"
		},
		en: {
			defaultTitle: "<strong>Need help?</strong>",
			defaultLinkText: "Try a beta test of AI Answers",
			mainClickLabel: "ESDC-EDSC:AI Answers:Banner Bottom Link Click",
			rescueClickLabel: "ESDC-EDSC:AI Answers:Content Link Click",
			aiAnswersURL: "https://ai-answers.alpha.canada.ca",
			hiddenBannerTitle: "AI answers banner",
			hiddenRescueTitle: "AI answers",
			closeLabel: "Close AI answers banner"
		}
	};

	const base = baseI18n[lang];

	// Overwrite base i18n with data-* attributes if present
	const i18n = {
		...base,
		bannerTitle: getAttr("data-banner-title", base.defaultTitle),
		bannerLinkText: getAttr("data-banner-link-text", base.defaultLinkText),
		rescueTitle: getAttr("data-rescue-title", base.defaultTitle),
		rescueLinkText: getAttr("data-rescue-link-text", base.defaultLinkText)
	};

	// Banners UI
	const banners = {
		main: `
			<section class="aia-banner">
				<h2 class="wb-inv">${i18n.hiddenBannerTitle}</h2>
				<div class="container">
					<div class="d-flex align-items-center">
						<img src="https://canada.ca/content/dam/canada/ai-stars.png" alt="">
						<p>${i18n.bannerTitle} <a href="${i18n.aiAnswersURL}" referrerpolicy="unsafe-url" data-gc-analytics-customclick="${i18n.mainClickLabel}">${i18n.bannerLinkText}</a></p>
					</div>
				</div>
				<button class="aia-close" type="button" aria-label="${i18n.closeLabel}">×</button>
			</section>
		`,
		rescue: `
			<section class="aia-rescue">
				<h3 class="wb-inv">${i18n.hiddenRescueTitle}</h3>
				<div class="d-flex align-items-center">
					<img src="https://canada.ca/content/dam/canada/ai-stars-blue.png" alt="">
					<p>${i18n.rescueTitle} <a href="${i18n.aiAnswersURL}" referrerpolicy="unsafe-url" data-gc-analytics-customclick="${i18n.rescueClickLabel}">${i18n.rescueLinkText}</a></p>
				</div>
			</section>
		`
	};

	pageDetailsH2.insertAdjacentHTML("afterend", DOMPurify.sanitize(banners.rescue, allowedHTML));

	if (!closed) {
		pageDetailsH2.insertAdjacentHTML("afterend", DOMPurify.sanitize(banners.main, allowedHTML));
		document.body.classList.add("aia-banner-visible");

		const closeBtn = document.querySelector(".aia-close");

		closeBtn.addEventListener("click", () => {
			closeBtn.parentElement.remove();
			document.body.classList.remove("aia-banner-visible");
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
