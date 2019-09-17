
// --------------------------------------------------
// APP.JS
// --------------------------------------------------

(function($) {
  Drupal.behaviors.gmuAppBehavior = {
    attach: function(context, settings) {
    /*
      ----------------------
     HERO
      ----------------------
    */
      $(".hero-text:has(.cycle-slide)").css("padding", "0");

    /*
      ----------------------
     VIDEO FULL WIDTH
      ----------------------
    */
	  // $(".full-width").fitVids();

    /*
      ----------------------
     HOMEPAGE
      ----------------------
    */
      $(".homepage-footer-img").prependTo(".super-footer");

    /*

    /*
      ----------------------
     COUNTDOWN
      ----------------------


    $('#node-9081 .content').prepend('<div class="clock-align"><div class="clock"></div></div>');

    // Clock Var
    var clock;

    // Grab the current date
    var currentDate = new Date();

    // Set some date in the future. In this case, it's always Jan 1
    var futureDate  = new Date("05/13/2017");

    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    clock = $('.clock').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true,
      callbacks: {
        stop: function() {
          $('.clock-align').css('display', 'none');
        }
      }
    });

	*/

    /*
    -----------------------
    LANDING PAGE BUTTON ACTIVE STATES
    -----------------------
    */
      $(".interest-panel .cta-button-container a").click(function(){
        $(this).parents(".interest-panel").find(".landing-btn-active").removeClass("landing-btn-active");
        $(this).toggleClass('landing-btn-active');
      })


    /*
      ----------------------
      PROGRAMS TOOLTIP
      ----------------------
    */


      $('.degree-cell .views-field-view-node').once('gmu', function() {
        $(this).hover(function(){
          $(this).parents(".degree-cell").find(".views-field-title").toggle();
        });
      })

      // HERE WE POSITION THE DESCRIPTION ABOVE THE VARYING HEIGHT OF ITS DEGREE ABBREV
      $(".degree-cell .views-field-title").each(function(){

        // Get the height value of what we want the description to appear above
        var degreeWidth = $(this).siblings(".views-field-view-node").width();
        // we use the negative value in our css call from the top
        $(this).css({'left':degreeWidth + 20 + 'px' })
      });


    /*
      ----------------------
      MORE ON
      ----------------------
    */
    $('.more-on-select').click(function() {
      $(this).toggleClass("more-on-select-active");
      $(this).siblings('ul').slideToggle();
    });


    /*
      ----------------------
      Tuition fees
      ----------------------
    */
    $(".tuition-type-group-link").click(function(){
      $(this).toggleClass("active");
    });

    if($(".fees-dropdown-content:has('.fees-break-down')").addClass("header-alone"));

    /*
      ----------------------
      WRAPPER
      ----------------------
    */

   var $infoForToggle = $('.right-nav h2.block-title');
   var $infoForToggleMenu = $('.right-nav .menu');

    $('.super-header > div').append('<div class="menu-toggle"></div>');

    $('.menu-toggle').click(function(){
      $(this).toggleClass('menu-toggle-active');
      $('.main-nav').toggleClass('main-nav-active');
      // -- this is non-recurring
      $('.right-nav .menu').slideUp();
      $infoForToggle.removeClass('info-for-active');
    });


    // append a toggle for search
    $("header .block-search-form", context).prepend("<div class='search-toggle'></div>");

    $(".search-toggle").click(function(){
      $(this).parents('header').find("form").toggleClass("search-active");
      $(this).toggleClass("search-toggle-active");
    });

    // Slide info for menu up if anything else is clicked
    $(document).click(function(e) {
    var target = e.target;

      if (!$(target).is($infoForToggle) && !$(target).parents().is('.right-nav')) {
          $infoForToggleMenu.slideUp();
          $infoForToggle.removeClass('info-for-active');
      }
    });

    /*
      ----------------------
      RESPONSIVE
      ----------------------
    */
      enquire

      .register("screen and (min-width:1025px)", function() {

        //WRAPPER
        $('.static-header .left-nav').insertAfter('.static-header .right-nav');
//         $('#block-boxes-gmu-footer-contact').insertBefore('.main-footer-right');
        $('.main-nav').removeClass('main-nav-active');
        $('.menu-toggle').removeClass('menu-toggle-active');
        $('.static-header .search-toggle').insertBefore('.static-header .block-search-form form');

        //we unbind click first to add some additional actions
        $infoForToggle.unbind("click");
        $infoForToggle.click(function(){
          $(this).siblings('.menu-block-wrapper').children(".menu").slideToggle();
          $(this).toggleClass('info-for-active');
        });
        //  --- unbinding mobilePanelNav to window
        $(window).unbind('mobilePanelNav');

        // recurring js
      })

      .register("screen and (max-width:1024px)", function() {

        //WRAPPER
        $('.static-header .left-nav').appendTo('.static-header .main-nav');

        $('.static-header .search-toggle').insertBefore('.static-header .block-search-form');

        //we unbind click first to add some additional actions
        $infoForToggle.unbind("click");
        $infoForToggle.click(function(){
          $(this).siblings('.menu-block-wrapper').children(".menu").slideToggle();
          $(this).toggleClass('info-for-active');
          $('.main-nav').removeClass('main-nav-active');
          $('.menu-toggle').removeClass('menu-toggle-active')
        });
        //  --- binding mobilePanelNav to window
        $(window).mobilePanelNav();


        // recurring js


        // --- wrapper
      })


      .register("screen and (min-width:642px)", function() {
        $('#block-boxes-gmu-footer-contact').insertBefore('.main-footer-right');

        // HOMEPAGE
        $(".home-top-panel .panel-messaging-container").insertAfter(".home-top-panel .field-type-image");
        $(".home-middle-panel .panel-messaging-container").insertAfter(".home-middle-panel .field-type-image");
      })

      .register("screen and (max-width:641px)", function() {
        $('#block-boxes-gmu-footer-contact').insertAfter('.main-footer-right');

        // HOMEPAGE
        $(".home-top-panel .panel-messaging-container").insertBefore(".home-top-panel .field-type-image");
        $(".home-middle-panel .panel-messaging-container").insertBefore(".home-middle-panel .field-type-image");
      })

			.register("screen and (max-width:641px)", function() {
				$('#programs-table tbody td:first-child').unbind().click(function(){
					$(this).siblings().slideToggle();
					$(this).toggleClass('collapsed');
					$(this).parent('tr').toggleClass('collapsed');
				});

			});


}
};
})(jQuery);
