/* =========================================================
   SAMEER KEREKAR
   PREMIUM DIGITAL MARKETING NAVBAR
   ---------------------------------------------------------
   Vanilla JavaScript
========================================================= */


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const pageLoader =
    document.getElementById("pageLoader");

const loaderProgress =
    document.getElementById("loaderProgress");

const loaderPercentage =
    document.getElementById("loaderPercentage");

const siteHeader =
    document.getElementById("siteHeader");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileOverlay =
    document.getElementById("mobileOverlay");

const desktopNavLinks =
    document.querySelectorAll(
        "[data-nav-link]"
    );

const mobileNavLinks =
    document.querySelectorAll(
        "[data-mobile-link]"
    );


/* =========================================================
   02. PAGE LOADER
   ---------------------------------------------------------
   Creates a premium startup experience.

   Flow:
   00%
   ↓
   100%
   ↓
   Fade out
   ↓
   Navbar appears
========================================================= */

let loadingProgress = 0;

let loaderInterval;


/*
 * Start loader.
 */
function startPageLoader() {

    if (!pageLoader) {
        return;
    }


    /*
     * Prevent scrolling while loader
     * is visible.
     */
    document.body.style.overflow = "hidden";


    /*
     * Progress animation.
     *
     * The progress does NOT depend on fake
     * network requests. It creates a smooth
     * branded introduction.
     */
    loaderInterval =
        setInterval(
            function () {

                /*
                 * Slow down near 90%.
                 */
                if (loadingProgress < 70) {

                    loadingProgress +=
                        Math.random() * 4 + 1;

                } else if (
                    loadingProgress < 90
                ) {

                    loadingProgress +=
                        Math.random() * 2 + 0.5;

                } else if (
                    loadingProgress < 100
                ) {

                    loadingProgress += 0.4;

                }


                if (loadingProgress > 100) {

                    loadingProgress = 100;

                }


                updateLoader();


                /*
                 * Finish.
                 */
                if (loadingProgress >= 100) {

                    clearInterval(
                        loaderInterval
                    );

                    finishPageLoader();

                }

            },
            70
        );

}


/*
 * Update progress UI.
 */
function updateLoader() {

    const roundedProgress =
        Math.floor(
            loadingProgress
        );


    if (loaderProgress) {

        loaderProgress.style.width =
            `${roundedProgress}%`;

    }


    if (loaderPercentage) {

        loaderPercentage.textContent =
            `${String(roundedProgress).padStart(2, "0")}%`;

    }

}


/*
 * Finish loader.
 */
function finishPageLoader() {

    /*
     * Small delay gives the final
     * 100% state visual breathing room.
     */
    setTimeout(
        function () {

            if (pageLoader) {

                pageLoader.classList.add(
                    "is-hidden"
                );

            }


            document.body.style.overflow = "";


            /*
             * Remove loader from accessibility
             * tree after animation.
             */
            setTimeout(
                function () {

                    if (pageLoader) {

                        pageLoader.style.display =
                            "none";

                    }

                },
                1000
            );

        },
        350
    );

}


/*
 * Start immediately.
 */
startPageLoader();


/* =========================================================
   03. NAVBAR SCROLL EFFECT
========================================================= */

function updateNavbarOnScroll() {

    if (!siteHeader) {
        return;
    }


    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


/*
 * Initial state.
 */
updateNavbarOnScroll();


/*
 * Scroll listener.
 */
window.addEventListener(
    "scroll",
    updateNavbarOnScroll,
    {
        passive: true
    }
);


/* =========================================================
   04. MOBILE MENU
========================================================= */

function openMobileMenu() {

    if (!mobileMenuButton) {
        return;
    }


    mobileMenuButton.classList.add(
        "open"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );


    mobileMenu.classList.add(
        "open"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );


    mobileOverlay.classList.add(
        "open"
    );


    document.body.classList.add(
        "menu-open"
    );

}


function closeMobileMenu() {

    if (!mobileMenuButton) {
        return;
    }


    mobileMenuButton.classList.remove(
        "open"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    mobileMenu.classList.remove(
        "open"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );


    mobileOverlay.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/*
 * Toggle mobile menu.
 */
if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileMenuButton.classList.contains(
                    "open"
                );


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );

}


/* =========================================================
   05. MOBILE OVERLAY CLICK
========================================================= */

if (mobileOverlay) {

    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

}


/* =========================================================
   06. MOBILE LINK CLICK
========================================================= */

mobileNavLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    }
);


