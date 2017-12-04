(function($){
  jQuery.fn.cyberpopup = function(options){
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    options = $.extend({

      position : 'fixed',
      ajax: false,
      closebg: true,
      animateShow: 'rollIn',
      animateHide: 'rollOut'

    }, options);

    var make = function(){
      function hide(){
        // #window, .popup-item
        if ($('.popup-item.visible').hasClass('animated ' + options.animateShow) === false){
          $('#hide-sec').removeClass('opacity')
          $('#window .popup-item.visible').addClass('animated ' + options.animateHide).one(animationEnd, function() {
            $(this).removeClass('visible animated ' + options.animateHide);
            // visible
            $('#hide-sec').removeClass('visible')
            // $(this).removeClass().addClass('popup-item');
            $('#window,  #window-cover').removeClass('visible').attr('style','');
            $('#window input').val('')     
            $('html, body').removeClass('overflow') 

          });
        }
      }
      
      function popup_resize() {
          var height = $('#window').height();
          var width = $('#window').width();
          var WinHeight =  $(window).scrollTop() + $(window).height()/2;
          var WinWidth =  $(window).width();

          $('#window').css({
              
              "top": (WinHeight-height/2)+"px",
              "left": (WinWidth-width)/2-2+"px"

          })    

      }


  


      $(this).append('<div id="hide-sec"></div>')
      if (options.position == 'cover'){
        $(this).append('<div id="window-cover"><div id="window"></div></div>')
      }else{
        $(this).append('<div id="window"></div>')
      }

      $('#window').addClass(options.position)
      if (options.ajax == false){
      
        $(this).find('.popup-item').each(function(indx, element){
          $(this).appendTo("#window")
        });
      }

      // Show popup

      $(document).on('click','.popup--show', function(e){
        e.preventDefault()

        var elem = $(this).data('popup-id')

        $('.popup-item').removeClass('visible animated ' + options.animateHide)
        $('#hide-sec, #window, #' +elem).addClass('visible')
        $('#hide-sec').addClass('opacity')
        $('#window .popup-item.visible').addClass('animated ' + options.animateShow).one(animationEnd, function() {
          $(this).removeClass('animated ' + options.animateShow);
        });   
        if ($(this).data('type') == 'form'){

          var title = $(this).data('title'),
          input = $(this).data('input'),
          form = $(this).data('form'),
          button = $(this).data('button')
          $('#'+elem + ' .subform p:first-of-type').html(title)
          $('#'+elem + ' .subform input[name=formname]').val(input)
          $('#'+elem + ' .subform input[name=form]').val(form)
          $('#'+elem + ' .subform button span').text(button)          
        }
        if(options.position == 'absolute'){
          popup_resize()   
          $(window).resize(function(){
            popup_resize() 
          });      
        }
        if(options.position == 'cover'){
          $('#window-cover').addClass('visible')
          $('html, body').addClass('overflow')        
        }

       

      })
      if (options.closebg == true){
          $('#hide-sec').addClass('close')
      }
      $(document).on('click','.close', function(){
        hide()
      })
    };

    return this.each(make); 

  };
})(jQuery);