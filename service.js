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
   SERVICE PAGE JS
   SAMEER N. KEREKAR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       GSAP
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

    }


    /* =====================================================
       SERVICE DATA
    ===================================================== */

    const serviceData = {

        seo: {

            index: "01 / 07",

            number: "01",

            icon: "bi-search",

            category: "ORGANIC GROWTH",

            title: "Search Engine Optimisation",

            description:
                "Building sustainable organic visibility through technical SEO, search intent, content optimisation, internal linking, on-page improvements and performance analysis.",

            list: [
                "Technical SEO",
                "Keyword & search intent research",
                "On-page optimisation",
                "Content strategy",
                "Internal linking",
                "Search performance analysis"
            ],

            pills: [
                "Visibility",
                "Relevance",
                "Authority",
                "Technical Health"
            ]

        },


        performance: {

            index: "02 / 07",

            number: "02",

            icon: "bi-bar-chart-line",

            category: "PAID ACQUISITION",

            title: "Performance Marketing",

            description:
                "Paid acquisition across Google Ads and Meta Ads, connecting campaign structure, audience targeting, creative assets, landing pages and conversion measurement.",

            list: [
                "Google Ads campaigns",
                "Meta Ads campaigns",
                "Audience & targeting strategy",
                "Creative direction",
                "Conversion tracking",
                "Campaign optimisation"
            ],

            pills: [
                "Acquisition",
                "Conversions",
                "Creative",
                "Measurement"
            ]

        },


        social: {

            index: "03 / 07",

            number: "03",

            icon: "bi-megaphone",

            category: "BRAND & AUDIENCE",

            title: "Social Media Marketing",

            description:
                "Creating a consistent social presence through content planning, creative direction, platform-aware communication and performance feedback.",

            list: [
                "Social media strategy",
                "Content planning",
                "Creative concepts",
                "Post & campaign content",
                "Audience engagement",
                "Social performance review"
            ],

            pills: [
                "Content",
                "Consistency",
                "Reach",
                "Engagement"
            ]

        },


        ecommerce: {

            index: "04 / 07",

            number: "04",

            icon: "bi-cart3",

            category: "COMMERCE GROWTH",

            title: "eCommerce Marketing",

            description:
                "Connecting product visibility, search, paid acquisition, product feeds, landing pages and user experience across the eCommerce journey.",

            list: [
                "Product SEO",
                "Google Merchant Center",
                "Shopping campaign support",
                "Product feed optimisation",
                "Category & landing-page strategy",
                "Conversion-focused improvements"
            ],

            pills: [
                "Products",
                "Visibility",
                "Feeds",
                "Conversion"
            ]

        },


        web: {

            index: "05 / 07",

            number: "05",

            icon: "bi-code-slash",

            category: "DIGITAL EXPERIENCE",

            title: "Website Development",

            description:
                "Building and improving responsive websites and landing pages with SEO, usability and marketing requirements considered from the beginning.",

            list: [
                "WordPress development",
                "HTML & CSS",
                "JavaScript",
                "Responsive layouts",
                "Landing pages",
                "SEO-aware implementation"
            ],

            pills: [
                "UX",
                "Performance",
                "SEO",
                "Responsive"
            ]

        },


        creative: {

            index: "06 / 07",

            number: "06",

            icon: "bi-bezier2",

            category: "CREATIVE SYSTEM",

            title: "Creative & Content",

            description:
                "Developing visual and video content that supports social channels, paid campaigns, brand communication and digital experiences.",

            list: [
                "Creative concepts",
                "Social media creatives",
                "Ad creative direction",
                "Graphic design",
                "Short-form video",
                "Content production"
            ],

            pills: [
                "Design",
                "Video",
                "Creative",
                "Content"
            ]

        },


        analytics: {

            index: "07 / 07",

            number: "07",

            icon: "bi-pie-chart",

            category: "MEASUREMENT",

            title: "Analytics & CRO",

            description:
                "Using analytics and conversion signals to understand user behaviour, identify friction and support more informed digital marketing decisions.",

            list: [
                "Google Analytics 4",
                "Google Search Console",
                "Google Tag Manager",
                "Conversion tracking",
                "Landing-page analysis",
                "Performance reporting"
            ],

            pills: [
                "Tracking",
                "Insights",
                "CRO",
                "Decisions"
            ]

        }

    };


    /* =====================================================
       SERVICE SWITCHER
    ===================================================== */

    const serviceTabs = document.querySelectorAll(
        ".service-tab"
    );

    const detailIcon = document.querySelector(
        "#detailIcon"
    );

    const detailIndex = document.querySelector(
        "#detailIndex"
    );

    const detailTitle = document.querySelector(
        "#detailTitle"
    );

    const detailDescription = document.querySelector(
        "#detailDescription"
    );

    const detailList = document.querySelector(
        "#detailList"
    );

    const detailPills = document.querySelector(
        "#detailPills"
    );

    const detailCategory = document.querySelector(
        ".detail-category"
    );

    const detailNumber = document.querySelector(
        ".detail-background-number"
    );


    function updateService(serviceKey) {

        const data = serviceData[serviceKey];

        if (!data) return;


        /* -------------------------
           ACTIVE TAB
        ------------------------- */

        serviceTabs.forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.service === serviceKey
            );

        });


        /* -------------------------
           CONTENT ANIMATION
        ------------------------- */

        if (
            typeof gsap !== "undefined" &&
            !reducedMotion
        ) {

            const detailElements = [
                detailIcon,
                detailIndex,
                detailTitle,
                detailDescription,
                detailList,
                detailPills
            ];

            gsap.to(
                detailElements,
                {
                    opacity: 0,
                    y: 15,
                    duration: 0.18,
                    stagger: 0.02,
                    ease: "power2.in",
                    onComplete: () => {

                        renderService(data);

                        gsap.fromTo(
                            detailElements,
                            {
                                opacity: 0,
                                y: 18
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.45,
                                stagger: 0.04,
                                ease: "power3.out"
                            }
                        );

                    }
                }
            );

        } else {

            renderService(data);

        }

    }


    function renderService(data) {

        detailIcon.className =
            `bi ${data.icon}`;

        detailIndex.textContent =
            data.index;

        detailTitle.textContent =
            data.title;

        detailDescription.textContent =
            data.description;

        detailCategory.textContent =
            data.category;

        detailNumber.textContent =
            data.number;


        detailList.innerHTML =
            data.list
                .map(item => `<li>${item}</li>`)
                .join("");


        detailPills.innerHTML =
            data.pills
                .map(item => `<span>${item}</span>`)
                .join("");

    }


    serviceTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                updateService(
                    tab.dataset.service
                );

            }
        );

    });


    /* =====================================================
       GSAP SCROLL REVEALS
    ===================================================== */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !reducedMotion
    ) {


        /* -------------------------
           GENERAL REVEALS
        ------------------------- */

        gsap.utils
            .toArray(".reveal-up")
            .forEach(element => {

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

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: element,

                            start: "top 85%",

                            once: true

                        }
                    }
                );

            });


        /* -------------------------
           LEFT REVEALS
        ------------------------- */

        gsap.utils
            .toArray(".reveal-left")
            .forEach(element => {

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

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: element,

                            start: "top 85%",

                            once: true

                        }
                    }
                );

            });


        /* -------------------------
           RIGHT REVEALS
        ------------------------- */

        gsap.utils
            .toArray(".reveal-right")
            .forEach(element => {

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

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: element,

                            start: "top 85%",

                            once: true

                        }
                    }
                );

            });


        /* =================================================
           HERO INTRO
        ================================================= */

        const heroTimeline = gsap.timeline();

        heroTimeline

            .from(
                ".hero-content .section-kicker",
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.6
                }
            )

            .from(
                ".hero-index",
                {
                    opacity: 0,
                    x: -25,
                    duration: 0.5
                },
                "-=0.3"
            )

            .from(
                ".service-hero h1",
                {
                    opacity: 0,
                    y: 50,
                    duration: 0.9,
                    ease: "power3.out"
                },
                "-=0.25"
            )

            .from(
                ".hero-description",
                {
                    opacity: 0,
                    y: 25,
                    duration: 0.65
                },
                "-=0.45"
            )

            .from(
                ".hero-tags span",
                {
                    opacity: 0,
                    y: 15,
                    stagger: 0.06,
                    duration: 0.35
                },
                "-=0.3"
            )

            .from(
                ".hero-actions",
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.5
                },
                "-=0.15"
            );


        /* =================================================
           HERO ORBIT NODES
        ================================================= */

        gsap.from(
            ".orbit-node",
            {
                opacity: 0,
                scale: 0.5,
                stagger: 0.1,
                duration: 0.7,
                ease: "back.out(1.8)",
                delay: 0.5
            }
        );


        /* =================================================
           CORE ORB FLOAT
        ================================================= */

        gsap.to(
            ".core-orb",
            {
                y: -12,
                duration: 2.7,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        /* =================================================
           ORBIT NODE FLOAT
        ================================================= */

        gsap.utils
            .toArray(".orbit-node")
            .forEach((node, index) => {

                gsap.to(
                    node,
                    {
                        y: index % 2 === 0
                            ? -8
                            : 8,

                        duration:
                            2.4 + index * 0.25,

                        repeat: -1,

                        yoyo: true,

                        ease: "sine.inOut"
                    }
                );

            });


        /* =================================================
           TERMINAL BLINK
        ================================================= */

        gsap.to(
            ".terminal-body",
            {
                opacity: 0.7,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        /* =================================================
           CAPABILITY CARDS
        ================================================= */

        gsap.utils
            .toArray(".capability-card")
            .forEach((card, index) => {

                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 70,
                        scale: 0.96
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,

                        duration: 0.8,

                        delay: index * 0.08,

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: card,

                            start: "top 88%",

                            once: true

                        }

                    }
                );

            });


        /* =================================================
           PROCESS LINE
        ================================================= */

        gsap.to(
            ".process-line span",
            {
                height: "100%",

                ease: "none",

                scrollTrigger: {

                    trigger: ".process-track",

                    start: "top 70%",

                    end: "bottom 70%",

                    scrub: true

                }

            }
        );


        /* =================================================
           PROCESS ITEMS
        ================================================= */

        gsap.utils
            .toArray(".process-item")
            .forEach((item, index) => {

                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        x: index % 2 === 0
                            ? -35
                            : 35
                    },
                    {
                        opacity: 1,
                        x: 0,

                        duration: 0.8,

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: item,

                            start: "top 82%",

                            once: true

                        }

                    }
                );

            });


        /* =================================================
           PERFORMANCE SYSTEM
        ================================================= */

        gsap.to(
            ".system-ring",
            {
                rotation: 360,
                duration: 25,
                repeat: -1,
                ease: "none"
            }
        );


        gsap.to(
            ".system-center",
            {
                scale: 1.05,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        /* =================================================
           TOOL ORBIT
        ================================================= */

        gsap.to(
            ".tool-orbit-ring",
            {
                rotation: 360,
                duration: 22,
                repeat: -1,
                ease: "none"
            }
        );


        /* =================================================
           CTA RINGS
        ================================================= */

        gsap.to(
            ".cta-center",
            {
                scale: 1.08,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        /* =================================================
           SECTION PARALLAX
        ================================================= */

        gsap.to(
            ".detail-background-number",
            {
                yPercent: -20,

                ease: "none",

                scrollTrigger: {

                    trigger: ".service-interface",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: true

                }

            }
        );


        gsap.to(
            ".value-number",
            {
                yPercent: -15,

                ease: "none",

                scrollTrigger: {

                    trigger: ".value-section",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: true

                }

            }
        );

    }


    /* =====================================================
       TILT EFFECT
    ===================================================== */

    if (!reducedMotion) {

        const tiltCards =
            document.querySelectorAll(
                ".tilt-card"
            );

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -4;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        4;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    if (!reducedMotion) {

        const magneticButtons =
            document.querySelectorAll(
                ".magnetic-btn"
            );

        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

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


                    button.style.transform =
                        `translate(${x * 0.08}px,
                                   ${y * 0.08}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );

    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.opacity = "1";

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progressBar =
        document.querySelector(
            ".scroll-progress span"
        );

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const progress =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        if (progressBar) {

            progressBar.style.width =
                `${progress}%`;

        }

    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );

    updateScrollProgress();


    /* =====================================================
       INITIAL SERVICE
    ===================================================== */

    updateService("seo");


    /* =====================================================
       REFRESH SCROLLTRIGGER
    ===================================================== */

    if (
        typeof ScrollTrigger !== "undefined"
    ) {

        window.addEventListener(
            "load",
            () => {

                ScrollTrigger.refresh();

            }
        );

    }

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