/* =========================================================
   07. ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            mobileMenuButton.classList.contains(
                "open"
            )
        ) {

            closeMobileMenu();

            mobileMenuButton.focus();

        }

    }
);


/* =========================================================
   08. RESIZE HANDLING
========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
         * If desktop width is restored,
         * close mobile navigation.
         */
        if (
            window.innerWidth > 991 &&
            mobileMenuButton.classList.contains(
                "open"
            )
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   09. DESKTOP ACTIVE NAVIGATION
   ---------------------------------------------------------
   Future-ready.

   Once these sections exist:

   #home
   #about
   #services
   #projects
   #blog
   #contact

   the script automatically detects
   which section is visible.
========================================================= */

const sections = [];


desktopNavLinks.forEach(
    function (link) {

        const target =
            link.getAttribute("href");


        /*
         * Only process internal anchors.
         */
        if (
            !target ||
            !target.startsWith("#") ||
            target === "#"
        ) {

            return;

        }


        const section =
            document.querySelector(
                target
            );


        if (section) {

            sections.push({
                element: section,
                link: link
            });

        }

    }
);


/* =========================================================
   10. INTERSECTION OBSERVER
========================================================= */

if (sections.length > 0) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        /*
                         * Remove current active
                         * state.
                         */
                        desktopNavLinks.forEach(
                            function (link) {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        mobileNavLinks.forEach(
                            function (link) {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        /*
                         * Find matching section.
                         */
                        const matchingItem =
                            sections.find(
                                function (item) {

                                    return (
                                        item.element ===
                                        entry.target
                                    );

                                }
                            );


                        if (
                            matchingItem &&
                            matchingItem.link
                        ) {

                            matchingItem.link.classList.add(
                                "active"
                            );


                            /*
                             * Sync mobile
                             * navigation.
                             */
                            const targetId =
                                matchingItem.link.getAttribute(
                                    "href"
                                );


                            const mobileLink =
                                document.querySelector(
                                    `[data-mobile-link][href="${targetId}"]`
                                );


                            if (mobileLink) {

                                mobileLink.classList.add(
                                    "active"
                                );

                            }

                        }

                    }
                );

            },
            {
                root: null,

                /*
                 * Detect around middle
                 * area of viewport.
                 */
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0

            }
        );


    sections.forEach(
        function (item) {

            observer.observe(
                item.element
            );

        }
    );

}


/* =========================================================
   11. MOBILE ACTIVE STATE SYNC
========================================================= */

