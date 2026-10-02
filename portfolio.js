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


/* ============================================================
   PORTFOLIO JAVASCRIPT
   Sameer Kerekar — Digital Marketing Portfolio

   Features:
   - GSAP reveal animations
   - Safe fallback if GSAP fails
   - Filter system
   - Case-study lightbox
   - Keyboard navigation
   - Touch swipe navigation
   - Video controls
   - Desktop 3D hover
   - Scroll progress
   - Parallax
   - Reduced-motion support
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       DOM
    ======================================================== */

    const body = document.body;

    const portfolio = document.querySelector("#portfolio");

    const scrollProgress =
        document.querySelector("#scrollProgress");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectItems =
        document.querySelectorAll(".project-item");

    const projectStatus =
        document.querySelector("#projectStatus");

    const mediaTriggers =
        document.querySelectorAll(".media-trigger");

    const disciplineTriggers =
        document.querySelectorAll("[data-filter-trigger]");

    const lightbox =
        document.querySelector("#portfolioLightbox");

    const lightboxMedia =
        document.querySelector("#lightboxMedia");

    const lightboxCurrent =
        document.querySelector("#lightboxCurrent");

    const lightboxTotal =
        document.querySelector("#lightboxTotal");

    const lightboxCategory =
        document.querySelector("#lightboxCategory");

    const lightboxTitle =
        document.querySelector("#lightboxTitle");

    const lightboxDescription =
        document.querySelector("#lightboxDescription");

    const lightboxTools =
        document.querySelector("#lightboxTools");

    const lightboxPrev =
        document.querySelector("#lightboxPrev");

    const lightboxNext =
        document.querySelector("#lightboxNext");

    const closeButtons =
        document.querySelectorAll("[data-lightbox-close]");


    /* ========================================================
       STATE
    ======================================================== */

    const state = {

        currentFilter: "all",

        currentProject: null,

        currentMediaIndex: 0,

        lastFocusedElement: null,

        touchStartX: 0,

        touchEndX: 0,

        modalOpen: false

    };


    /* ========================================================
       PROJECT DATA
    ======================================================== */

    const projects = {

        "seo-01": {

            category: "SEO",

            title: "Organic Search Growth & Search Visibility",

            description:
                "Search-focused optimisation combining technical review, search intent, on-page improvements and content direction.",

            tools: [
                "Google Search Console",
                "GA4",
                "SEMrush",
                "GTM"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-01-main.webp",
                    alt: "SEO organic search project main visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-01-02.webp",
                    alt: "SEO project supporting analytics visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-01-03.webp",
                    alt: "SEO keyword and content research visual"
                }

            ]

        },


        "seo-02": {

            category: "SEO",

            title: "Content Strategy & Search Intent",

            description:
                "Content-led SEO work focused on mapping search demand to useful category, subcategory and supporting content opportunities.",

            tools: [
                "Google Search Console",
                "SEMrush",
                "GA4"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-02-main.webp",
                    alt: "SEO content strategy main visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-02-02.webp",
                    alt: "SEO content strategy supporting visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-02-03.webp",
                    alt: "SEO keyword research supporting visual"
                }

            ]

        },


        "seo-03": {

            category: "SEO",

            title: "eCommerce SEO & Category Optimisation",

            description:
                "Commercial SEO work focused on category and product discoverability, search intent, metadata and website architecture.",

            tools: [
                "Google Search Console",
                "Google Merchant Center",
                "GA4",
                "SEMrush"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-03-main.webp",
                    alt: "eCommerce SEO main visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-03-02.webp",
                    alt: "eCommerce category SEO visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/seo/seo-03-03.webp",
                    alt: "eCommerce product SEO visual"
                }

            ]

        },


        "performance-01": {

            category: "Performance Marketing",

            title: "Search Campaign Structure & Acquisition",

            description:
                "Paid search work focused on intent, campaign architecture, ad messaging and landing-page alignment.",

            tools: [
                "Google Ads",
                "Keyword Research",
                "Campaign Structure",
                "Landing Pages"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-01-main.webp",
                    alt: "Google Ads search campaign project"
                },

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-01-02.webp",
                    alt: "Google Ads campaign structure"
                },

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-01-03.webp",
                    alt: "Google Ads ad and landing page alignment"
                }

            ]

        },


        "performance-02": {

            category: "Performance Marketing",

            title: "Paid Social Creative Testing",

            description:
                "Creative-led paid social work focused on audience relevance, message variation and visual testing.",

            tools: [
                "Meta Ads",
                "Creative Testing",
                "Audience Research",
                "Creative Strategy"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-02-main.webp",
                    alt: "Meta Ads creative testing main visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-02-02.webp",
                    alt: "Meta Ads creative variation"
                },

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-02-03.webp",
                    alt: "Paid social creative variation"
                }

            ]

        },


        "performance-03": {

            category: "Performance Marketing",

            title: "Cross-Channel Acquisition Journey",

            description:
                "An integrated acquisition framework connecting paid media, creative, landing pages and measurement.",

            tools: [
                "Google Ads",
                "Meta Ads",
                "Landing Pages",
                "Analytics"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-03-main.webp",
                    alt: "Cross-channel acquisition project"
                },

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-03-02.webp",
                    alt: "Cross-channel campaign supporting visual"
                },

                {
                    type: "image",
                    src: "assets/portfolio/performance/performance-03-03.webp",
                    alt: "Cross-channel tracking supporting visual"
                }

            ]

        },


        "social-collection": {

            category: "Social Media",

            title: "Content Systems & Social Creative",

            description:
                "A curated social media collection covering promotional, educational, branded and engagement-focused creative.",

            tools: [
                "Content Planning",
                "Creative Direction",
                "Social Media",
                "Canva"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/social/social-01.webp",
                    alt: "Social media creative one"
                },

                {
                    type: "image",
                    src: "assets/portfolio/social/social-02.webp",
                    alt: "Social media creative two"
                },

                {
                    type: "image",
                    src: "assets/portfolio/social/social-03.webp",
                    alt: "Social media creative three"
                },

                {
                    type: "image",
                    src: "assets/portfolio/social/social-04.webp",
                    alt: "Social media creative four"
                },

                {
                    type: "image",
                    src: "assets/portfolio/social/social-05.webp",
                    alt: "Social media creative five"
                },

                {
                    type: "image",
                    src: "assets/portfolio/social/social-06.webp",
                    alt: "Social media creative six"
                }

            ]

        },


        "design-collection": {

            category: "Graphic Design",

            title: "Visual Communication & Creative Design",

            description:
                "Selected visual work covering social creatives, promotional artwork, branded layouts and digital campaign assets.",

            tools: [
                "Canva",
                "Photoshop",
                "Creative Direction",
                "Visual Design"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/design/design-01.webp",
                    alt: "Graphic design project one"
                },

                {
                    type: "image",
                    src: "assets/portfolio/design/design-02.webp",
                    alt: "Graphic design project two"
                },

                {
                    type: "image",
                    src: "assets/portfolio/design/design-03.webp",
                    alt: "Graphic design project three"
                },

                {
                    type: "image",
                    src: "assets/portfolio/design/design-04.webp",
                    alt: "Graphic design project four"
                },

                {
                    type: "image",
                    src: "assets/portfolio/design/design-05.webp",
                    alt: "Graphic design project five"
                },

                {
                    type: "image",
                    src: "assets/portfolio/design/design-06.webp",
                    alt: "Graphic design project six"
                }

            ]

        },


        "video-collection": {

            category: "Video Editing",

            title: "Short-Form Video & Motion Content",

            description:
                "Selected video work created for social, promotional and digital-first communication.",

            tools: [
                "Premiere Pro",
                "CapCut",
                "Video Editing",
                "Motion"
            ],

            media: [

                {
                    type: "video",
                    src: "assets/portfolio/video/video-01.mp4",
                    poster: "assets/portfolio/video/video-01.webp",
                    alt: "Short form video project one"
                },

                {
                    type: "video",
                    src: "assets/portfolio/video/video-02.mp4",
                    poster: "assets/portfolio/video/video-02.webp",
                    alt: "Promotional video project two"
                },

                {
                    type: "video",
                    src: "assets/portfolio/video/video-03.mp4",
                    poster: "assets/portfolio/video/video-03.webp",
                    alt: "Vertical video project three"
                },

                {
                    type: "video",
                    src: "assets/portfolio/video/video-04.mp4",
                    poster: "assets/portfolio/video/video-04.webp",
                    alt: "Reel editing project four"
                },

                {
                    type: "video",
                    src: "assets/portfolio/video/video-05.mp4",
                    poster: "assets/portfolio/video/video-05.webp",
                    alt: "Digital video project five"
                }

            ]

        },


        "web-collection": {

            category: "Web Design & Development",

            title: "Responsive Web Design & Development",

            description:
                "Selected web projects combining responsive interface design, front-end development, content structure and usability.",

            tools: [
                "HTML",
                "CSS",
                "JavaScript",
                "Bootstrap"
            ],

            media: [

                {
                    type: "image",
                    src: "assets/portfolio/web/web-01.webp",
                    alt: "Web design project one"
                },

                {
                    type: "image",
                    src: "assets/portfolio/web/web-02.webp",
                    alt: "Web design project two"
                },

                {
                    type: "image",
                    src: "assets/portfolio/web/web-03.webp",
                    alt: "Web design project three"
                }

            ]

        }

    };


    /* ========================================================
       SAFE GSAP DETECTION
    ======================================================== */

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hasGSAP =
        typeof window.gsap !== "undefined";

    const hasScrollTrigger =
        hasGSAP &&
        typeof window.ScrollTrigger !== "undefined";


    /* ========================================================
       INITIALISE GSAP
    ======================================================== */

    function initGSAP() {

        /*
         IMPORTANT:
         No element is hidden in CSS.
         GSAP only enhances the experience.
        */

        if (!hasGSAP || prefersReducedMotion) {

            document
                .querySelectorAll(".reveal")
                .forEach(function (element) {

                    element.style.opacity = "1";
                    element.style.visibility = "visible";
                    element.style.transform = "none";

                });

            return;

        }


        if (hasScrollTrigger) {

            gsap.registerPlugin(ScrollTrigger);

        }


        /* ====================================================
           HERO TIMELINE
        ==================================================== */

        const heroTimeline =
            gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });


        heroTimeline
            .from(".hero-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.7
            })
            .from(".hero-title-line", {
                y: 80,
                opacity: 0,
                rotateX: 35,
                stagger: 0.1,
                duration: 1.0,
                transformOrigin: "50% 100%"
            }, "-=0.35")
            .from(".hero-description", {
                y: 25,
                opacity: 0,
                duration: 0.7
            }, "-=0.55")
            .from(".hero-actions", {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.35")
            .from(".hero-meta", {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.35")
            .from(".hero-visual-wrap", {
                scale: 0.92,
                opacity: 0,
                rotateY: 12,
                duration: 1.2
            }, "-=0.8");


        /* ====================================================
           HERO FLOATING TAGS
        ==================================================== */

        gsap.to(".floating-tag--one", {
            y: -12,
            duration: 2.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        gsap.to(".floating-tag--two", {
            y: 12,
            duration: 3.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        gsap.to(".floating-tag--three", {
            y: -8,
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });


        /* ====================================================
           HERO CORE
        ==================================================== */

        gsap.to(".hero-core", {
            y: -10,
            rotateX: 7,
            rotateY: -10,
            duration: 3.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });


        /* ====================================================
           SCROLL REVEALS
        ==================================================== */

        if (hasScrollTrigger) {

            gsap.utils.toArray(
                ".reveal:not(.hero-eyebrow):not(.hero-title-line):not(.hero-description):not(.hero-actions):not(.hero-meta):not(.hero-visual-wrap)"
            ).forEach(function (element) {

                gsap.fromTo(
                    element,
                    {
                        y: 35,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 88%",
                            once: true
                        }
                    }
                );

            });


            /* =================================================
               CASE STUDY VISUALS
            ================================================= */

            gsap.utils.toArray(
                ".case-study-visuals, .performance-layout, .social-mosaic, .design-masonry, .video-grid, .web-projects"
            ).forEach(function (element) {

                gsap.fromTo(
                    element,
                    {
                        y: 40,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 88%",
                            once: true
                        }
                    }
                );

            });


            /* =================================================
               CASE STUDY IMAGES
            ================================================= */

            gsap.utils.toArray(
                ".case-image img, .performance-main-media img"
            ).forEach(function (image) {

                gsap.to(image, {
                    yPercent: -4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: image,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2
                    }
                });

            });


            /* =================================================
               PROCESS CARDS STAGGER
            ================================================= */

            gsap.utils.toArray(".process-line").forEach(function (container) {

                const cards =
                    container.querySelectorAll(".process-card");

                gsap.fromTo(
                    cards,
                    {
                        y: 45,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 82%",
                            once: true
                        }
                    }
                );

            });


            /* =================================================
               CAPABILITIES
            ================================================= */

            gsap.utils.toArray(".capability-row").forEach(function (row, index) {

                gsap.fromTo(
                    row,
                    {
                        x: 30,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.7,
                        delay: index * 0.04,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 92%",
                            once: true
                        }
                    }
                );

            });


            /* =================================================
               CTA
            ================================================= */

            gsap.fromTo(
                ".cta-panel",
                {
                    scale: 0.96,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".cta-panel",
                        start: "top 82%",
                        once: true
                    }
                }
            );


            ScrollTrigger.refresh();

        }

    }


    /* ========================================================
       SCROLL PROGRESS
    ======================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        scrollProgress.style.width =
            `${Math.min(100, Math.max(0, percentage))}%`;

    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* ========================================================
       FILTER SYSTEM
    ======================================================== */

    function setActiveFilter(filter) {

        state.currentFilter = filter;


        filterButtons.forEach(function (button) {

            const isActive =
                button.dataset.filter === filter;

            button.classList.toggle(
                "is-active",
                isActive
            );

            button.setAttribute(
                "aria-selected",
                isActive ? "true" : "false"
            );

        });


        projectItems.forEach(function (project) {

            const category =
                project.dataset.category;

            const shouldShow =
                filter === "all" ||
                category === filter;

            if (shouldShow) {

                project.classList.remove(
                    "is-filtered-out"
                );

            } else {

                project.classList.add(
                    "is-filtered-out"
                );

            }

        });


        updateProjectStatus(filter);


        /*
         Recalculate ScrollTrigger positions after
         changing the amount of content in the document.
        */

        if (hasScrollTrigger) {

            requestAnimationFrame(function () {

                ScrollTrigger.refresh();

            });

        }

    }


    function updateProjectStatus(filter) {

        const names = {

            all: "Showing all work",

            seo: "Showing SEO projects",

            performance: "Showing performance marketing projects",

            social: "Showing social media work",

            design: "Showing graphic design work",

            video: "Showing video editing work",

            web: "Showing web design & development"

        };

        if (projectStatus) {

            projectStatus.textContent =
                names[filter] || names.all;

        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                setActiveFilter(
                    button.dataset.filter
                );

            }
        );

    });


    /* ========================================================
       DISCIPLINE SHORTCUTS
    ======================================================== */

    disciplineTriggers.forEach(function (trigger) {

        trigger.addEventListener(
            "click",
            function () {

                const filter =
                    trigger.dataset.filterTrigger;

                setActiveFilter(filter);

                const work =
                    document.querySelector("#work");

                if (work) {

                    work.scrollIntoView({
                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* ========================================================
       PROJECT MEDIA HELPERS
    ======================================================== */

    function getProject(projectId) {

        return projects[projectId] || null;

    }


    function buildLightboxMedia(project, index) {

        if (!lightboxMedia) {
            return;
        }

        lightboxMedia.innerHTML = "";

        const media =
            project.media[index];

        if (!media) {
            return;
        }


        if (media.type === "video") {

            const video =
                document.createElement("video");

            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;

            video.setAttribute(
                "aria-label",
                media.alt
            );

            if (media.poster) {

                video.poster =
                    media.poster;

            }

            const source =
                document.createElement("source");

            source.src =
                media.src;

            source.type =
                "video/mp4";

            video.appendChild(source);

            lightboxMedia.appendChild(video);

            video.play().catch(function () {
                /* Browser may block autoplay. Controls remain available. */
            });

        } else {

            const image =
                document.createElement("img");

            image.src =
                media.src;

            image.alt =
                media.alt;

            image.loading =
                "eager";

            image.decoding =
                "async";

            lightboxMedia.appendChild(image);

        }

    }


    /* ========================================================
       OPEN LIGHTBOX
    ======================================================== */

    function openLightbox(projectId, mediaIndex) {

        const project =
            getProject(projectId);

        if (!project || !lightbox) {
            return;
        }


        state.lastFocusedElement =
            document.activeElement;

        state.currentProject =
            projectId;

        state.currentMediaIndex =
            Math.max(
                0,
                Math.min(
                    mediaIndex || 0,
                    project.media.length - 1
                )
            );

        state.modalOpen = true;


        updateLightbox();


        lightbox.classList.add(
            "is-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add(
            "portfolio-modal-open"
        );


        const closeButton =
            lightbox.querySelector(
                ".lightbox-close"
            );

        if (closeButton) {

            requestAnimationFrame(function () {

                closeButton.focus();

            });

        }

    }


    /* ========================================================
       UPDATE LIGHTBOX
    ======================================================== */

    function updateLightbox() {

        const project =
            getProject(
                state.currentProject
            );

        if (!project) {
            return;
        }


        buildLightboxMedia(
            project,
            state.currentMediaIndex
        );


        if (lightboxCategory) {

            lightboxCategory.textContent =
                project.category;

        }


        if (lightboxTitle) {

            lightboxTitle.textContent =
                project.title;

        }


        if (lightboxDescription) {

            lightboxDescription.textContent =
                project.description;

        }


        if (lightboxTools) {

            lightboxTools.innerHTML =
                project.tools
                    .map(function (tool) {

                        return `<b>${escapeHTML(tool)}</b>`;

                    })
                    .join("");

        }


        if (lightboxCurrent) {

            lightboxCurrent.textContent =
                String(
                    state.currentMediaIndex + 1
                ).padStart(2, "0");

        }


        if (lightboxTotal) {

            lightboxTotal.textContent =
                String(
                    project.media.length
                ).padStart(2, "0");

        }


        if (lightboxPrev) {

            lightboxPrev.disabled =
                project.media.length <= 1;

        }


        if (lightboxNext) {

            lightboxNext.disabled =
                project.media.length <= 1;

        }

    }


    /* ========================================================
       ESCAPE HTML
    ======================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ========================================================
       CLOSE LIGHTBOX
    ======================================================== */

    function closeLightbox() {

        if (!lightbox || !state.modalOpen) {
            return;
        }


        const video =
            lightbox.querySelector("video");

        if (video) {

            video.pause();

        }


        lightbox.classList.remove(
            "is-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove(
            "portfolio-modal-open"
        );


        state.modalOpen = false;


        setTimeout(function () {

            if (lightboxMedia) {

                lightboxMedia.innerHTML = "";

            }

        }, 350);


        if (
            state.lastFocusedElement &&
            typeof state.lastFocusedElement.focus === "function"
        ) {

            state.lastFocusedElement.focus();

        }

    }


    closeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            closeLightbox
        );

    });


    /* ========================================================
       MEDIA TRIGGERS
    ======================================================== */

    mediaTriggers.forEach(function (trigger) {

        trigger.addEventListener(
            "click",
            function () {

                openLightbox(
                    trigger.dataset.project,
                    Number(
                        trigger.dataset.mediaIndex || 0
                    )
                );

            }
        );


        /*
         Keyboard support for non-button
         media triggers.
        */

        trigger.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openLightbox(
                        trigger.dataset.project,
                        Number(
                            trigger.dataset.mediaIndex || 0
                        )
                    );

                }

            }
        );

    });


    /* ========================================================
       OPEN PROJECT BUTTONS
    ======================================================== */

    document
        .querySelectorAll("[data-open-project]")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    openLightbox(
                        button.dataset.openProject,
                        0
                    );

                }
            );

        });


    /* ========================================================
       LIGHTBOX NAVIGATION
    ======================================================== */

    function nextMedia() {

        const project =
            getProject(
                state.currentProject
            );

        if (!project) {
            return;
        }


        state.currentMediaIndex =
            (
                state.currentMediaIndex + 1
            ) % project.media.length;


        updateLightbox();

    }


    function previousMedia() {

        const project =
            getProject(
                state.currentProject
            );

        if (!project) {
            return;
        }


        state.currentMediaIndex =
            (
                state.currentMediaIndex - 1 +
                project.media.length
            ) % project.media.length;


        updateLightbox();

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            nextMedia
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            previousMedia
        );

    }


    /* ========================================================
       KEYBOARD CONTROLS
    ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (!state.modalOpen) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

                return;

            }


            if (event.key === "ArrowRight") {

                nextMedia();

                return;

            }


            if (event.key === "ArrowLeft") {

                previousMedia();

                return;

            }

        }
    );


    /* ========================================================
       TOUCH SWIPE
    ======================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            function (event) {

                if (!event.changedTouches.length) {
                    return;
                }

                state.touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        lightbox.addEventListener(
            "touchend",
            function (event) {

                if (!event.changedTouches.length) {
                    return;
                }

                state.touchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    state.touchEndX -
                    state.touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {

                    nextMedia();

                } else {

                    previousMedia();

                }

            },
            { passive: true }
        );

    }


    /* ========================================================
       VIDEO SYSTEM
    ======================================================== */

    const videoCards =
        document.querySelectorAll(
            ".media-video-card"
        );


    videoCards.forEach(function (card) {

        const video =
            card.querySelector("video");

        const playButton =
            card.querySelector(".video-play");


        if (!video) {
            return;
        }


        /*
         Desktop:
         Play a muted preview on hover.
        */

        card.addEventListener(
            "mouseenter",
            function () {

                if (
                    window.innerWidth >= 768 &&
                    !prefersReducedMotion
                ) {

                    video.play().catch(function () {});

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                if (window.innerWidth >= 768) {

                    video.pause();

                    video.currentTime = 0;

                }

            }
        );


        /*
         Click / tap:
         Toggle play.
        */

        if (playButton) {

            playButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    if (video.paused) {

                        video.play().catch(function () {});

                    } else {

                        video.pause();

                    }

                }
            );

        }


        video.addEventListener(
            "play",
            function () {

                if (playButton) {

                    playButton.innerHTML =
                        '<i class="bi bi-pause-fill"></i>';

                }

            }
        );


        video.addEventListener(
            "pause",
            function () {

                if (playButton) {

                    playButton.innerHTML =
                        '<i class="bi bi-play-fill"></i>';

                }

            }
        );

    });


    /* ========================================================
       DESKTOP 3D TILT
    ======================================================== */

    function initTilt() {

        if (
            prefersReducedMotion ||
            window.innerWidth < 992
        ) {

            return;

        }


        const tiltElements =
            document.querySelectorAll(
                ".discipline-card, .process-card"
            );


        tiltElements.forEach(function (element) {

            let frame = null;


            element.addEventListener(
                "pointermove",
                function (event) {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    const rotateY =
                        ((x / rect.width) - 0.5) * 5;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -5;


                    if (frame) {

                        cancelAnimationFrame(frame);

                    }


                    frame =
                        requestAnimationFrame(function () {

                            element.style.transform =
                                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

                        });

                }
            );


            element.addEventListener(
                "pointerleave",
                function () {

                    if (frame) {

                        cancelAnimationFrame(frame);

                    }

                    element.style.transform = "";

                }
            );

        });

    }


    /* ========================================================
       HERO PARALLAX
    ======================================================== */

    function initHeroParallax() {

        if (
            prefersReducedMotion ||
            window.innerWidth < 992
        ) {

            return;

        }


        const hero =
            document.querySelector(
                ".portfolio-hero"
            );

        const visual =
            document.querySelector(
                ".hero-visual-wrap"
            );


        if (!hero || !visual) {
            return;
        }


        hero.addEventListener(
            "pointermove",
            function (event) {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                visual.style.transform =
                    `translate3d(${x * 10}px, ${y * 10}px, 0)`;

            }
        );


        hero.addEventListener(
            "pointerleave",
            function () {

                visual.style.transform =
                    "translate3d(0,0,0)";

            }
        );

    }


    /* ========================================================
       IMAGE FALLBACK
    ======================================================== */

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    /*
                     Do not hide broken images.
                     Instead create a clean visual fallback.
                    */

                    image.style.opacity = "0";

                    const parent =
                        image.parentElement;

                    if (
                        parent &&
                        !parent.querySelector(
                            ".image-fallback"
                        )
                    ) {

                        const fallback =
                            document.createElement("span");

                        fallback.className =
                            "image-fallback";

                        fallback.innerHTML =
                            '<i class="bi bi-image"></i><span>Replace portfolio image</span>';

                        Object.assign(
                            fallback.style,
                            {
                                position: "absolute",
                                inset: "0",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                color: "#778297",
                                background: "#0b0e15",
                                fontSize: "10px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em"
                            }
                        );

                        parent.appendChild(
                            fallback
                        );

                    }

                }
            );

        });


    /* ========================================================
       RESIZE
    ======================================================== */

    let resizeTimer = null;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(function () {

                    if (hasScrollTrigger) {

                        ScrollTrigger.refresh();

                    }

                }, 250);

        },
        { passive: true }
    );


    /* ========================================================
       INIT
    ======================================================== */

    function init() {

        initGSAP();

        initTilt();

        initHeroParallax();

        setActiveFilter("all");

        updateScrollProgress();

    }


    /*
     Run after DOM is completely ready.
    */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


})();



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