document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       TYPING ANIMATION
    ========================================= */

    const roles = [
        "Full-Stack Developer",
        ".NET Developer",
        "Node.js Developer",
    ];

    const typedEl = document.querySelector(".typing-text");

    const reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ri = 0;
    let ci = 0;
    let deleting = false;

    function typeLoop() {

        if (!typedEl) return;

        const current = roles[ri];

        if (!deleting) {

            ci++;

            typedEl.textContent =
                current.slice(0, ci);

            if (ci === current.length) {

                deleting = true;

                setTimeout(typeLoop, 1400);

                return;
            }

        } else {

            ci--;

            typedEl.textContent =
                current.slice(0, ci);

            if (ci === 0) {

                deleting = false;

                ri = (ri + 1) % roles.length;
            }
        }

        setTimeout(
            typeLoop,
            deleting ? 45 : 90
        );
    }


    if (typedEl) {

        if (reduceMotion) {

            typedEl.textContent = roles[0];

        } else {

            typeLoop();
        }
    }


    /* =========================================
       BACK TO TOP
    ========================================= */

    const toTop =
        document.querySelector(".scroll-top");

    if (toTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                toTop.classList.add("show");

            } else {

                toTop.classList.remove("show");
            }
        });


        toTop.addEventListener("click", (e) => {

            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reduceMotion
                    ? "auto"
                    : "smooth"
            });

        });
    }


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.querySelector(".contact-form form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const note =
                    document.querySelector(".form-note");

                if (note) {

                    note.textContent =
                        "Message captured locally (demo only) — connect a backend or form service to actually send it.";

                    note.style.color =
                        "var(--accent)";
                }

                this.reset();
            }
        );
    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length > 0) {

        if (reduceMotion) {

            revealElements.forEach((element) => {

                element.classList.add("in-view");

            });

        } else {

            const revealObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach((entry) => {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "in-view"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );
                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach((element) => {

                revealObserver.observe(element);

            });
        }
    }

});