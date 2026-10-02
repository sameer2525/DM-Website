
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
   BLOG PAGE JAVASCRIPT
   - Filtering
   - Search
   - Fullscreen reader
   - Keyboard controls
   - Touch swipe
   - Share
   - Reading progress
   - GSAP animations
   - Safe fallback if GSAP unavailable
========================================================= */



(() => {
    "use strict";


    /* =======================================================
       DOM READY
    ======================================================= */

    const initBlog = () => {

        const body = document.body;

        const reader = document.getElementById("articleReader");
        const readerScroll = document.getElementById("readerScroll");

        const readerTitle = document.getElementById("readerTitle");
        const readerCategory = document.getElementById("readerCategory");
        const readerDate = document.getElementById("readerDate");
        const readerReadTime = document.getElementById("readerReadTime");

        const readerHeroImage =
            document.getElementById("readerHeroImage");

        const readerBody =
            document.getElementById("readerBody");

        const readerCounter =
            document.getElementById("readerCounter");

        const readerClose =
            document.getElementById("readerClose");

        const readerBack =
            document.getElementById("readerBack");

        const previousButton =
            document.getElementById("previousArticle");

        const nextButton =
            document.getElementById("nextArticle");

        const previousTitle =
            document.getElementById("previousTitle");

        const nextTitle =
            document.getElementById("nextTitle");

        const searchInput =
            document.getElementById("articleSearch");

        const noResults =
            document.getElementById("noResults");

        const pageProgress =
            document.querySelector("#pageProgress span");


        /* ===================================================
           ARTICLE CONFIG
        ==================================================== */

        const articleConfig = {

            "seo-ai-search": {
                title:
                    "How SEO Is Changing in the Age of AI Search",

                category:
                    "SEARCH & AI",

                date:
                    "29 September 2026",

                readTime:
                    "8 min read",

                hero:
                    "assets/blog/seo-ai-search/hero.webp",

                heroAlt:
                    "Abstract search interface representing SEO and AI search"

            },


            "paid-search": {
                title:
                    "Google Ads Strategy: Why Campaign Structure Still Matters",

                category:
                    "PERFORMANCE",

                date:
                    "29 September 2026",

                readTime:
                    "7 min read",

                hero:
                    "assets/blog/google-ads/hero.webp",

                heroAlt:
                    "Google Ads campaign strategy dashboard concept"

            },


            "social-strategy": {
                title:
                    "Why Social Media Strategy Is More Than Just Posting",

                category:
                    "SOCIAL MEDIA",

                date:
                    "29 September 2026",

                readTime:
                    "6 min read",

                hero:
                    "assets/blog/social-strategy/hero.webp",

                heroAlt:
                    "Social media content planning and strategy"

            },


            "technical-seo": {
                title:
                    "Technical SEO: The Foundations Behind Sustainable Organic Growth",

                category:
                    "SEO",

                date:
                    "29 September 2026",

                readTime:
                    "9 min read",

                hero:
                    "assets/blog/technical-seo/hero.webp",

                heroAlt:
                    "Technical SEO website architecture concept"

            },


            "landing-pages": {
                title:
                    "From Click to Conversion: Building Better Landing Pages",

                category:
                    "WEB & CRO",

                date:
                    "29 September 2026",

                readTime:
                    "7 min read",

                hero:
                    "assets/blog/landing-pages/hero.webp",

                heroAlt:
                    "Landing page conversion and user experience concept"

            },


            "content-social": {
                title:
                    "Creating Content That Works Across Search and Social",

                category:
                    "CONTENT",

                date:
                    "29 September 2026",

                readTime:
                    "7 min read",

                hero:
                    "assets/blog/content-social/hero.webp",

                heroAlt:
                    "Content strategy across search and social platforms"

            }

        };


        const articleOrder = [
            "seo-ai-search",
            "paid-search",
            "social-strategy",
            "technical-seo",
            "landing-pages",
            "content-social"
        ];


        /* ===================================================
           STATE
        ==================================================== */

        let currentArticleIndex = 0;
        let lastFocusedElement = null;

        let touchStartX = 0;
        let touchStartY = 0;

        let isReaderAnimating = false;


        /* ===================================================
           ARTICLE CARDS
        ==================================================== */

        const cards = [
            ...document.querySelectorAll(".article-trigger")
        ];


        /* ===================================================
           SOURCE ARTICLES
        ==================================================== */

        const sourceArticles = [
            ...document.querySelectorAll(".source-article")
        ];


        const getSourceArticle = (id) => {

            return sourceArticles.find(
                article => article.dataset.id === id
            );

        };


        /* ===================================================
           SAFE TEXT
        ==================================================== */

        const safeText = (value, fallback = "") => {

            if (
                typeof value !== "string" ||
                !value.trim()
            ) {
                return fallback;
            }

            return value;

        };


        /* ===================================================
           OPEN ARTICLE
        ==================================================== */

        const openArticle = (id, updateHash = true) => {

            const config = articleConfig[id];

            const source = getSourceArticle(id);

            if (!config || !source || !reader) {
                return;
            }

            const index = articleOrder.indexOf(id);

            if (index === -1) {
                return;
            }

            currentArticleIndex = index;

            lastFocusedElement =
                document.activeElement;


            /* -----------------------------------------------
               Populate reader
            ------------------------------------------------ */

            readerTitle.textContent =
                safeText(
                    config.title,
                    "Article"
                );

            readerCategory.textContent =
                safeText(
                    config.category,
                    "ARTICLE"
                );

            readerDate.textContent =
                safeText(
                    config.date,
                    ""
                );

            readerReadTime.textContent =
                safeText(
                    config.readTime,
                    ""
                );

            readerHeroImage.src =
                config.hero;

            readerHeroImage.alt =
                config.heroAlt ||
                config.title;

            /*
                Clone content rather than moving it.
                This means the source remains available.
            */

            readerBody.innerHTML = "";

            const clonedContent =
                source.cloneNode(true);

            /*
                Remove source article attributes
                from cloned content.
            */

            clonedContent.removeAttribute("data-id");
            clonedContent.classList.remove("source-article");

            readerBody.appendChild(
                clonedContent
            );


            /* -----------------------------------------------
               Counter
            ------------------------------------------------ */

            readerCounter.textContent =
                `${String(index + 1).padStart(2, "0")} / ${String(articleOrder.length).padStart(2, "0")}`;


            /* -----------------------------------------------
               Previous / Next
            ------------------------------------------------ */

            updateNavigation();


            /* -----------------------------------------------
               Reset scroll
            ------------------------------------------------ */

            readerScroll.scrollTop = 0;


            /* -----------------------------------------------
               Open UI
            ------------------------------------------------ */

            body.classList.add("reader-open");

            reader.setAttribute(
                "aria-hidden",
                "false"
            );

            reader.classList.add("is-open");


            /*
                URL hash provides a lightweight deep-link.
                Example:
                blog.html#article/seo-ai-search
            */

            if (updateHash) {

                try {

                    history.pushState(
                        {
                            article: id
                        },
                        "",
                        `#article/${id}`
                    );

                } catch (error) {

                    /* Ignore history errors */

                }

            }


            /*
                Focus close button after transition.
            */

            window.setTimeout(() => {

                if (
                    readerClose &&
                    typeof readerClose.focus === "function"
                ) {
                    readerClose.focus();
                }

            }, 350);

        };


        /* ===================================================
           CLOSE ARTICLE
        ==================================================== */

        const closeArticle = (
            updateHistory = true
        ) => {

            if (!reader) {
                return;
            }

            reader.classList.remove("is-open");

            reader.setAttribute(
                "aria-hidden",
                "true"
            );

            body.classList.remove(
                "reader-open"
            );


            if (updateHistory) {

                try {

                    if (
                        window.location.hash.startsWith(
                            "#article/"
                        )
                    ) {

                        history.pushState(
                            {},
                            "",
                            window.location.pathname +
                            window.location.search
                        );

                    }

                } catch (error) {

                    /* Ignore history errors */

                }

            }


            if (
                lastFocusedElement &&
                document.body.contains(
                    lastFocusedElement
                )
            ) {

                window.setTimeout(() => {

                    lastFocusedElement.focus();

                }, 250);

            }

        };


        /* ===================================================
           NAVIGATION
        ==================================================== */

        const updateNavigation = () => {

            const currentId =
                articleOrder[currentArticleIndex];

            const previousIndex =
                (
                    currentArticleIndex -
                    1 +
                    articleOrder.length
                ) %
                articleOrder.length;

            const nextIndex =
                (
                    currentArticleIndex +
                    1
                ) %
                articleOrder.length;


            const previousId =
                articleOrder[previousIndex];

            const nextId =
                articleOrder[nextIndex];


            previousTitle.textContent =
                articleConfig[previousId].title;

            nextTitle.textContent =
                articleConfig[nextId].title;


            /*
                If there is only one article,
                both buttons can still work safely.
            */

            previousButton.dataset.article =
                previousId;

            nextButton.dataset.article =
                nextId;

        };


        const goPrevious = () => {

            const previousIndex =
                (
                    currentArticleIndex -
                    1 +
                    articleOrder.length
                ) %
                articleOrder.length;

            const previousId =
                articleOrder[previousIndex];

            openArticle(
                previousId,
                true
            );

        };


        const goNext = () => {

            const nextIndex =
                (
                    currentArticleIndex +
                    1
                ) %
                articleOrder.length;

            const nextId =
                articleOrder[nextIndex];

            openArticle(
                nextId,
                true
            );

        };


        /* ===================================================
           CARD CLICK
        ==================================================== */

        cards.forEach(card => {

            card.addEventListener(
                "click",
                event => {

                    /*
                        Prevent opening if the click originated
                        from a future nested interactive element.
                    */

                    if (
                        event.target.closest(
                            "a, button, input"
                        )
                    ) {
                        return;
                    }

                    const id =
                        card.dataset.article;

                    openArticle(id);

                }
            );


            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openArticle(
                            card.dataset.article
                        );

                    }

                }
            );

        });


        /* ===================================================
           FEATURED CARD
        ==================================================== */

        const featuredCard =
            document.querySelector(
                ".featured-card"
            );


        if (featuredCard) {

            featuredCard.addEventListener(
                "click",
                () => {

                    openArticle(
                        featuredCard.dataset.article
                    );

                }
            );


            featuredCard.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openArticle(
                            featuredCard.dataset.article
                        );

                    }

                }
            );

        }


        /* ===================================================
           CLOSE BUTTONS
        ==================================================== */

        if (readerClose) {

            readerClose.addEventListener(
                "click",
                () => closeArticle()
            );

        }


        if (readerBack) {

            readerBack.addEventListener(
                "click",
                () => closeArticle()
            );

        }


        const readerBackdrop =
            document.querySelector(
                ".reader-backdrop"
            );


        if (readerBackdrop) {

            readerBackdrop.addEventListener(
                "click",
                () => closeArticle()
            );

        }


        /* ===================================================
           PREVIOUS / NEXT BUTTONS
        ==================================================== */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                goPrevious
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                goNext
            );

        }


        /* ===================================================
           KEYBOARD
        ==================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    !reader.classList.contains(
                        "is-open"
                    )
                ) {
                    return;
                }


                if (event.key === "Escape") {

                    event.preventDefault();

                    closeArticle();

                    return;

                }


                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    goPrevious();

                    return;

                }


                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    goNext();

                    return;

                }

            }
        );


        /* ===================================================
           TOUCH SWIPE
        ==================================================== */

        if (readerScroll) {

            readerScroll.addEventListener(
                "touchstart",
                event => {

                    if (
                        !event.touches ||
                        !event.touches.length
                    ) {
                        return;
                    }

                    touchStartX =
                        event.touches[0].clientX;

                    touchStartY =
                        event.touches[0].clientY;

                },
                {
                    passive: true
                }
            );


            readerScroll.addEventListener(
                "touchend",
                event => {

                    if (
                        !event.changedTouches ||
                        !event.changedTouches.length
                    ) {
                        return;
                    }

                    const endX =
                        event.changedTouches[0].clientX;

                    const endY =
                        event.changedTouches[0].clientY;

                    const diffX =
                        endX - touchStartX;

                    const diffY =
                        endY - touchStartY;


                    /*
                        Only treat a gesture as a swipe
                        if horizontal movement is clearly
                        greater than vertical movement.
                    */

                    if (
                        Math.abs(diffX) > 65 &&
                        Math.abs(diffX) >
                        Math.abs(diffY) * 1.35
                    ) {

                        if (diffX > 0) {

                            goPrevious();

                        } else {

                            goNext();

                        }

                    }

                },
                {
                    passive: true
                }
            );

        }


        /* ===================================================
           FILTERING
        ==================================================== */

        const filterButtons = [
            ...document.querySelectorAll(
                ".filter-button"
            )
        ];


        let activeFilter = "all";


        const normaliseText = value => {

            return String(value || "")
                .toLowerCase()
                .trim();

        };


        const applyFilters = () => {

            const query =
                normaliseText(
                    searchInput ?
                    searchInput.value :
                    ""
                );


            let visibleCount = 0;


            cards.forEach(card => {

                /*
                    Featured card is not part of grid,
                    so only grid cards are filtered.
                */

                if (
                    !card.classList.contains(
                        "blog-card"
                    )
                ) {
                    return;
                }


                const categories =
                    normaliseText(
                        card.dataset.category
                    );

                const title =
                    normaliseText(
                        card.dataset.title
                    );

                const cardText =
                    normaliseText(
                        card.textContent
                    );


                const filterMatches =
                    activeFilter === "all" ||
                    categories
                        .split(/\s+/)
                        .includes(
                            activeFilter
                        );


                const searchMatches =
                    !query ||
                    title.includes(query) ||
                    cardText.includes(query) ||
                    categories.includes(query);


                const shouldShow =
                    filterMatches &&
                    searchMatches;


                if (shouldShow) {

                    card.hidden = false;

                    card.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    visibleCount++;

                } else {

                    card.hidden = true;

                    card.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            });


            if (noResults) {

                noResults.hidden =
                    visibleCount !== 0;

            }


            animateFilteredCards();

        };


        filterButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        activeFilter =
                            button.dataset.filter ||
                            "all";


                        filterButtons.forEach(
                            item => {

                                const active =
                                    item === button;

                                item.classList.toggle(
                                    "active",
                                    active
                                );

                                item.setAttribute(
                                    "aria-selected",
                                    active ?
                                    "true" :
                                    "false"
                                );

                            }
                        );


                        applyFilters();

                    }
                );

            }
        );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                applyFilters
            );

        }


        /* ===================================================
           FILTER ANIMATION
        ==================================================== */

        const animateFilteredCards = () => {

            const visibleCards =
                cards.filter(
                    card =>
                        card.classList.contains(
                            "blog-card"
                        ) &&
                        !card.hidden
                );


            if (
                window.gsap &&
                !window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {

                window.gsap.fromTo(
                    visibleCards,
                    {
                        opacity: 0.35,
                        y: 14
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                        stagger: 0.035,
                        ease: "power2.out",
                        overwrite: true
                    }
                );

            }

        };


        /* ===================================================
           READING PROGRESS
        ==================================================== */

        const updateReaderProgress = () => {

            if (
                !readerScroll ||
                !pageProgress
            ) {
                return;
            }


            const scrollTop =
                readerScroll.scrollTop;

            const scrollHeight =
                readerScroll.scrollHeight -
                readerScroll.clientHeight;


            const progress =
                scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;


            pageProgress.style.width =
                `${Math.min(
                    100,
                    Math.max(
                        0,
                        progress
                    )
                )}%`;

        };


        if (readerScroll) {

            readerScroll.addEventListener(
                "scroll",
                updateReaderProgress,
                {
                    passive: true
                }
            );

        }


        /* ===================================================
           PAGE SCROLL PROGRESS
           When article reader is closed.
        ==================================================== */

        const updatePageProgress = () => {

            if (
                body.classList.contains(
                    "reader-open"
                )
            ) {
                return;
            }


            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;


            const progress =
                documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;


            if (pageProgress) {

                pageProgress.style.width =
                    `${Math.min(
                        100,
                        Math.max(
                            0,
                            progress
                        )
                    )}%`;

            }

        };


        window.addEventListener(
            "scroll",
            updatePageProgress,
            {
                passive: true
            }
        );


        /* ===================================================
           SHARE
        ==================================================== */

        const shareButtons = [
            ...document.querySelectorAll(
                ".share-button"
            )
        ];


        const getCurrentShareUrl = () => {

            return window.location.href;

        };


        const shareArticle = async type => {

            const config =
                articleConfig[
                    articleOrder[
                        currentArticleIndex
                    ]
                ];


            const url =
                getCurrentShareUrl();

            const text =
                config ?
                config.title :
                "Digital marketing article";


            if (type === "copy") {

                try {

                    await navigator.clipboard.writeText(
                        url
                    );

                    showShareFeedback(
                        "Link copied"
                    );

                } catch (error) {

                    /*
                        Clipboard API may fail on
                        insecure/local contexts.
                    */

                    fallbackCopy(url);

                }

                return;
            }


            if (type === "linkedin") {

                const linkedinUrl =
                    "https://www.linkedin.com/sharing/share-offsite/?" +
                    new URLSearchParams({
                        url
                    }).toString();


                window.open(
                    linkedinUrl,
                    "_blank",
                    "noopener,noreferrer,width=720,height=600"
                );

                return;
            }


            if (type === "twitter") {

                const twitterUrl =
                    "https://twitter.com/intent/tweet?" +
                    new URLSearchParams({
                        text,
                        url
                    }).toString();


                window.open(
                    twitterUrl,
                    "_blank",
                    "noopener,noreferrer,width=720,height=600"
                );

            }

        };


        const fallbackCopy = text => {

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value = text;

            textarea.style.position =
                "fixed";

            textarea.style.left =
                "-9999px";

            document.body.appendChild(
                textarea
            );

            textarea.select();

            try {

                document.execCommand(
                    "copy"
                );

                showShareFeedback(
                    "Link copied"
                );

            } catch (error) {

                showShareFeedback(
                    "Copy unavailable"
                );

            }

            textarea.remove();

        };


        const showShareFeedback = message => {

            const original =
                document.querySelector(
                    ".share-feedback"
                );


            if (original) {
                original.remove();
            }


            const feedback =
                document.createElement(
                    "span"
                );

            feedback.className =
                "share-feedback";

            feedback.textContent =
                message;


            feedback.style.position =
                "fixed";

            feedback.style.left =
                "50%";

            feedback.style.bottom =
                "30px";

            feedback.style.transform =
                "translateX(-50%)";

            feedback.style.zIndex =
                "11000";

            feedback.style.padding =
                "10px 16px";

            feedback.style.border =
                "1px solid rgba(255,255,255,.15)";

            feedback.style.borderRadius =
                "999px";

            feedback.style.background =
                "rgba(10,12,20,.9)";

            feedback.style.backdropFilter =
                "blur(15px)";

            feedback.style.color =
                "#fff";

            feedback.style.fontSize =
                "12px";

            document.body.appendChild(
                feedback
            );


            window.setTimeout(
                () => {

                    feedback.remove();

                },
                1800
            );

        };


        shareButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        shareArticle(
                            button.dataset.share
                        );

                    }
                );

            }
        );


        /* ===================================================
           HASH DEEP LINK
        ==================================================== */

        const openHashArticle = () => {

            const hash =
                window.location.hash;


            if (
                !hash.startsWith(
                    "#article/"
                )
            ) {
                return;
            }


            const id =
                hash.replace(
                    "#article/",
                    ""
                );


            if (
                articleConfig[id]
            ) {

                openArticle(
                    id,
                    false
                );

            }

        };


        window.addEventListener(
            "popstate",
            () => {

                if (
                    window.location.hash.startsWith(
                        "#article/"
                    )
                ) {

                    openHashArticle();

                } else {

                    closeArticle(false);

                }

            }
        );


        window.addEventListener(
            "hashchange",
            () => {

                if (
                    window.location.hash.startsWith(
                        "#article/"
                    )
                ) {

                    openHashArticle();

                } else {

                    closeArticle(false);

                }

            }
        );


        /* ===================================================
           GSAP
        ==================================================== */

        const initAnimations = () => {

            const reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            /*
                IMPORTANT:
                If reduced motion is enabled,
                we do absolutely nothing.
            */

            if (reducedMotion) {
                return;
            }


            /*
                If GSAP is unavailable,
                IntersectionObserver fallback
                handles the reveals.
            */

            if (
                !window.gsap ||
                !window.ScrollTrigger
            ) {

                initFallbackReveal();

                return;

            }


            try {

                window.gsap.registerPlugin(
                    window.ScrollTrigger
                );


                /* -------------------------------------------
                   HERO
                -------------------------------------------- */

                const heroItems =
                    document.querySelectorAll(
                        ".blog-hero .reveal-item"
                    );


                window.gsap.from(
                    heroItems,
                    {
                        opacity: 0,
                        y: 30,
                        duration: 0.9,
                        stagger: 0.09,
                        ease: "power3.out"
                    }
                );


                /* -------------------------------------------
                   STANDARD REVEALS
                -------------------------------------------- */

                const revealItems =
                    document.querySelectorAll(
                        ".reveal-item:not(.blog-hero .reveal-item)"
                    );


                revealItems.forEach(
                    element => {

                        window.gsap.from(
                            element,
                            {
                                scrollTrigger: {
                                    trigger: element,
                                    start: "top 88%",
                                    once: true
                                },

                                opacity: 0,
                                y: 35,

                                duration: 0.75,

                                ease: "power3.out"
                            }
                        );

                    }
                );


                /* -------------------------------------------
                   CARDS
                -------------------------------------------- */

                const cardItems =
                    document.querySelectorAll(
                        ".reveal-card"
                    );


                cardItems.forEach(
                    (card, index) => {

                        window.gsap.from(
                            card,
                            {
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 90%",
                                    once: true
                                },

                                opacity: 0,
                                y: 45,

                                duration: 0.75,

                                delay:
                                    (index % 2) *
                                    0.08,

                                ease: "power3.out"
                            }
                        );

                    }
                );


                /* -------------------------------------------
                   HERO PARALLAX
                -------------------------------------------- */

                const heroVisual =
                    document.querySelector(
                        ".hero-visual"
                    );


                if (heroVisual) {

                    window.gsap.to(
                        heroVisual,
                        {
                            y: -50,

                            scrollTrigger: {
                                trigger: ".blog-hero",
                                start: "top top",
                                end: "bottom top",
                                scrub: 1.2
                            },

                            ease: "none"
                        }
                    );

                }


                /* -------------------------------------------
                   FLOATING TOPICS
                -------------------------------------------- */

                const floatingTopics =
                    document.querySelectorAll(
                        ".floating-topic"
                    );


                floatingTopics.forEach(
                    (item, index) => {

                        window.gsap.to(
                            item,
                            {
                                y:
                                    index % 2 === 0
                                    ? -12
                                    : 12,

                                duration:
                                    2.8 +
                                    index * 0.25,

                                repeat: -1,

                                yoyo: true,

                                ease: "sine.inOut",

                                delay:
                                    index * 0.3
                            }
                        );

                    }
                );


                /* -------------------------------------------
                   ORBITS
                -------------------------------------------- */

                const orbitOne =
                    document.querySelector(
                        ".orbit-one"
                    );

                const orbitTwo =
                    document.querySelector(
                        ".orbit-two"
                    );

                const orbitThree =
                    document.querySelector(
                        ".orbit-three"
                    );


                if (orbitOne) {

                    window.gsap.to(
                        orbitOne,
                        {
                            rotation: 380,
                            duration: 25,
                            repeat: -1,
                            ease: "none"
                        }
                    );

                }


                if (orbitTwo) {

                    window.gsap.to(
                        orbitTwo,
                        {
                            rotation: -380,
                            duration: 32,
                            repeat: -1,
                            ease: "none"
                        }
                    );

                }


                if (orbitThree) {

                    window.gsap.to(
                        orbitThree,
                        {
                            rotation: 380,
                            duration: 38,
                            repeat: -1,
                            ease: "none"
                        }
                    );

                }


            } catch (error) {

                /*
                    Never allow animation errors to break
                    the actual blog functionality.
                */

                console.warn(
                    "GSAP animation fallback:",
                    error
                );

                initFallbackReveal();

            }

        };


        /* ===================================================
           INTERSECTION OBSERVER FALLBACK
        ==================================================== */

        const initFallbackReveal = () => {

            const items =
                document.querySelectorAll(
                    ".reveal-item, .reveal-card"
                );


            /*
                Old browsers / unavailable API:
                simply leave everything visible.
            */

            if (
                !("IntersectionObserver" in window)
            ) {
                return;
            }


            items.forEach(
                item => {

                    /*
                        We deliberately do NOT set opacity 0.
                        Instead, only add a subtle class when visible.
                    */

                    item.classList.add(
                        "fallback-reveal-ready"
                    );

                }
            );


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "fallback-revealed"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.08
                    }
                );


            items.forEach(
                item => observer.observe(item)
            );

        };


        /* ===================================================
           CARD HOVER TILT
           Desktop only.
        ==================================================== */

        const initCardTilt = () => {

            const isTouch =
                window.matchMedia(
                    "(hover: none)"
                ).matches;


            if (isTouch) {
                return;
            }


            const cardList =
                document.querySelectorAll(
                    ".blog-card"
                );


            cardList.forEach(
                card => {

                    let rafId = null;


                    card.addEventListener(
                        "pointermove",
                        event => {

                            if (
                                event.pointerType ===
                                "touch"
                            ) {
                                return;
                            }


                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;

                            const y =
                                event.clientY -
                                rect.top;


                            const rotateY =
                                (
                                    x /
                                    rect.width -
                                    0.5
                                ) * 3;


                            const rotateX =
                                -(
                                    y /
                                    rect.height -
                                    0.5
                                ) * 3;


                            if (rafId) {

                                cancelAnimationFrame(
                                    rafId
                                );

                            }


                            rafId =
                                requestAnimationFrame(
                                    () => {

                                        card.style.transform =
                                            `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                                    }
                                );

                        }
                    );


                    card.addEventListener(
                        "pointerleave",
                        () => {

                            if (rafId) {

                                cancelAnimationFrame(
                                    rafId
                                );

                            }


                            card.style.transform =
                                "";

                        }
                    );

                }
            );

        };


        /* ===================================================
           IMAGE ERROR HANDLING
        ==================================================== */

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            image => {

                image.addEventListener(
                    "error",
                    () => {

                        /*
                            Do not break the layout if an
                            image is temporarily missing.
                        */

                        image.classList.add(
                            "image-missing"
                        );

                    }
                );

            }
        );


        /* ===================================================
           ESCAPE BODY STATE ON PAGE LOAD
        ==================================================== */

        body.classList.remove(
            "reader-open"
        );


        /* ===================================================
           INITIALISE
        ==================================================== */

        initAnimations();

        initCardTilt();

        applyFilters();

        updatePageProgress();

        openHashArticle();

    };


    /* =======================================================
       DOM CONTENT LOADED
    ==================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initBlog
        );

    } else {

        initBlog();

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