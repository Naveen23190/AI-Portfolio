const typedText = document.querySelector(".typed");
const roles = [
	"Full Stack Developer",
	"Frontend Developer",
	"Backend Developer",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
	const current = roles[roleIndex];
	if (!typedText) return;

	if (!isDeleting) {
		typedText.textContent = current.slice(0, ++charIndex);
		if (charIndex === current.length) {
			isDeleting = true;
			setTimeout(typeLoop, 1300);
			return;
		}
	} else {
		typedText.textContent = current.slice(0, --charIndex);
		if (charIndex === 0) {
			isDeleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
		}
	}

	setTimeout(typeLoop, isDeleting ? 60 : 90);
}

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	},
	{ threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
	navLinks?.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
	link.addEventListener("click", () => navLinks?.classList.remove("active"));
});

typeLoop();
