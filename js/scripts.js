(function () {

  var bv = new Bideo();
  bv.init({
    videoEl: document.querySelector('#background_video'),
    container: document.querySelector('#home'),
    resize: true,
    src: [
      {
        src: 'header.mp4',
        type: 'video/mp4'
      }
    ]
  });
}());
(function () {

  var bv = new Bideo();
  bv.init({
    videoEl: document.querySelector('#bg_video'),
    container: document.querySelector('#figure-parent'),
    resize: true,
    src: [
      {
        src: 'video.mp4',
        type: 'video/mp4'
      }
    ]
  });
}());
$('#popup').cyberpopup({
	position: "absolute",
    animateShow: 'fadeIn',
    animateHide: 'fadeOut'
});
$(window).load(function(){
  $('.landingMenu').liLanding({
  	speedFactor: 0.5,
  	topMargin: 42
  });
})
function move() {
	if($(window).width()<=750){
		$('.language-row').addClass('js-moved').appendTo($('.append-lang'))
	}else{
		$('.language-row').removeClass('js-moved').appendTo($('#lang-parent'))
	}
	
	if($(window).width()<=580){
		$('.landingMenu').addClass('js-moved').appendTo($('.mob-parent .nav'))
	}else{
		$('.landingMenu').removeClass('js-moved').appendTo($('#menu-from'))
	}

	//var mw = $(window).width();
	//$('.orange-line').css('max-width', mw + "px")

	if($(window).width()<=930){
		// alert('rw')
	    var list = $('.reserve');
	    var listItems = list.children('.s-item');
	    list.append(listItems.get().reverse());
	}

}

$(window).resize(function(){
	move()

})
$('.mob-button').click(function(){
	$('.mob-parent, .mob-button').toggleClass('focus')
})
$(window).load(function () {
	// body...
})
$(document).ready(function(){
	move()

	$("input[name='phone']").mask("+7 (999) 999-99-99",{placeholder:" "});
	
	$('.js-num').bind("change keyup input click", function() {
	    if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	    }
	});


	ymaps.ready(init);

	function init () {
	    var myMap = new ymaps.Map("map", {
	            center: [55.7495,37.5332],
	            zoom: 16 	
	        })
    		var objects = [];
			myMap.controls.add(
			   new ymaps.control.ZoomControl()
			);

        myPlacemark2 = new ymaps.Placemark([55.7495,37.5371], {
           
            hintContent: 'г. Москва, Пресненская набережная, 12, Башня Федерация Запад, 45 этаж'
        }, {
            iconImageHref: 'img/metka.png',
            iconImageSize: [70, 107],
            iconImageOffset: [-35, -107]
        });
		myMap.geoObjects.add(myPlacemark2)
	}

	$('.tech-slider').slick({
		fade: true,
		// adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
		appendArrows: $('.first-slide .nav-row .arrows')
		// arrows: false
	});

	$('.tech-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
		$('.tech-slider .slick-arrow').appendTo($(".tech-slider .slick-current .nav-row .arrows"))
		$('.nav-row').removeClass('hide')
		$(".tech-slider .link").removeClass('show').text('Читать далее')
		$('.hidden-content').slideUp()
		// alert('remove')
	});
	$('.tech-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.nav-row').addClass('hide')
		// alert('add')
	});	
})
$(".tech-slider .link").click(function (e) {
	e.preventDefault();

	if($(this).hasClass('show') == false){
		
		$(this).text('Скрыть')
	}else{
		$(this).text('Читать далее')
	}

	$(this).toggleClass('show').parents('.tech-item').find('.hidden-content').slideToggle(400)
	$('.tech-slider .slick-list').attr('style', '');	
})
$('.accord-title .cell').click(function(){
	$(this).parents('.accord-row').toggleClass('show').find('.accord-content').slideToggle(400)
})
