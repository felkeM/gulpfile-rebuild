(function ($) {

// --------------------------------------------------
// PANEL MOBILE NAV
// --------------------------------------------------
$.fn.mobilePanelNav = function () {
      // disable linking for menu items with dropdowns, 'back' and parent
    $('header .menu li:has(ul) > a, .mobile-nav-back').click(function(e){
      e.preventDefault();
    });  
    $('.main-nav > .content li:has(ul) a').each(function(){
        var $this = $(this);
        var $parentNavItem = $(this).parent('li');
        var $childNavItem = $(this).siblings('ul');
        var $back = $('.mobile-nav-back');        
        // CLICKING A NAV ITEM        
        $(this).click(function(){
          // clone <a> tag create new li in child drop down, prepend to it
          $childNavItem.prepend("<li class='dropdown-heading'></li>")
          $this.clone().prependTo(".dropdown-heading");
          // slide all other levels out of the way
          $parentNavItem.addClass('selected-nav-item').siblings().addClass('slide-left');
          $(this).addClass('slide-left');
          $parentNavItem.siblings().children("ul").addClass("stay-right");
          $('.left-nav').addClass('slide-left')
          // toggle class that slides panel in
          $childNavItem.addClass('sub-panel-active');
      }); // --- clicking a nav item
      // ADD 'back' TO ALL SUBLEVELS
      $childNavItem.once(function(){
        $(this).append('<li class="mobile-nav-back"><a href"#">Back</a></li>');
      });
      // CLICKING BACK
      $back.click(function(){
          // remove parent nav item and insert as heading to lower level
          $(this).siblings('.dropdown-heading').remove();
          $(this).parent().removeClass('sub-panel-active');
          $(this).parent().siblings().removeClass('slide-left').parent().removeClass('selected-nav-item').siblings().removeClass('slide-left');
          $("ul").removeClass("stay-right");
      }); // --- clicking back
      // CLICKING LAST BACK ITEM NEEDS TO SHOW SUPERHEADER LINKS
      $('.main-nav > .content > .menu > li > ul > .mobile-nav-back').click(function() {
        $('.left-nav').removeClass('slide-left');
      });      
  });// each function 
};

}(jQuery));