(function() {

  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
      document.body.addEventListener('gesturestart', function () {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
      }, false);
    }
  }
  
  var scrollBookmark;
  var $view = $(window);
  var closePortfolio;
  var openPortfolio;
  var processHeight = 0;
  
  var gracefulEntrance = function() {
  
    $('#portfolio-window').addClass('active');
  
    window.setTimeout(
      function() {
        $('body').css({
          'overflow' : 'hidden'
        });
      }, 850 
    );
    
    window.setTimeout(
      function() {
        $('#portfolio-content').animate({
          opacity: 1
        }, 1000);
      }, 1000
    );
  };
  
  var regularEntrance = function() {
    $('#portfolio-window').css('visibility', 'visible').animate({
      left: '0%'
    }, 1000, function() {
      $('body').css({
        'overflow' : 'hidden'
      });
      $('#portfolio-content').animate({
        opacity: 1
      }, 1000);
    });
  };
  
  var gracefulExit = function() {
    $('#portfolio-window').removeClass('active');
    
    window.setTimeout(
      function() {
        $('body').css({
          'overflow' : 'auto'
        });
      }, 1100
    );
    
    $('#portfolio-content').animate({
      opacity: 0
    }, 1000);
  };
  
  var regularExit = function() {
  
    $('body').css({
      'overflow' : 'auto'
    });
    $('#portfolio-content').animate({
      opacity: 0
    }, 1000);
    $('#portfolio-window').animate({
      left: '100%'
    }, 1000, function() {
      $(this).css('visibility', 'hidden');  
    });
    
  };
  
  var closePortfolioWindow = function() {
    $view.focus();
    closePortfolio();
    $('body').scrollTo(scrollBookmark);
  };
  
  var navSensor = function() {
  
    var processOffset = $('#process').offset().top - $('#process').outerHeight() * 0.3;
    var portfolioOffset = $('#portfolio').offset().top - $('#portfolio').outerHeight() * 0.3;
    var aboutOffset = $('#team').offset().top - $('#team').outerHeight() * 0.3;
    var contactOffset = $('#contact').offset().top - $('#contact').outerHeight() * 0.3;
    var viewScrollTop = $view.scrollTop();
  
    if (viewScrollTop > $('#section-nav').offset().top ) {
      $('#section-nav').addClass('fixed');
    }
    else if (viewScrollTop < $('#process').offset().top ) {
      $('#section-nav').removeClass('fixed');
    }
  
    if (viewScrollTop <= processOffset) {
      $('#section-nav a').removeClass('active');
      $('#link-start').addClass('active');
    }
    else if (viewScrollTop <= portfolioOffset) {
      $('#section-nav a').removeClass('active');
      $('#link-process').addClass('active');
    }
    else if (viewScrollTop <= aboutOffset) {
      $('#section-nav a').removeClass('active');
      $('#link-portfolio').addClass('active');
    }
    else if (viewScrollTop <= contactOffset) {
      $('#section-nav a').removeClass('active');
      $('#link-company').addClass('active');
    }
    else {
      $('#section-nav a').removeClass('active');
      $('#link-contact').addClass('active');
    }
    
    if (viewScrollTop > ( $('#projects').offset().top - $view.height() + 200) ) {
      $('.project').addClass('slideIn');
    }
  
  };
  
  $(function() {
  
    var $view = $(window);
    var windowHeight = $view.height();

    if ($('html').hasClass('csstransitions')) {
      openPortfolio = gracefulEntrance;
      closePortfolio = gracefulExit;
    }
    else {
      openPortfolio = regularEntrance;
      closePortfolio = regularExit;
    }

    window.setTimeout(
      function() {
        $('#universe').show();
      }, 8000 
    );
  
    if (!Modernizr.input.placeholder) {
      $('.form-field label').inFieldLabels().addClass('enhanced');
    }
  
    $('#request-form').formSentinel();
  
    $(document).keyup(function(e) {
      if ($('#portfolio-window').hasClass('active') && e.keyCode === 27) { 
        closePortfolioWindow();
      }
    });
  
    $('a[href^="mailto:"]').each(function() {
        var self = $(this);
        var obscuredEmail = this.href.replace(/mailto:/g, '');
        var unobscuredEmail = obscuredEmail.replace(/\/at\//g, '@');
        self.attr('href', 'mailto:' + unobscuredEmail).text(self.text().replace(obscuredEmail, unobscuredEmail));
    });
    
    $('#nav-trigger').click(function() {
      $('#section-nav').toggleClass('opened');
    });
  
    if (matchMedia('only screen and (min-width: 1200px)').matches) {
  
      if ($('html').hasClass('multiplebgs')) {
        $view.bind('scroll', function() {
          navSensor();
        });
        $view.bind('resize', function() {
          navSensor();
          processHeight = $('#process').outerHeight();
          $('.bg-image').css('height', processHeight + 'px');
        });
      }
      else {
        $view.bind('scroll resize', function() {
          navSensor();
        });
      }
    }
    else {
      $view.bind('scroll', function() {
        navSensor();
      });
      $view.bind('resize', function() {
        navSensor();
        processHeight = $('#process').outerHeight();
        $('.bg-image').css('height', processHeight + 'px');
      });
    }
  
    $('#section-nav a').click(function() {
      $('html, body').animate({scrollTop: $(this.hash).offset().top}, 800);
      return false;
    });
  
    // Portfolio
    
    var myScroll = false;
  
    $('#request-trigger').click(function() {
      $(this).hide();
      $('#request-form').show();
    });
    
    $('.step').click(function() {
      var index = $(this).data('phase');
      $('#process-steps').flexslider(index);
      return false;
    });
  
  });
  
  $(window).load(function() {
  
    $('body').removeClass('loading');
    $('#universe').show();
  
    var aboutTouch = null;
    var myScroll = null;
    
  
    if (matchMedia('only screen and (min-width: 320px) and (max-width: 480px)').matches) {
      aboutTouch = true;
    }
    
    $('.project').click(function() {
    
      $view.focus();
    
      $('#portfolio-showcase').flexslider($(this).index());
      
      scrollBookmark = $view.scrollTop();
      
      openPortfolio();
      
      if (matchMedia('only screen and (max-device-width: 1024px)').matches) {
        myScroll = new iScroll('portfolio-window', { useTransition: true, bounce: true, momentum: true });
      }
      
      $('#portfolio-window').animate({scrollTop: 0}, 800);
      
      return false;
    });
    $('.close-window').click(function() {
      closePortfolioWindow();
      if (myScroll) {
        myScroll.destroy(); 
      }
    });
  
    $('#view-work').click(function() {
      $('#process-steps').flexslider(0);
      $('html, body').animate({scrollTop: $(this.hash).offset().top}, 800, function() {
        $('#buffer').show().hide();
      });
      return false;
    });
  
    $('#process-steps').flexslider({
      animation: 'slide',
      controlNav: false,
      directionNav: false,
      keyboard: false,
      slideshow: false,
      start: function () {
        $('.gen-next, .trig-next').click(function() {
          $('#process-steps').flexslider('next');
          return false;
        });
        $('.trig-prev').click(function() {
          $('#process-steps').flexslider('prev');
          return false;
        });
      },
      touch: false
    });
    $('#team-members').flexslider({
      animation: 'slide',
      controlNav: false,
      directionNav: false,
      keyboard: false,
      slideshow: false,
      start: function (slider) {
        $('#team-members .flex-next').click(function() {
          $('.team-nav li').removeClass('active');
          $('#team-members').flexslider('next');
          $('.team-nav li').eq(slider.animatingTo).addClass('active');
          return false;
        });
        $('#team-members .flex-prev').click(function() {
          $('.team-nav li').removeClass('active');
          $('#team-members').flexslider('prev');
          $('.team-nav li').eq(slider.animatingTo).addClass('active');
          return false;
        });
        $('.team-nav li').eq(slider.currentSlide).addClass('active');
      },
      touch: false
    });
    $('.member-node').click(function() {
      var self = $(this);
      var index = self.parent().index();
      $('.member-node').parent().removeClass('active');
      $('#team-members').flexslider(index);
      self.parent().addClass('active');
      return false;
    });
    $('.service-node').click(function() {
      var self = $(this);
      var index = $(this).parent().index();
      $('.service-node').parent().removeClass('active');
      $('#services').flexslider(index);
      self.parent().addClass('active');
      return false;
    });
    $('#services').flexslider({
      animation: 'slide',
      controlNav: false,
      directionNav: false,
      keyboard: false,
      slideshow: false,
      start: function (slider) {
        $('#services .flex-next').click(function() {
          $('.services-nav li').removeClass('active');
          $('#services').flexslider('next');
          $('.services-nav li').eq(slider.animatingTo).addClass('active');
          return false;
        });
        $('#services .flex-prev').click(function() {
          $('.services-nav li').removeClass('active');
          $('#services').flexslider('prev');
          $('.services-nav li').eq(slider.animatingTo).addClass('active');
          return false;
        });
        $('.services-nav li').eq(slider.currentSlide).addClass('active');
      },
      touch: false
    });
    $('#about-slider').flexslider({
      animation: 'fade',
      controlNav: false,
      directionNav: false,
      keyboard: false,
      manualControls: '',
      selector: '.outer-slides > li',
      slideshow: false,
      start: function (slider) {
        var companySlider = slider;
        $view.focus();  // Initiate on correct slide
        $('.about-node').click(function() {
          if (companySlider.animating) {
            return false;
          }
          else {
            $('.about-node').removeClass('active');
            $(this).addClass('active');
            $('.pane').css('width', $('body').width());
            var index = $(this).data('slide');
            $('#about-slider').flexslider(index);
            $view.focus(); // Fixes first-time transition wonkiness
            return false; 
          }
        });
      },
      touch: false
    });
    $('#portfolio-showcase').flexslider({
      after: function(slider) {
      
        if (myScroll) {
          myScroll.refresh();
        }
        
      },
      animation: 'fade',
      before: function(slider) {  
        
        if (myScroll) {
          myScroll.refresh();
        }
        
        var pgrp = new Riloadr({
          name: 'pgrp' + slider.animatingTo,
          defer: 'load',
          oncomplete: function() {
            if (myScroll) {
              myScroll.refresh();
            }
          },
          retries: 1,
          breakpoints: [
            {name: 'whatever',  minWidth: 1}
          ]
        });
      },
      controlNav: false,
      directionNav: false,
      keyboard: false,
      slideshow: false,
      start: function() {
        processHeight = $('#process').outerHeight();
        $('.bg-image').css('height', processHeight + 'px');
        
        var pgrp = new Riloadr({
          name: 'pgrp0',
          defer: 'load',
          retries: 1,
          breakpoints: [
            {name: 'whatever',  minWidth: 1}
          ]
        });
        $('.next-piece').click(function() {
          if (myScroll) {
            myScroll.scrollTo(0, 0, 200);
            window.setTimeout(
              function() {
                $('#portfolio-showcase').flexslider('next');
              }, 200
            );
          }
          else {
            $('#portfolio-window').animate({scrollTop: 0}, 800, function() {
              $('#portfolio-showcase').flexslider('next');
            });
          }
          return false;
        });
        $('.prev-piece').click(function() {
          if (myScroll) {
            myScroll.scrollTo(0, 0, 200);
            window.setTimeout(
              function() {
                $('#portfolio-showcase').flexslider('prev');
              }, 200
            );
          }
          else {
            $('#portfolio-window').animate({scrollTop: 0}, 800, function() {
              $('#portfolio-showcase').flexslider('prev');
            });
          }
          return false;
        });
      },
      touch: false
    });
    
  });
}());