mobileNavLinks.forEach(
    function (mobileLink) {

        mobileLink.addEventListener(
            "click",
            function () {

                /*
                 * Remove active from
                 * all mobile links.
                 */
                mobileNavLinks.forEach(
                    function (link) {

                        link.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                 * Add active to clicked link.
                 */
                mobileLink.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   12. DESKTOP LINK CLICK
========================================================= */

desktopNavLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                desktopNavLinks.forEach(
                    function (navLink) {

                        navLink.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   13. PREVENT HASH JUMP IF SECTION DOESN'T EXIST
   ---------------------------------------------------------
   During navbar-only development, #about etc.
   don't exist yet.

   Once sections are added this logic naturally
   stops being relevant.
========================================================= */

desktopNavLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const target =
                    link.getAttribute("href");


                if (
                    target &&
                    target.startsWith("#")
                ) {

                    const element =
                        document.querySelector(
                            target
                        );


                    /*
                     * If section does not yet
                     * exist, don't jump to top.
                     */
                    if (!element) {

                        event.preventDefault();

                    }

                }

            }
        );

    }
);


/* =========================================================
   14. PAGE VISIBILITY
   ---------------------------------------------------------
   Helps prevent loader from becoming annoying
   when returning to an already loaded tab.
========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        /*
         * No action required currently.
         *
         * Kept here as a future hook for:
         * - animation pause
         * - analytics
         * - performance optimisation
         */

    }
);


/* =========================================================
   navbar END

/* =========================================================
   ABOUT PAGE JAVASCRIPT
   GSAP + ScrollTrigger + Interactive Effects
   ========================================================= */


/* =========================================================
   WAIT FOR DOM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       GSAP SETUP
    ===================================================== */

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {

        console.warn(
            "GSAP or ScrollTrigger could not be loaded."
        );

        return;

    }


    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       HERO INTRO ANIMATION
    ===================================================== */

    if (!reducedMotion) {

        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power4.out"
            }
        });


        heroTimeline

            .from(".about-intro .section-eyebrow", {
                y: 25,
                opacity: 0,
                duration: .8
            })

            .from(".about-title", {
                y: 60,
                opacity: 0,
                duration: 1.1
            }, "-=.45")

            .from(".about-lead", {
                y: 30,
                opacity: 0,
                duration: .8
            }, "-=.65")

            .from(".about-description", {
                y: 25,
                opacity: 0,
                duration: .7
            }, "-=.55")

            .from(".about-tags span", {
                y: 15,
                opacity: 0,
                stagger: .06,
                duration: .45
            }, "-=.35")

            .from(".hero-actions", {
                y: 20,
                opacity: 0,
                duration: .6
            }, "-=.25");


        gsap.from(".profile-card", {

            scale: .82,
            opacity: 0,
            rotationY: -15,
            duration: 1.4,
            ease: "power4.out",
            delay: .25

        });


        gsap.from(".floating-badge", {

            scale: .5,
            opacity: 0,
            stagger: .18,
            duration: .8,
            ease: "back.out(1.7)",
            delay: .7

        });


        gsap.from(".profile-ring", {

            scale: .5,
            opacity: 0,
            stagger: .1,
            duration: 1.5,
            ease: "power3.out",
            delay: .2

        });

    }


    /* =====================================================
       GENERIC REVEAL ANIMATIONS
    ===================================================== */

    const revealUpElements =
        document.querySelectorAll(".reveal-up");


    revealUpElements.forEach((element) => {

        if (reducedMotion) {

            gsap.set(element, {
                opacity: 1,
                y: 0
            });

            return;

        }


        gsap.fromTo(
            element,

            {
                opacity: 0,
                y: 60
            },

            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",

                scrollTrigger: {

                    trigger: element,

                    start: "top 84%",

                    once: true

                }

            }
        );

    });


    /* =====================================================
       LEFT REVEALS
    ===================================================== */

    document
        .querySelectorAll(".reveal-left")
        .forEach((element) => {

            if (reducedMotion) {

                gsap.set(element, {
                    opacity: 1,
                    x: 0
                });

                return;

            }


            gsap.fromTo(
                element,

                {
                    opacity: 0,
                    x: -70
                },

                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power4.out",

                    scrollTrigger: {

                        trigger: element,

                        start: "top 82%",

                        once: true

                    }

                }
            );

        });


    /* =====================================================
       RIGHT REVEALS
    ===================================================== */

    document
        .querySelectorAll(".reveal-right")
        .forEach((element) => {

            if (reducedMotion) {

                gsap.set(element, {
                    opacity: 1,
                    x: 0
                });

                return;

            }


            gsap.fromTo(
                element,

                {
                    opacity: 0,
                    x: 70
                },

                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power4.out",

                    scrollTrigger: {

                        trigger: element,

                        start: "top 84%",

                        once: true

                    }

                }
            );

        });


    /* =====================================================
       EXPERIENCE TIMELINE
    ===================================================== */

    const timelineProgress =
        document.querySelector(".timeline-progress");


    if (timelineProgress && !reducedMotion) {

        gsap.to(timelineProgress, {

            height: "100%",

            ease: "none",

            scrollTrigger: {

                trigger: ".experience-timeline",

                start: "top 70%",

                end: "bottom 70%",

                scrub: 1

            }

        });

    }


    /* =====================================================
       EXPERIENCE CARDS STAGGER
    ===================================================== */

    const experienceItems =
        document.querySelectorAll(".experience-item");


    experienceItems.forEach((item, index) => {

        if (reducedMotion) return;


        gsap.fromTo(
            item,

            {
                opacity: 0,
                y: 55
            },

            {
                opacity: 1,
                y: 0,
                duration: .9,
                delay: index * .05,
                ease: "power4.out",

                scrollTrigger: {

                    trigger: item,

                    start: "top 86%",

                    once: true

                }

            }
        );

    });


    /* =====================================================
       SKILL CARDS STAGGER
    ===================================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");


    skillCards.forEach((card, index) => {

        if (reducedMotion) return;


        gsap.fromTo(
            card,

            {
                opacity: 0,
                y: 70,
                scale: .96
            },

            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                delay: index * .07,
                ease: "power4.out",

                scrollTrigger: {

                    trigger: card,

                    start: "top 88%",

                    once: true

                }

            }
        );

    });


    /* =====================================================
       CERTIFICATION ITEMS
    ===================================================== */

    gsap.from(
        ".cert-item",
        {

            opacity: 0,
            x: 35,
            stagger: .12,
            duration: .7,
            ease: "power3.out",

            scrollTrigger: {

                trigger: ".certification-card",

                start: "top 78%",

                once: true

            }

        }
    );


    /* =====================================================
       PHILOSOPHY VISUAL PARALLAX
    ===================================================== */

    if (!reducedMotion) {

        gsap.to(".philosophy-visual", {

            y: -45,

            ease: "none",

            scrollTrigger: {

                trigger: ".philosophy-section",

                start: "top bottom",

                end: "bottom top",

                scrub: 1

            }

        });

    }


    /* =====================================================
       PROFILE IMAGE PARALLAX
    ===================================================== */

    if (!reducedMotion) {

        gsap.to(".profile-image", {

            yPercent: 4,

            scale: 1.05,

            ease: "none",

            scrollTrigger: {

                trigger: ".about-hero",

                start: "top top",

                end: "bottom top",

                scrub: 1

            }

        });

    }


    /* =====================================================
       MOUSE FOLLOW PROFILE CARD
    ===================================================== */

    const profileStage =
        document.querySelector(".profile-stage");

    const profileCard =
        document.querySelector(".profile-card");


    if (
        profileStage &&
        profileCard &&
        !reducedMotion
    ) {

        profileStage.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    profileStage.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 10;

                const rotateX =
                    ((y / rect.height) - .5) * -10;


                gsap.to(profileCard, {

                    rotateX,
                    rotateY,

                    duration: .6,

                    ease: "power2.out",

                    overwrite: true

                });

            }
        );


        profileStage.addEventListener(
            "pointerleave",
            () => {

                gsap.to(profileCard, {

                    rotateX: 0,
                    rotateY: 0,

                    duration: .8,

                    ease: "power3.out"

                });

            }
        );

    }


    /* =====================================================
       3D TILT SKILL CARDS
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(".tilt-card");


    if (!reducedMotion) {

        tiltCards.forEach((card) => {

            card.addEventListener(
                "pointermove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    const rotateY =
                        ((x / rect.width) - .5) * 8;

                    const rotateX =
                        ((y / rect.height) - .5) * -8;


                    gsap.to(card, {

                        rotateX,
                        rotateY,

                        duration: .4,

                        ease: "power2.out",

                        overwrite: true

                    });

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    gsap.to(card, {

                        rotateX: 0,
                        rotateY: 0,

                        duration: .6,

                        ease: "power3.out"

                    });

                }
            );

        });

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(".magnetic-btn");


    if (!reducedMotion) {

        magneticButtons.forEach((button) => {

            button.addEventListener(
                "pointermove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    gsap.to(button, {

                        x: x * .16,
                        y: y * .16,

                        duration: .35,

                        ease: "power3.out"

                    });

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    gsap.to(button, {

                        x: 0,
                        y: 0,

                        duration: .6,

                        ease: "elastic.out(1, .4)"

                    });

                }
            );

        });

    }


    /* =====================================================
       ABOUT TAG MICRO ANIMATION
    ===================================================== */

    const aboutTags =
        document.querySelectorAll(".about-tags span");


    aboutTags.forEach((tag, index) => {

        if (reducedMotion) return;


        gsap.to(tag, {

            y: -3,

            duration: 1.8,

            delay: index * .1,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    });


    /* =====================================================
       FLOATING BADGES
    ===================================================== */

    if (!reducedMotion) {

        gsap.to(".badge-seo", {

            y: -14,
            duration: 3.7,

            repeat: -1,
            yoyo: true,

            ease: "sine.inOut"

        });


        gsap.to(".badge-ads", {

            y: -18,
            duration: 4.2,

            delay: .6,

            repeat: -1,
            yoyo: true,

            ease: "sine.inOut"

        });


        gsap.to(".badge-social", {

            y: -12,
            duration: 3.9,

            delay: 1,

            repeat: -1,
            yoyo: true,

            ease: "sine.inOut"

        });

    }


    /* =====================================================
       CTA PARALLAX
    ===================================================== */

    if (!reducedMotion) {

        gsap.to(".cta-decoration", {

            rotation: 15,

            ease: "none",

            scrollTrigger: {

                trigger: ".about-cta",

                start: "top bottom",

                end: "bottom top",

                scrub: 1.2

            }

        });

    }


    /* =====================================================
       SMART TOOL MARQUEE PAUSE
    ===================================================== */

    const marqueeWrapper =
        document.querySelector(".tool-marquee-wrapper");


    const marquees =
        document.querySelectorAll(".tool-marquee");


    if (marqueeWrapper) {

        marqueeWrapper.addEventListener(
            "mouseenter",
            () => {

                marquees.forEach((marquee) => {

                    marquee.style.animationPlayState =
                        "paused";

                });

            }
        );


        marqueeWrapper.addEventListener(
            "mouseleave",
            () => {

                marquees.forEach((marquee) => {

                    marquee.style.animationPlayState =
                        "running";

                });

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });

            });

        });


    /* =====================================================
       REFRESH SCROLLTRIGGER
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            ScrollTrigger.refresh();

        }
    );


});



// footer start


/* =========================================================
   PREMIUM FOOTER JAVASCRIPT
========================================================= */


/* =========================================================
   01. CURRENT YEAR
========================================================= */

const footerYear =
    document.getElementById("footerYear");


if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   02. BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   03. FOOTER SOCIAL LINK PROTECTION
   ---------------------------------------------------------
   Remove this later when real URLs are added.
========================================================= */

const placeholderSocialLinks =
    document.querySelectorAll(
        '.social-link[href="#"]'
    );


placeholderSocialLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                /*
                 * Prevent jumping to the top
                 * while links are placeholders.
                 */
                event.preventDefault();

            }
        );

    }
);
// footer end