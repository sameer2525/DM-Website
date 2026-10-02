
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
   CONTACT PAGE JS
   Form validation + interactions + reveal animations
========================================================= */



document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const newMessageButton = document.getElementById("newMessage");

    const submitButton = document.getElementById("submitButton");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");
    const consentInput = document.getElementById("consent");

    const charCount = document.getElementById("charCount");


    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       CHARACTER COUNTER
    ====================================================== */

    if (messageInput && charCount) {

        const updateCharacterCount = () => {

            const currentLength = messageInput.value.length;

            charCount.textContent = `${currentLength} / 800`;

        };

        messageInput.addEventListener(
            "input",
            updateCharacterCount
        );

        updateCharacterCount();

    }


    /* =====================================================
       VALIDATION HELPERS
    ====================================================== */

    const clearFieldError = (input, errorId) => {

        if (!input) {
            return;
        }

        input.classList.remove("input-error");

        const errorElement = document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = "";
        }

    };


    const showFieldError = (
        input,
        errorId,
        message
    ) => {

        if (input) {
            input.classList.add("input-error");
        }

        const errorElement = document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = message;
        }

    };


    /* =====================================================
       EMAIL VALIDATION
    ====================================================== */

    const isValidEmail = (email) => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    };


    /* =====================================================
       LIVE VALIDATION
    ====================================================== */

    if (nameInput) {

        nameInput.addEventListener("input", () => {

            if (nameInput.value.trim().length >= 2) {

                clearFieldError(
                    nameInput,
                    "nameError"
                );

            }

        });

    }


    if (emailInput) {

        emailInput.addEventListener("input", () => {

            if (isValidEmail(emailInput.value.trim())) {

                clearFieldError(
                    emailInput,
                    "emailError"
                );

            }

        });

    }


    if (serviceInput) {

        serviceInput.addEventListener("change", () => {

            if (serviceInput.value) {

                clearFieldError(
                    serviceInput,
                    "serviceError"
                );

            }

        });

    }


    if (messageInput) {

        messageInput.addEventListener("input", () => {

            if (messageInput.value.trim().length >= 15) {

                clearFieldError(
                    messageInput,
                    "messageError"
                );

            }

        });

    }


    if (consentInput) {

        consentInput.addEventListener("change", () => {

            const errorElement =
                document.getElementById("consentError");

            if (consentInput.checked && errorElement) {
                errorElement.textContent = "";
            }

        });

    }


    /* =====================================================
       FORM VALIDATION
    ====================================================== */

    const validateForm = () => {

        let isValid = true;


        /* Name */

        const name = nameInput.value.trim();

        if (!name) {

            showFieldError(
                nameInput,
                "nameError",
                "Please enter your name."
            );

            isValid = false;

        } else if (name.length < 2) {

            showFieldError(
                nameInput,
                "nameError",
                "Please enter at least 2 characters."
            );

            isValid = false;

        } else {

            clearFieldError(
                nameInput,
                "nameError"
            );

        }


        /* Email */

        const email = emailInput.value.trim();

        if (!email) {

            showFieldError(
                emailInput,
                "emailError",
                "Please enter your email address."
            );

            isValid = false;

        } else if (!isValidEmail(email)) {

            showFieldError(
                emailInput,
                "emailError",
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearFieldError(
                emailInput,
                "emailError"
            );

        }


        /* Service */

        if (!serviceInput.value) {

            showFieldError(
                serviceInput,
                "serviceError",
                "Please select a service."
            );

            isValid = false;

        } else {

            clearFieldError(
                serviceInput,
                "serviceError"
            );

        }


        /* Message */

        const message = messageInput.value.trim();

        if (!message) {

            showFieldError(
                messageInput,
                "messageError",
                "Please tell me a little about your project."
            );

            isValid = false;

        } else if (message.length < 15) {

            showFieldError(
                messageInput,
                "messageError",
                "Please provide a little more detail."
            );

            isValid = false;

        } else {

            clearFieldError(
                messageInput,
                "messageError"
            );

        }


        /* Consent */

        if (!consentInput.checked) {

            const consentError =
                document.getElementById("consentError");

            if (consentError) {
                consentError.textContent =
                    "Please confirm before sending.";
            }

            isValid = false;

        } else {

            const consentError =
                document.getElementById("consentError");

            if (consentError) {
                consentError.textContent = "";
            }

        }


        return isValid;

    };


    /* =====================================================
       FORM SUBMISSION
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                /* Validate */

                const valid = validateForm();

                if (!valid) {

                    const firstError =
                        contactForm.querySelector(".input-error");

                    if (firstError) {

                        firstError.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        setTimeout(() => {
                            firstError.focus();
                        }, 450);

                    }

                    return;

                }


                /* Loading state */

                submitButton.classList.add("loading");


                /*
                    IMPORTANT:

                    This demo currently simulates a successful
                    submission.

                    Connect this form to your preferred backend,
                    Formspree, Web3Forms, EmailJS, PHP endpoint,
                    or another form service when you're ready.
                */

                await new Promise((resolve) => {
                    setTimeout(resolve, 1200);
                });


                /* Remove loading */

                submitButton.classList.remove("loading");


                /* Hide form */

                contactForm.style.display = "none";


                /* Show success */

                formSuccess.classList.add("active");


                /* Scroll */

                formSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }


    /* =====================================================
       SEND ANOTHER MESSAGE
    ====================================================== */

    if (newMessageButton) {

        newMessageButton.addEventListener(
            "click",
            () => {

                formSuccess.classList.remove("active");

                contactForm.reset();

                contactForm.style.display = "";

                if (charCount) {
                    charCount.textContent = "0 / 800";
                }

                document
                    .querySelectorAll(".field-error")
                    .forEach((error) => {
                        error.textContent = "";
                    });

                document
                    .querySelectorAll(".input-error")
                    .forEach((input) => {
                        input.classList.remove("input-error");
                    });

                contactForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =====================================================
       INPUT FOCUS MICRO INTERACTION
    ====================================================== */

    const formInputs = document.querySelectorAll(
        ".input-wrap input, .input-wrap select, .textarea-wrap textarea"
    );

    formInputs.forEach((input) => {

        input.addEventListener("focus", () => {

            const parent = input.closest(
                ".input-wrap, .textarea-wrap"
            );

            if (parent) {
                parent.classList.add("focused");
            }

        });

        input.addEventListener("blur", () => {

            const parent = input.closest(
                ".input-wrap, .textarea-wrap"
            );

            if (parent) {
                parent.classList.remove("focused");
            }

        });

    });


    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                formSuccess &&
                formSuccess.classList.contains("active")
            ) {

                formSuccess.classList.remove("active");

                contactForm.reset();

                contactForm.style.display = "";

            }

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