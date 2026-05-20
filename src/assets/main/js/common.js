$(function(){

	//gnbMenu
	$('.btn_gnbView').on('click', function(){
		if($(this).hasClass('close')){
			$(this).addClass('open');
			$(this).removeClass('close');
			$('#gnbMenu').slideDown();
		}else{
			$(this).addClass('close');
			$(this).removeClass('open');
			$('#gnbMenu').slideUp();
		}
	});
	$('#gnbMenu h2').on('click', function(){
		$(this).addClass('on');
		$(this).siblings().removeClass('on');
	});

	// slickSlider
	$("#visual .slider").slick({
		dots: true,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	});

	//tooltip		
	$('.cont_group > li > span').on('click', function(){
		$('.cont_group > li .toolTip').hide();
		$(this).next('.toolTip').show();
	});	
	$('.toolTip .btn_close').on('click', function(){
		$('.toolTip').hide();
	});



});