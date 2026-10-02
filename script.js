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
========================================================= */
// home start
/* =========================================================
   DIGITAL MARKETING HOME INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const home = document.querySelector(".dm-home");

    if (!home) return;


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        home.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );

    revealItems.forEach((item) => {

        revealObserver.observe(item);

    });


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        home.querySelector(".dm-hero");

    const heroArt =
        home.querySelector(".dm-hero-art");

    const heroHub =
        home.querySelector(".dm-hub");

    const desktopPointer =
        window.matchMedia(
            "(min-width: 992px) and (pointer: fine)"
        ).matches;


    if (
        hero &&
        heroArt &&
        heroHub &&
        desktopPointer
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;

                const rotateY =
                    x * 8;

                const rotateX =
                    y * -6;

                const moveX =
                    x * 16;

                const moveY =
                    y * 12;


                heroArt.style.transform =
                    `
                    translate3d(
                        ${moveX}px,
                        ${moveY}px,
                        0
                    )
                    rotateX(${rotateX * .25}deg)
                    rotateY(${rotateY * .25}deg)
                    `;

                heroHub.style.transform =
                    `
                    translate(
                        calc(-50% + ${moveX * .25}px),
                        calc(-50% + ${moveY * .25}px)
                    )
                    `;

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroArt.style.transform =
                    "";

                heroHub.style.transform =
                    "translate(-50%,-50%)";

            }
        );

    }


    /* =====================================================
       SERVICE CARD 3D TILT
    ===================================================== */

    const cards =
        home.querySelectorAll(
            ".dm-main-service, .dm-support-card"
        );


    if (desktopPointer) {

        cards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX
                        - rect.left;

                    const y =
                        event.clientY
                        - rect.top;

                    const rotateY =
                        ((x - rect.width / 2)
                        / rect.width) * 5;

                    const rotateX =
                        ((y - rect.height / 2)
                        / rect.height) * -5;

                    card.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        `;

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
       PROCESS SCROLL PROGRESS
    ===================================================== */

    const processSection =
        home.querySelector(".dm-process");

    const progress =
        home.querySelector(
            ".process-progress span"
        );

    const processItems =
        home.querySelectorAll(
            ".dm-process-item"
        );


    if (
        processSection &&
        progress &&
        processItems.length
    ) {

        const updateProcess =
            () => {

                const rect =
                    processSection
                    .getBoundingClientRect();

                const viewport =
                    window.innerHeight;

                const total =
                    rect.height
                    - viewport;

                let percentage =
                    ((viewport - rect.top)
                    / (rect.height + viewport))
                    * 100;

                percentage =
                    Math.max(
                        0,
                        Math.min(
                            percentage,
                            100
                        )
                    );

                progress.style.height =
                    `${percentage}%`;


                processItems.forEach(
                    (item, index) => {

                        const itemRect =
                            item.getBoundingClientRect();

                        const middle =
                            itemRect.top
                            + itemRect.height / 2;

                        if (
                            middle <
                            viewport * .68
                        ) {

                            item.classList.add(
                                "process-active"
                            );

                        }

                    }
                );

            };


        window.addEventListener(
            "scroll",
            updateProcess,
            {
                passive: true
            }
        );

        updateProcess();

    }


    /* =====================================================
       TOOL FLOATING MOTION
    ===================================================== */

    const tools =
        home.querySelectorAll(
            ".dm-tool-cloud span"
        );

    tools.forEach(
        (tool, index) => {

            tool.style.animationDelay =
                `${index * -0.35}s`;

        }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const links =
        home.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !id ||
                    id === "#"
                ) return;

                const target =
                    document.querySelector(id);

                if (!target) return;

                event.preventDefault();

                const navbar =
                    document.querySelector(
                        ".navbar, .site-navbar, header"
                    );

                const offset =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect()
                    .top
                    + window.scrollY
                    - offset
                    - 15;

                window.scrollTo({

                    top:
                        position,

                    behavior:
                        "smooth"

                });

            }
        );

    });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    if (desktopPointer) {

        const buttons =
            home.querySelectorAll(
                ".dm-btn"
            );

        buttons.forEach((button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX
                        - rect.left
                        - rect.width / 2;

                    const y =
                        event.clientY
                        - rect.top
                        - rect.height / 2;

                    button.style.transform =
                        `
                        translate(
                            ${x * .08}px,
                            ${y * .08}px
                        )
                        `;

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

});h
//home end 


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