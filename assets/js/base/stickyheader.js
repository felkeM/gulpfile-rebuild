// --------------------------------------------------
// STICKY HEADER
// --------------------------------------------------

(function( $ ) {

  $.fn.stickyHeader = function (action, options) {
    var $header = $(this);
    var defaults = {
      onStick : function() { },
      onUnstick : function() { }
    }
    
    var settings = $.extend( true, {}, defaults, options );
    
    if(!$('#navbar-administration').length) {
      
      /* ------------------------------------------------
      Clone Header and assign Unique Classes  
      ------------------------------------------------ */ 
      // panels ipe initial ajax request passes in the whole #document and so context work
      // as the header is still cloned again. In this situation .once is being implemented.
      $header.once(function() {
        $dynamicHeader = $header.clone().addClass('dynamic-header').attr('aria-hidden', 'true');
        
        // By default we see the full version of the header, binding data to identify
        $dynamicHeader.data('size','big');
        
        //Adding to the page
        $dynamicHeader.prependTo('.page')
        
        //Since we stored the exact header we cloned from already 
        //we know which one to add the static-header class to
        $header.addClass('static-header');
      });
      
      
      /* ------------------------------------------------
         Header Dissapear  
         ------------------------------------------------ */ 
        var lastScrollTop = 0,
            $stickyHeader = $('header.dynamic-header'),
            $staticHeader = $('header.static-header');

        // --------------------CORE FUNCTION
        var headerDisappear = function() { 
         var st = $(window).scrollTop();
         
         
         if(!$staticHeader.is(":in-viewport")) {
           // Are we scrolling upwards?
           // ----------------
           // If the scollTop in this run through is a lower number than the last
           // we have scrolled upwards. Activate the sticky header. We check to see
           // if the last scroll top was greater than 0 because of Mac scroll bouncing.
           if (lastScrollTop >= 0 && st < lastScrollTop) {
             // 1. Show the header as it may have been hidden if the static header was in the viewport.
             // 2. Add a class that will make the sticky header visible.
             $stickyHeader.addClass('dynamic-header--active');
             
             $('.is-sticky').addClass('sticky-repo');
             if(!$('.sticky-wrapper').hasClass('is-sticky')){
               $('.sticky-wrapper').removeClass('sticky-repo')
             }
           }
           //Scrolling downward
           else {
             $stickyHeader.removeClass('dynamic-header--active');
             
             $('.is-sticky').removeClass('sticky-repo');

             if(!$('.sticky-wrapper').hasClass('is-sticky')) {
               $('.sticky-wrapper').removeClass('sticky-repo')
             }
           }
         }
         else {
           // Hide the sticky header immediately if we can see the original header
           // in the viewport to avoid visual confusion.
           $stickyHeader.removeClass('dynamic-header--active');
         }

           //Save the very last scroll top position
           lastScrollTop = st;
        }
      
      //Bind the header conditional appearance to the window scroll
      $(window).bind("scroll", headerDisappear);
    }
    
    
  };
  
  $.fn.stickyHeader.stick = function() {
    if(!$('#navbar-administration').length) {
      // BROAD ESSENTIALS
      $('.dynamic-header').data('size','small');
      
      // NEW CLASS ASSIGNMENT

      // DOM MANIPULATOIN
    
    }
  }
  
  $.fn.stickyHeader.unStick = function() {
    if(!$('#navbar-administration').length) {
      // BROAD ESSENTIALS
      $('.dynamic-header').data('size','big');
      $('.dynamic-header .super-header').slideDown();
    
      // NEW CLASS ASSIGNMENT
            
      // DOM MANIPULATOIN
    }
  }
  
  //Activate any alterations requested for the mini version and revert them when back to full
  $.fn.stickyHeader.initTailor = function() {
    if (jQuery(document).scrollTop() > 0) {
      if (jQuery('.dynamic-header').data('size') == 'big') {
        jQuery('.dynamic-header').stickyHeader.stick();
      }
    }
    else {
      if (jQuery('.dynamic-header').data('size') == 'small') {
        jQuery(window).stickyHeader.unStick();
      }
    }
  }
  
  //Bind the tailor function to the scroll
  $(window).bind("scroll", $.fn.stickyHeader.initTailor);

}( jQuery ));


// For Drupal Use
(function ($) {
  Drupal.behaviors.holycrossSickyHeader = {
    attach: function(context, settings) {
      $('header').stickyHeader();
    }
  };
})(jQuery);

/*
(function( $ ) {

  // for flat use only
  $(document).ready(function(){ 
    $('header').stickyHeader();
  })(jQuery);

}( jQuery ));
*/