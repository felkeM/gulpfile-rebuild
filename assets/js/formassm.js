(function($) {

  Drupal.behaviors.formassmBehavior = {
    attach: function(context, settings) {

    // Undergraduate Form

    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
          return null;
        } else {
          return results[1] || 0;
        }
    }
    var salesParam = $.urlParam('LeadApplyId');
    var uriForm;

    if (salesParam == null){
      uriForm = "https://www.tfaforms.com/389557";
    }
    else{
      uriForm = "https://www.tfaforms.com/389557?LeadApplyId=" + salesParam + "";
    }

    var gradContain = $("#und-form");
    gradContain.append("<iframe class='under-form'></iframe>");

    /*
    var gradStyles = {
      display: "block",
      height: "265vh",
      width: "55vw",
      border: "none",
      margin: "0",
      padding: "0"
    };
    */
    var gradAttr = {
      src: uriForm,
      frameborder: "0",
      scrolling: "0",
      height: "2800",
      width: "100%"
    };

    var gradClass = $(".under-form");
    // gradClass.attr(gradAttr).css(gradStyles);
    gradClass.attr(gradAttr);

		}
	};

})(jQuery);
