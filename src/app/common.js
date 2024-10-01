$(document).ready(function () {
  $("#footer").load("/footer.html");

  function setPropertyVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setPropertyVh();

  const resizingEvent = () => {
    $("#body").addClass("not");
  };

  const afterResizingEvent = () => {
    $("#body").removeClass("not");
  };

  let doit;
  window.addEventListener("resize", () => {
    clearTimeout(doit);
    doit = setTimeout(afterResizingEvent, 100);
  });

  $(window).resize(function () {
    setPropertyVh();
    resizingEvent();
  });

  var $header = $("#header");
  $header.load("/header.html", function () {
    var flag = true;
    function menuEventForPC() {
      $("html").removeClass("open-menu");
      $("#header").removeClass("on active mo");
      $(".logo").removeAttr("style");
      $(".lang").removeAttr("style");
      $(".gnb").removeAttr("style");
      $(".sns").removeAttr("style");
      flag = true;
    }

    function menuEventForMobile() {
      $("#header").addClass("mo");
    }

    function clickMenuBtn() {
      $("#menu-btn").click(function () {
        if (!flag && $("#header").hasClass("on")) {
          $("#header").removeClass("on");
          $("#header .logo").fadeIn(300);
          $(".lang").fadeOut(200);
          $(".gnb").fadeOut(200);
          $(".sns").fadeOut(200);
          setTimeout(function () {
            $("#header").removeClass("active");
            $("html").removeClass("open-menu");
            flag = true;
          }, 300);
        }

        if (flag && !$("#header").hasClass("on")) {
          $("html").addClass("open-menu");
          $("#header").addClass("on active");
          $("#header .logo").fadeOut(200);
          $(".lang").fadeIn(300);
          $(".gnb").fadeIn(300);
          $(".sns").fadeIn(300);
          flag = false;
        }
      });
    }
    clickMenuBtn();

    var isTrue = true;
    function animateHeader() {
      if (window.innerWidth > 767 && isTrue) {
        isTrue = false;
        menuEventForPC();
      }
      if (window.innerWidth <= 767 && !isTrue) {
        isTrue = true;
        menuEventForMobile();
      }
    }

    if (window.innerWidth > 767) {
      menuEventForPC();
    } else {
      menuEventForMobile();
    }

    $(window).resize(function () {
      scrollAnimation();
      animateHeader();
    });
  });

  function scrollAnimation() {
    $(".ani").each(function () {
      var aniPoint = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height() * 0.95;

      if (windowBottom > aniPoint) {
        if (!$(this).hasClass("active")) {
          $(this).addClass("active");
        }
      }
    });
  }
  scrollAnimation();

  function numberCounter(target_frame, target_number) {
    this.count = 0;
    this.diff = 0;
    this.target_count = parseInt(target_number);
    this.target_frame = $(target_frame);
    this.timer = null;
    this.counter();
  }
  numberCounter.prototype.counter = function () {
    var self = this;
    var speed = this.target_count > 10 ? 30 : 100;
    this.diff = this.target_count - this.count;

    if (this.diff > 0) {
      self.count += this.target_count > 10 ? Math.ceil(this.diff / 5) : 1;
    }

    this.target_frame.text(this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    if (this.count < this.target_count) {
      this.timer = setTimeout(function () {
        self.counter();
      }, speed);
    } else {
      clearTimeout(this.timer);
    }
  };

  function counter() {
    $(".count-lists .num").each(function () {
      if ($(this).hasClass("active") && !$(this).hasClass("on")) {
        $(this).addClass("on");
        new numberCounter(".count-lists .count1", 7239758);
        new numberCounter(".count-lists .count2", 121);
        new numberCounter(".count-lists .count3", 34);
        new numberCounter(".count-lists .count4", 917348);
      }
    });
  }
  counter();

  $(window).scroll(function () {
    scrollAnimation();
    counter();
  });

  $(".swiper").each(function (index) {
    var $this = $(this);
    var i = index + 1;

    $this.addClass("step" + i);
    $this
      .parents(".slide")
      .find(".arrow")
      .addClass("step" + i);

    var swipers = new Swiper(`.swiper.step${i}`, {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 500,
      loop: true,
      breakpoints: {
        768: {
          speed: 1000,
        },
      },
    });
  });

  var profileSwiper = new Swiper(`.profile-swiper`, {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    paginationClickable: true,
    speed: 500,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
    },
  });

  $(".profile-swiper").on("mouseenter", function (e) {
    profileSwiper.autoplay.stop();
  });
  $(".profile-swiper").on("mouseleave", function (e) {
    profileSwiper.autoplay.start();
  });

  var index;

  $(".profile-swiper .link").click(function () {
    var popupName = $(this).attr("data-set");

    $(".layer-popup").addClass("on");
    $(`.${popupName}`).addClass("on");
    index = $(`.${popupName}`).index();
  });

  $(".layer-popup .close-btn").click(function (e) {
    $(".layer-popup").removeClass("on").find("li").removeClass("on");
  });

  $(".left-arrow").click(function (e) {
    if (index > 0) {
      index -= 1;
      $(".layer-popup > ul > li").removeClass("on").eq(index).addClass("on");
    }
  });

  $(".right-arrow").click(function (e) {
    if (index < $(".layer-popup > ul > li").length - 1) {
      index += 1;
      $(".layer-popup > ul > li").removeClass("on").eq(index).addClass("on");
    }
  });

  var businessSwiper = new Swiper(`.business-swiper`, {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var newsSwiper = new Swiper(`.news-swiper`, {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    speed: 500,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var socialImpactSwiper = new Swiper(`.social-impact-swiper`, {
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    paginationClickable: true,
    speed: 500,
    loop: true,
    breakpoints: {
      768: {
        speed: 1000,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        var text;
        if (index == 0) {
          text = "Environment";
        }
        if (index == 1) {
          text = "Social";
        }
        if (index == 2) {
          text = "Governance";
        }

        return '<span class="' + className + '">' + text + "</span>";
      },
    },
  });

  $("#moreBtn").click(function () {
    $(".mc-lists ul").addClass("on");
    $(this).hide();
  });
});