(function($) {

  Drupal.behaviors.gmuBehavior = {
    attach: function(context, settings) {

      /*** Global ***/

      $('#back-to-top-link').once('gmu', function() {
        $(this).on('click', function(e) {
          e.preventDefault();
          scrollToAnchor('#page-wrapper');
        });
      });

      function scrollToAnchor(aid) {
        var anchorTag = $(aid);
        $('html,body').animate({scrollTop: anchorTag.offset().top},'slow');
      }

      /*** Landing Page ***/

      // Text Scroller
      $('.scrolling-text').once('gmu', function() {
        $(this).cycle({
          slides: '.field-item',
          speed: 1200,
        });
      });

      /*** Schools Page ***/

      // Tabs
      $('.school-tabs').once('gmu', function() {
        $(this).tabs({
          collapsible: true,
          active: false
        });
      });

/*
      $(".school-tab").click(function(){
        $(".tab-container").fadeToggle(200);
      });
*/

      /*** Programs Table ***/

      $('.view-degrees')
        .off('click.expand')
        .on('click.expand', ".program-expander", function (e) {
          var id = $(this).attr('data-program');
          $('.program-details-' + id).toggle();
          $('.fa', this).toggleClass('fa-plus-square').toggleClass('fa-minus-square');
      });

      $('.filtering-header')
          .off('click.filters')
          .on('click.filters', function(e){
            $('.views-exposed-form').slideToggle();
            $(this).toggleClass('expanded');
      });

      var programListingExposedForm = $('#views-exposed-form-degrees-degree-listing-block');
      if(programListingExposedForm.length) {
        // Set aoi
        var aoi = $(programListingExposedForm).find('#edit-aoi').val();
        $(programListingExposedForm).find('input[name=gmu-aoi][value='+aoi+']').attr('checked', 'checked');

        // Set campus
        var campus = $(programListingExposedForm).find('#edit-campus').val();
        $(programListingExposedForm).find('input[name=gmu-campus][value='+campus+']').attr('checked', 'checked');

        // Set degrees
        var degree = $(programListingExposedForm).find('#edit-degree-level').val();
        $(programListingExposedForm).find('input[name=gmu-degree][value='+degree+']').attr('checked', 'checked');

        // Set offerings
        var offering = $(programListingExposedForm).find('#edit-offering').val();
        $(programListingExposedForm).find('input[name=gmu-offering][value='+offering+']').attr('checked', 'checked');


        // Clear all filters
        $(programListingExposedForm).find('.clear-all-filters-link').once('gmu', function() {
          $(this).on('click', function(e) {
            e.preventDefault();
            $(this).parents('form').find('#edit-aoi').val('All');
            $(this).parents('form').find('#edit-degree-level').val('All');
            $(this).parents('form').find('#edit-offering').val('All');
            $(this).parents('form').find('#edit-campus').val('All').change();
          });
        });

        $(programListingExposedForm).find('input[name=gmu-aoi]').once('gmu', function() {
          $(this).on('change', function(e) {
            var aoi = $(this).val();
            $(this).parents('form').find('#edit-aoi').val(aoi);
          });
        });

        $(programListingExposedForm).find('#edit-aoi').once('gmu', function() {
          $(this).on('change', function(e) {
            var aoi = $(this).val();
            $(this).parents('form').find('input[name=gmu-aoi][value='+aoi+']').attr('checked', 'checked');
          });
        });

        $(programListingExposedForm).find('input[name=gmu-campus]').once('gmu', function() {
          $(this).on('change', function(e) {
            var campus = $(this).val();
            $(this).parents('form').find('#edit-campus').val(campus);
          });
        });

        $(programListingExposedForm).find('#edit-campus').once('gmu', function() {
          $(this).on('change', function(e) {
            var campus = $(this).val();
            $(this).parents('form').find('input[name=gmu-campus][value='+campus+']').attr('checked', 'checked');
          });
        });

        $(programListingExposedForm).find('input[name=gmu-degree]').once('gmu', function() {
          $(this).on('change', function(e) {
            var degree = $(this).val();
            $(this).parents('form').find('#edit-degree-level').val(degree);
          });
        });

        $(programListingExposedForm).find('#edit-degree-level').once('gmu', function() {
          $(this).on('change', function(e) {
            var degree = $(this).val();
            $(this).parents('form').find('input[name=gmu-degree][value='+degree+']').attr('checked', 'checked');
          });
        });

        $(programListingExposedForm).find('input[name=gmu-offering]').once('gmu', function() {
          $(this).on('change', function(e) {
            var offering = $(this).val();
            $(this).parents('form').find('#edit-offering').val(offering);
          });
        });

        $(programListingExposedForm).find('#edit-offering').once('gmu', function() {
          $(this).on('change', function(e) {
            var offering = $(this).val();
            $(this).parents('form').find('input[name=gmu-offering][value='+offering+']').attr('checked', 'checked');
          });
        });
      }

      /*** Directory ***/

      var directoryExposedForm = $('#views-exposed-form-contact-information-listing-block-contact-information-listing-block');
      if(directoryExposedForm.length) {
        directoryExposedForm.find('#edit-contact-type-wrapper input[type=radio]').once('gmu', function() {
          $(this).on('change', function(e) {
            var contactType = $(this).val();
            if(contactType == '30') {
              // Faculty
              $(this).parents('form').find('#edit-office-wrapper select').val('All');
              $(this).parents('form').find('#edit-office-wrapper').hide();
              $(this).parents('form').find('#edit-school-wrapper').show();
            }
            else if(contactType == '29'){
              // Staff
              $(this).parents('form').find('#edit-school-wrapper select').val('All');
              $(this).parents('form').find('#edit-school-wrapper').hide();
              $(this).parents('form').find('#edit-office-wrapper').show();
            }
            else {
              // All
              $(this).parents('form').find('#edit-school-wrapper select').val('All');
              $(this).parents('form').find('#edit-school-wrapper').hide();
              $(this).parents('form').find('#edit-office-wrapper select').val('All');
              $(this).parents('form').find('#edit-office-wrapper').hide();
            }
          });
        });

        // Initialize
        directoryExposedForm.find('#edit-contact-type-wrapper input[type=radio]:checked').change();
      }

      /***
      var directoryExposedForm = $('#views-exposed-form-contact-information-listing-block-contact-information-listing-block');
      if(directoryExposedForm.length) {
        directoryExposedForm.find('#edit-contact-type-wrapper input[type=radio]').once('gmu', function() {
          $(this).on('change', function(e) {
            var contactType = $(this).val();
            if(contactType == '30') {
              // Faculty
              $(this).parents('form').find('#edit-office-wrapper select').val('All');
              $(this).parents('form').find('#edit-office-wrapper').hide();
              $(this).parents('form').find('#edit-school-wrapper').show();
            }
            else if(contactType == '29'){
              // Staff
              $(this).parents('form').find('#edit-school-wrapper select').val('All');
              $(this).parents('form').find('#edit-school-wrapper').hide();
              $(this).parents('form').find('#edit-office-wrapper').show();
            }
            else {
              // All
              $(this).parents('form').find('#edit-school-wrapper select').val('All');
              $(this).parents('form').find('#edit-office-wrapper select').val('All');
              $(this).parents('form').find('#edit-school-wrapper').hide();
              $(this).parents('form').find('#edit-office-wrapper').hide();
            }
          });
        });

        // Initialize
        directoryExposedForm.find('#edit-contact-type-wrapper input[type=radio]:checked').change();
      }
      ***/

      /*** Tour Gallery ***/

      var tourGalleries = $('.entity-tour-gallery');
      tourGalleries.each(function() {

      var fullGallery = $(this).find('.slick-gallery .field-items');
      var thumbGallery = $(this).find('.slick-pager .field-items');

      $("iframe").click(function(event){
          event.preventDefault();
      });

      if(tourGalleries.length) {
          $(this).find('.slick-gallery').once('gmu', function() {
            $(this).find('.field-items').slick({
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              asNavFor: thumbGallery,
              arrows: false,
            });
          });

          $(this).find('.slick-pager .field-items').once('gmu', function() {

            $(this).slick({
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
              asNavFor: fullGallery,
              focusOnSelect: true,
              centerMode: true,
            });
          });
        }
      });
    }
  };

})(jQuery);

