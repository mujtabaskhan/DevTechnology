gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

$(function () {
  'use strict';

  var wind = $(window);

  $.scrollIt({
    upKey: 38,
    downKey: 40,
    easing: 'linear',
    scrollTime: 600,
    activeClass: 'active',
    onPageChange: null,
    topOffset: -75,
  });

  wind.on('scroll', function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $('.navbar');

    if (bodyScroll > 200) {
      navbar.addClass('nav-scroll');
    } else {
      navbar.removeClass('nav-scroll');
    }
  });

  $(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollTrigger.normalizeScroll(false);

    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });

    let headings = gsap.utils.toArray('.js-title').reverse();
    headings.forEach((heading, i) => {
      let headingIndex = i + 1;
      let mySplitText = new SplitText(heading, { type: 'chars' });
      let chars = mySplitText.chars;

      chars.forEach((char, i) => {
        smoother.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
      });
    });

    let splitTextLines = gsap.utils.toArray('.js-splittext-lines');

    splitTextLines.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: 1,
          markers: false,
          toggleActions: 'play reverse play reverse',
        },
      });

      const itemSplitted = new SplitText(splitTextLine, { type: 'lines' });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: 'lines' });
      tl.from(itemSplitted.lines, {
        duration: 1,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: 'top center -50',
        stagger: 0.1,
      });
    });
  });

  $('.accordion').on('click', '.title', function () {
    $(this).next().slideDown();

    $('.accordion-info').not($(this).next()).slideUp();
  });

  $('.accordion').on('click', '.item', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });

  wind.on('scroll', function () {
    $('.skill-progress .progres').each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr('data-value');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });
});

(function () {
  const link = document.querySelectorAll('.hover-this');
  const cursor = document.querySelector('.cursor');
  const animateit = function (e) {
    const hoverAnim = this.querySelector('.hover-anim');
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;
    hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === 'mouseleave') hoverAnim.style.transform = '';
  };
  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  };
  link.forEach((b) => b.addEventListener('mousemove', animateit));
  link.forEach((b) => b.addEventListener('mouseleave', animateit));
  window.addEventListener('mousemove', editCursor);

  $('a, .cursor-pointer').hover(
    function () {
      $('.cursor').addClass('cursor-active');
    },
    function () {
      $('.cursor').removeClass('cursor-active');
    },
  );
})();

$(window).on('load', function () {
  $(document).ready(function () {
    var $gallery = $('.gallery').isotope({
      itemSelector: '.items',
    });

    $('.filtering').on('click', 'span', function () {
      var filterValue = $(this).attr('data-filter');
      $gallery.isotope({ filter: filterValue });

      $gallery.isotope('arrange');

      $('html, body').animate(
        {
          scrollTop: $gallery.offset().top,
        },
        500,
      );

      $(this).addClass('active').siblings().removeClass('active');
    });

    var defaultFilter = '.marketing';
    $gallery.isotope({ filter: defaultFilter });
    $('.filtering span[data-filter="' + defaultFilter + '"]').addClass(
      'active',
    );
  });

  $('#contact-form').validator();

  $('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
      var url = 'contact.php';

      $.ajax({
        type: 'POST',
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          var messageAlert = 'alert-' + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            '</div>';
          if (messageAlert && messageText) {
            $('#contact-form').find('.messages').html(alertBox);
            $('#contact-form')[0].reset();
          }
        },
      });
      return false;
    }
  });
});

$(document).ready(function () {
  'use strict';

  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    jQuery('html, body').animate({ scrollTop: 0 }, duration);
    return false;
  });
});

$(document).ready(function () {
  $('.scroll-btn').on('click', function () {
    const target = $(this).data('target');
    gsap.to(window, { duration: 1, scrollTo: target });
  });
});

wow = new WOW({
  animateClass: 'animated',
  offset: 100,
});
wow.init();

$(function () {
  $('[data-carousel="swiper"]').each(function () {
    var container = $(this).find('[data-swiper="container"]').attr('id');
    var pagination = $(this).find('[data-swiper="pagination"]').attr('id');
    var items = $(this).data('items');
    var autoplay = $(this).data('autoplay');
    var iSlide = $(this).data('initial');
    var loop = $(this).data('loop');
    var parallax = $(this).data('parallax');
    var space = $(this).data('space');
    var speed = $(this).data('swiper-speed');
    var center = $(this).data('center');
    var effect = $(this).data('effect');
    var direction = $(this).data('direction');
    var mousewheel = $(this).data('mousewheel');

    var slidesCount = $(this).find('.swiper-slide').length;

    var conf = {
      breakpoints: {
        0: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      },
      pagination: {
        el: '.testimonials .swiper-pagination',
        clickable: true,
      },
    };

    if (slidesCount === 1) {
      conf.centeredSlides = true;
    } else {
      if (items) conf.slidesPerView = items;
      if (autoplay) conf.autoplay = autoplay;
      if (iSlide) conf.initialSlide = iSlide;
      if (loop) conf.loop = loop;
      if (parallax) conf.parallax = parallax;
      if (space) conf.spaceBetween = space;
      if (speed) conf.speed = speed;
      if (mousewheel) conf.mousewheel = mousewheel;
      if (effect) conf.effect = effect;
      if (direction) conf.direction = direction;
    }

    if (pagination) {
      (conf.pagination = '#' + pagination), (conf.paginationClickable = true);
    }

    if (container) {
      var initID = '#' + container;
      var init = new Swiper(initID, conf);
    }
  });

  const svg = document.getElementById('svg');
  const tl = gsap.timeline();
  const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
  const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

  tl.to('.loader-wrap-heading .load-text , .loader-wrap-heading .cont', {
    delay: 1.5,
    y: -100,
    opacity: 0,
  });
  tl.to(svg, {
    duration: 0.5,
    attr: { d: curve },
    ease: 'power2.easeIn',
  }).to(svg, {
    duration: 0.5,
    attr: { d: flat },
    ease: 'power2.easeOut',
  });
  tl.to('.loader-wrap', {
    y: -1500,
  });
  tl.to('.loader-wrap', {
    zIndex: -1,
    display: 'none',
  });
  tl.from(
    'main',
    {
      y: 100,
      opacity: 0,
      delay: 0.3,
    },
    '-=1.5',
  );
});
