jQuery(function($) {

    let menuJs = {
        containerParent: ".ducati-header-main",
        containerParentMobile: ".menu-all-categories",
        containerSelector: ".shortcutnavopen",
        containerSelectorClass: "shortcutnavopen",
        openClass: "open",
        openMobileClass: "open-mobile-menu",
        bodyBlockedClass: "blocked",
        status: null,
        containerMenu: ".menu-scroll",
        filtersScroll: null,
        init: function () {
            this.ClickOutside();
            return this;
        },
        OpenDxMenu: function (link) {
            let a,
                s = $(this.containerParent),
                i = (a = $(link)).attr("data-menu");
            if (s.hasClass(this.containerSelectorClass) && $(link).hasClass(this.openClass)) {
                this.CloseMenu();
            } else {
                this.status = "open";
                if (s.hasClass(this.containerSelectorClass)) {
                    this.CloseMenu();
                    s.addClass(this.containerSelectorClass);
                    $("a.open").removeClass(this.openClass);
                    $(i).addClass(this.openClass).slideDown();
                    a.addClass(this.openClass), $("body").addClass(this.bodyBlockedClass);
                    this.status = "open";
                } else {
                    s.addClass(this.containerSelectorClass);
                    var t = document.scrollingElement ? document.scrollingElement.scrollTop : document.scrollTop;
                    $("body").addClass(this.bodyBlockedClass).css("top", -t);
                    a.addClass(this.openClass);
                    $(i).addClass(this.openClass).slideDown();
                }
            }
        },
        OpenMobileMenu: function (link) {
            let a,
                s = $(this.containerParentMobile),
                i = (a = $(link)).attr("data-menu");
            s.addClass(this.openMobileClass);
            a.addClass(this.openMobileClass);
            $(i).addClass(this.openMobileClass);
            a.closest("div.col-1").addClass(this.openMobileClass);
        },
        CloseMenu: function () {
            let e = $(this.containerParent);
            $(".shortcutnavopen .level-two.dx-wrapper").removeClass(this.openClass);
            $(".shortcutnavopen .skip-links .link a").removeClass(this.openClass);
            $("a.open").removeClass(this.openClass);
            e.removeClass(this.containerSelectorClass);
            let i = $("body"),
                t;
            if (i.hasClass(this.bodyBlockedClass) && (i.removeClass(this.bodyBlockedClass), (t = -1 * parseInt(i.css("top"))), jQuery(window).scrollTop(t))) {
                $(".level-two").each(function () {
                    $(this).slideUp();
                });
            }
            this.status = "closed";
            console.log(this.status);
        },
        CloseMobileMenu: function () {
            let e = $(this.containerParentMobile);
            $("a.open").removeClass(this.openMobileClass);
            $("div.col-1").removeClass(this.openMobileClass);
            e.removeClass(this.openMobileClass);
        },
        ClickOutside: function () {
            const $menu = $(".menu-box");
            $(document).mouseup((e) => {
                if (!$menu.is(e.target) && $menu.has(e.target).length === 0 && this.status === "open") {
                    this.CloseMenu();
                }
            });
        },
    };
    $(document).on("click", "*[data-menu^=#]", function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
            event.preventDefault();
            menuJs.OpenDxMenu(this);
        } else {
            if ($(this).hasClass("hamburger") || $(this).hasClass("search-menu") || $(this).hasClass("showcart")) {
                event.preventDefault();
                menuJs.OpenDxMenu(this);
            } else {
                if ($(this).parents().hasClass("title-category")) {
                    event.preventDefault();
                    menuJs.OpenMobileMenu(this);
                }
            }
        }
        if (window.matchMedia("(max-width: 1140px)").matches) {
            if ($(this).hasClass("hamburger")) {
                $(".ducati-header-main").toggleClass("show-login");
            }
        }
    });
    $(document).on("click", ".menu-level2 > a", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            event.preventDefault();
            menuJs.CloseMobileMenu();
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 5) {
            $(menuJs.containerParent).addClass("small-header");
        } else {
            if (!$("body").hasClass(menuJs.bodyBlockedClass)) {
                $(menuJs.containerParent).removeClass("small-header");
            }
        }
    });
    $(window).load(function () {
        var t = document.scrollingElement ? document.scrollingElement.scrollTop : document.scrollTop;
        if (t > 5) {
            $(menuJs.containerParent).addClass("small-header");
        }
    });
    return menuJs.init();
});
