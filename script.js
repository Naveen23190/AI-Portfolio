document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 },
	);

	revealElements.forEach((element) => observer.observe(element));
} else {
	revealElements.forEach((element) => element.classList.add("visible"));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear().toString();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute(
		"aria-label",
		isExpanded ? "Open navigation" : "Close navigation",
	);
	navLinks?.classList.toggle("active", !isExpanded);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks?.classList.remove("active");
		menuToggle?.setAttribute("aria-expanded", "false");
		menuToggle?.setAttribute("aria-label", "Open navigation");
	});
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && navLinks?.classList.contains("active")) {
		navLinks.classList.remove("active");
		menuToggle?.setAttribute("aria-expanded", "false");
		menuToggle?.setAttribute("aria-label", "Open navigation");
		menuToggle?.focus();
	}
});
