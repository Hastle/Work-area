$(document).ready(function() {

	new WOW().init();

	$("#feedback-1,#feedback-2").submit(function() {
		var captcha = grecaptcha.getResponse();
		if (captcha.length == 0) {
			alert("Не пройдена captcha, попробуйте еще раз.")
		} else {
			$.ajax({
				type: "GET",
				url: "mail.php",
				data: $(this).serialize()
			}).done(function() {
				$.magnificPopup.close();
				alert("Ваше сообщение успешно отправено!");
				$('#feedback-1')[0].reset();
				setTimeout(function() {
					$.fancybox.close();
				}, 1000);
			});
		}
		return false;
	});

	$(".scroll,a[href*='#']").mPageScroll2id();

	$('#owl-arts-1,#owl-arts-2').owlCarousel({
		items: 1,
		lazyLoad: true,
		loop: true,
		smartSpeed: 1000,
		nav: false,
		dots: false,
		mouseDrag: false,
		margin: 15
	});

	$("#owl-arts-1 .more").click(function(){
		$("#owl-arts-1").trigger("next.owl.carousel");
	});

	$("#owl-arts-2 .more").click(function(){
		$("#owl-arts-2").trigger("next.owl.carousel");
	});

	$('#owl-part').owlCarousel({
		items: 1,
		lazyLoad: true,
		loop: true,
		smartSpeed: 1000,
		nav: true,
		dots: false,
		navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
		margin: 15
	});

});