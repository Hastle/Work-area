$(document).ready(function() {

	$(".mainHead").css("height", $(window).height);
	function heightDetect() {
		$(".mainHead").css("height",$(window).height()+25);
	}
	heightDetect();

	$(window).resize(function(){
		heightDetect();
	});

	$(".toggleMenu").click(function(){
		$(".mainMenu").fadeOut(600);
		$(this).toggleClass("active");
		$(".sandwich ").toggleClass("active");
		if($(".mainMenu").is(":visible")){
			$(".mainMenu").fadeOut(600);
			$(".mainMenu li a").removeClass("slideInDown animated");
			$(".mainMenu li a").addClass("slideOutUp animated");
		} else {
			$(".mainMenu").fadeIn(600);
			$(".mainMenu li a").removeClass("slideOutUp animated");
			$(".mainMenu li a").addClass("slideInDown animated");
		}
	});

	$(".mainMenu li a").click(function(){
		$(".mainMenu").fadeOut(600);
		$(".toggleMenu").toggleClass("active");
		$(".sandwich ").toggleClass("active");
	});

	$("#img-filter").mixItUp();

	$("a[href*='#']").mPageScroll2id();

	$(".cbalink").addClass("hidden");

});