/* Content Hub JS code - Built by Next Left*/

function scrollsidebar(){
    var lastScrollTop = 0;
    jQuery(window).scroll(function(){
        var wscroll = jQuery(window).scrollTop();
        var wswidth = jQuery(window).width();
        if(wswidth > 1024){
            if(wscroll > 1100 && wscroll < 2600){
                jQuery('.col-xs.sidebar').addClass('sticky-nav');

                st = jQuery(this).scrollTop();
                if(st < lastScrollTop) {
                    jQuery('.col-xs.sidebar').addClass('sticky-top');

                }
                else {
                    jQuery('.col-xs.sidebar').removeClass('sticky-top');
                }
                lastScrollTop = st;
                if(wscroll > 2300){
                    var h_sticky = jQuery('.dynamic-header--active').length;
                    if(h_sticky){
                        jQuery('.view-career-resources').addClass('mg-bt-140');
                        jQuery('.sticky-nav.sidebar').addClass('sticky-bt');
                    }else{
                        jQuery('.sticky-nav.sidebar').removeClass('sticky-bt');
                    }
                }
            }else{
                jQuery('.sticky-nav.sidebar').removeClass('sticky-bt');
                jQuery('.col-xs.sidebar').removeClass('sticky-nav');
                jQuery('.view-career-resources').removeClass('mg-bt-140');
            }
        }else if(wswidth > 992 && wswidth < 1025){
            if(wscroll > 1100 && wscroll < 2800){
                jQuery('.col-xs.sidebar').addClass('sticky-nav');

                st = jQuery(this).scrollTop();
                if(st < lastScrollTop) {
                    jQuery('.col-xs.sidebar').addClass('sticky-top');

                }
                else {
                    jQuery('.col-xs.sidebar').removeClass('sticky-top');
                }
                lastScrollTop = st;
                if(wscroll > 2200){
                    var h_sticky = jQuery('.dynamic-header--active').length;
                    if(h_sticky){
                        jQuery('.view-career-resources').addClass('mg-bt-140');
                        jQuery('.sticky-nav.sidebar').addClass('sticky-bt');
                    }else{
                        jQuery('.sticky-nav.sidebar').removeClass('sticky-bt');
                    }
                }
            }else{
                jQuery('.sticky-nav.sidebar').removeClass('sticky-bt');
                jQuery('.col-xs.sidebar').removeClass('sticky-nav');
                jQuery('.view-career-resources').removeClass('mg-bt-140');
            }
        }else if(wswidth > 767 && wswidth < 992){
            if(wscroll > 1570 && wscroll < 4150){
                jQuery('.col-xs.sidebar').addClass('sticky-nav');
                console.log(wscroll);
                st = jQuery(this).scrollTop();
                if(st < lastScrollTop) {
                    jQuery('.col-xs.sidebar').addClass('sticky-top');

                }
                else {
                    jQuery('.col-xs.sidebar').removeClass('sticky-top');
                }
                lastScrollTop = st;
                if(wscroll > 2200){
                    var h_sticky = jQuery('.dynamic-header--active').length;
                    if(h_sticky){
                        jQuery('.view-career-resources').addClass('mg-bt-140');
                        jQuery('.sticky-nav.sidebar').addClass('sticky-bt');
                    }else{
                        jQuery('.sticky-nav.sidebar').removeClass('sticky-bt');
                    }
                }
            }else{
                jQuery('.sticky-nav.sidebar').removeClass('sticky-bt');
                jQuery('.col-xs.sidebar').removeClass('sticky-nav');
                jQuery('.view-career-resources').removeClass('mg-bt-140');
            }
        }

    })
}
var width;
jQuery(document).ready(function(){
    jQuery('.view-category-filter .form-item-field-subject-tid select > option:first-child').text('All');
    jQuery('.row.fe-content.add-grey').wrapAll('<div class="bg-grey"></div>');
    jQuery('.row.fe-content > div:first-child').addClass('pd-lr-15');
    var des = jQuery('.vocabulary-new-category .taxonomy-term-description p').text();
    var body = jQuery('.vocabulary-new-category .field-name-field-body p').text();
    // var title = jQuery('.section-new-category #page-title').text();
    var title = jQuery('.section-academics #page-title').text();
    if(jQuery('.vocabulary-new-category .field-name-field-body').length){
        jQuery('.top-ct .h-descrition').append(body);
    }else{
        jQuery('.top-ct .h-descrition').append(des);
    }
    jQuery('.top-ct .title').append(title);

    var width = jQuery(window).width();
    if(width > 767){
        scrollsidebar();
    };
    jQuery('ul.lr-lest.border a').click(function() {
        setTimeout(function(){
            jQuery('header').addClass('dynamic-header--active');
        }, 700);
    });
    jQuery('ul.lr-lest.border a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var space_top = jQuery('#space-top').val();
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - 120
                }, 500);
                return false;
            }
        }
    });

    jQuery('.lr-lest.border > li > a').click(function()
    {
        jQuery(this).parent().siblings().removeClass('current');
        jQuery(this).parent().addClass('current');
        jQuery(this).parent().prev().siblings().removeClass('open-click');
        jQuery(this).parent().prev().addClass('open-click');
    }).mouseover(function()
    {
        jQuery(this).parent().prev().addClass('open');
    }).mouseleave(function(){
        jQuery(this).parent().siblings().removeClass('open');
    });

});

jQuery(window).resize(function(){
    var width = jQuery(window).width();
    if(width > 767){
        scrollsidebar();
    }
})
