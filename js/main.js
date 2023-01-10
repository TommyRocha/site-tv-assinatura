(function($) {

"use strict";


$(document).ready(function(e) {
    
    var win 		= $(window),
		win_h 		= $(window).height(),
		win_w 		= $(window).width(),
		win_h_h 	= $(window).height()/2,
		win_w_h 	= $(window).width()/2,
		web_width 	= $(".boxed").width();


	// Scroll Bar ---------------------------------------------------
	$('html').niceScroll({
		cursoropacitymin: 0,
		cursorwidth: 10,
		cursorborder : 0,
		cursorborderradius : '6px',
		horizrailenabled : false,
		scrollspeed : 60,
		mousescrollstep : 60
	});


/*===========================================================================================
										Style Switcher
=============================================================================================*/


	$('.style-switcher .styles-container div[class^="style-"]').hover(function() {
		$(this).find('.style-name').addClass('hovered');
	}, function() {

		setTimeout(function() {
			$(this).find('.style-name').removeClass('hovered');
		},300);
	});
	
	$('.style-switcher .style-switcher-handle').click(function(event) {
		event.preventDefault();

		if($(this).parent().hasClass('active')) {

			$(this).parent().removeClass('active');
			$(this).parent().css('left', '-230px');
		}
		else {

			$(this).parent().addClass('active');
			$(this).parent().css('left', '0px');
		}
		
	});


/*===========================================================================================
											Menu
=============================================================================================*/


	// Enabling Sticky Menu.
	$(window).scroll(function(e) {
		var window_top_offset = $(window).scrollTop();
	    
		if($("nav .nav-container").offset().top == 0){
			$("nav").removeClass('sticky');
		}
		else {
			$("nav").addClass('sticky');
		}
    });

    // Responsive Menu sliding effect.
    $("nav .responsive_menu_button").click(function(event) {
    	event.preventDefault();

    	$("nav .menu").slideToggle(300);
    });

    // Menu Dropdown effect
    $("nav .menu li").hover(function() {

    	if($(window).width() > 1230) {
    		if($(this).find('.sub_menu')) {
    			$(this).find('.sub_menu').fadeToggle(200);
    		}
    	}
    });

    // Adjusting the menu for "One Page" layout.
    $('body').imagesLoaded( function() {
		
		$("nav .menu a").each(function(index, el) {

			var wanted_section = $(this).attr('data-id');

			if($("section[data-id="+wanted_section+"]").is(':visible')) {
				var wanted_offset = $("section[data-id="+wanted_section+"]").offset().top;
				if(wanted_offset != 0 && win_w > 690) {
					wanted_offset -= 66;
				}
				else if(wanted_offset != 0 && win_w <= 690) {
					wanted_offset -= 55;
				}
				$(this).attr('data-offset', wanted_offset);
			}
		});

		$(".rodape a").each(function(index, el) {

			var wanted_section = $(this).attr('data-id');

			if($("section[data-id="+wanted_section+"]").is(':visible')) {
				var wanted_offset = $("section[data-id="+wanted_section+"]").offset().top;
				if(wanted_offset != 0 && win_w > 690) {
					wanted_offset -= 66;
				}
				else if(wanted_offset != 0 && win_w <= 690) {
					wanted_offset -= 55;
				}
				$(this).attr('data-offset', wanted_offset);
			}
		});

		$(window).resize(function(event) {

			$("nav .menu a").each(function(index, el) {

				var wanted_section = $(this).attr('data-id');

				if($("section[data-id="+wanted_section+"]").is(':visible')) {

					var wanted_offset = $("section[data-id="+wanted_section+"]").offset().top;
					if(wanted_offset != 0 && win_w > 690) {
						wanted_offset -= 66;
					}
					else if(wanted_offset != 0 && win_w <= 690) {
						wanted_offset -= 55;
					}
					$(this).attr('data-offset', wanted_offset);
				}
			});
		});
	});

	// Highlighting menu links corresponding to visible section in "One Page" layout.
	var navigation_sections = $('section[data-id]');
	var navigation_links = $('nav a');

	if($('nav a[data-id]').is(':visible')) {
		navigation_sections.waypoint({
			handler: function(direction) {
						var active_section;
						var previous_section_id = parseInt($(this).attr('data-id')) - 1;
						var previous_section;
						active_section = $(this);
						previous_section = $('section[data-id='+previous_section_id+']');
						
						if (direction === "up") active_section = previous_section;
						var active_link = $('nav a[data-id=' + active_section.attr("data-id") + ']');
						navigation_links.removeClass("active");
						active_link.addClass("active");
					},
			offset: 140
		});
	}
	
	$("nav .menu a").click(function(event) {
		if($(this).attr('data-id')) {
			event.preventDefault();

			var wanted_offset = parseInt($(this).attr('data-offset'));
			$(window).scrollTo(wanted_offset,600);
		}
	});


	$(".rodape a").click(function(event) {
		if($(this).attr('data-id')) {
			event.preventDefault();

			var wanted_offset = parseInt($(this).attr('data-offset'));
			$(window).scrollTo(wanted_offset,600);
		}
	});

    $(".ligamos").click(function(event) {
        if($(this).attr('data-id')) {
            event.preventDefault();

            var wanted_offset = parseInt($(this).attr('data-offset'));
            $(window).scrollTo(wanted_offset,600);
        }
    });


/*===========================================================================================
										Slideshow
=============================================================================================*/
	

	if($(".slideshow").is(':visible')) {

		$('.slideshow').fractionSlider({
	        dimensions 				: '1920,650',
	        responsive 				: true,
	        backgroundAnimation		: true,
	        slideTransitionSpeed	: 1000,
	        timeout 				: 2500,
	        pager 					: false,
	        controls 				: true
	    });

	    $('.slideshow .play-button, .slideshow .play-button2').fancybox({
	    	openEffect	: 'elastic',
	    	closeEffect	: 'elastic',
	    	padding 	: 0,
			type : 'iframe',

	    	helpers : {
		        overlay : {
		            css : {
		                'background' : 'rgba(0, 0, 0, 0.9)'
		            }
		        }
		    },

		    afterClose: function() {
		    	$('.slideshow').fractionSlider('resume');
		    }

	    }).click(function(event) {

	    	$('.slideshow').fractionSlider('pause');
	    });
	}


/*===========================================================================================
										Clients
=============================================================================================*/


	// Adjusting clients animation effects.
	var clients_sliding = "no";
	$(".clients_data").height($(".clients .clients_data .client_text.selected").height());
	$(".clients .clients_images a").click(function(event) {
		event.preventDefault();

		var wanted_client = $(this).attr('data-id');
		var current_client = $(".clients .clients_images a.selected").attr('data-id');

		if(clients_sliding == "no") {
			clients_sliding = "yes";

			if(!$(this).hasClass('selected')) {
				$(".clients .clients_images a.selected").removeClass('selected');
				$(this).addClass('selected');

				$(".clients .clients_data .client_text.selected").fadeOut(300, function() {
					$(this).removeClass('selected');
				});
				
				$(".clients_data").height($(".clients .clients_data .client_text[data-id="+wanted_client+"]").height());

				$(".clients .clients_data .client_text[data-id="+wanted_client+"]").fadeIn(300, function() {
					$(this).addClass('selected');
				});
			}
			clients_sliding = "no";
		}
	});

	$(window).resize(function(event) {
		
		$(".clients_data").height($(".clients .clients_data .client_text.selected").height());
	});



/*===========================================================================================
										Contact Us
=============================================================================================*/

	var map_marker = '../../images/map/marker.png';
	if($("body").hasClass('corporate')) {
		map_marker = '../../images/map/marker2.png';
	}
	// Creating the map in contact us section.
	function initializee() {
		var map_canvas = document.getElementById('map');
		var map_options = {
		  center: new google.maps.LatLng(-19.9305287,-44.0301056),
		  zoom: 15,
		  scrollwheel: false,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(map_canvas, map_options);
		
		var marker=new google.maps.Marker({
		  position:new google.maps.LatLng(-19.9305287,-44.0301056),
		  //icon: map_marker
		});
		marker.setMap(map);
	}

	if($("#map")) {
		google.maps.event.addDomListener(window, 'load', initializee);
	}

	//if($(".contact_us .link1").hasClass('active') && ( $(".contact_us .link1").attr('href') == "" || $(".contact_us .link1").attr('href') == "#" ) ) {
		//$(".contact_us form").hide();
	//}
	//if($(".contact_us .link2").hasClass('active')) {
		//$(".map_container").height(0);
	//}

	$(".contact_us .link1").click(function(event) {

		if($(this).attr('href') == "" || $(this).attr('href') == "#") {
			event.preventDefault();

			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(".contact_us form").slideDown(300);
				setTimeout(function() {
					$(window).scrollTo($(".contact_us form"),300);
				},200);
			}
			else {
				$(this).addClass('active');
				$(".contact_us form").slideUp(300);
			}
		}
	});

	$(".contact_us .link2").click(function(event) {
		event.preventDefault();

		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(".map_container").height(300);
			$(this).text('Conheça nossa loja');
			setTimeout(function() {
				$(window).scrollTo($(".map_container"),300);
			},200);
		}
		else {
			$(this).addClass('active');
			$(".map_container").height(0);
			$(this).text('Conheça nossa loja');
		}
	});
		
	


/*===========================================================================================
									Team  &  Strength  &  About Us
=============================================================================================*/
	
	// Adjusting team section styles.
	function adjust_team_bg() {
		$(".strength .team").each(function(index, el) {
			var team_bg_height = $(this).position().top + $(this).find(".member img").height() + parseInt($(".strength").css('padding-top')) + 9;
			$(".strength .bg").height(team_bg_height);
		});
	}

	$("body").imagesLoaded(function(){

		adjust_team_bg();

		//just in case.
		setTimeout(adjust_team_bg,200);

		$(window).resize(function(event) {

			adjust_team_bg();

			//just in case.
			setTimeout(adjust_team_bg,200);
		});
	});

	
	// Bars Counter ---------------------------------------------------
	if($(".skills").is(":visible")){

		$(".skills").each(function(index, el) {

			$(this).appear();
			if($(this).is(':appeared')) {
				$(this).find(".skill").each(function(index, element) {
					$(this).width(''+$(this).attr('data-percentage')+'%');
				});
			}
			$(document.body).on('appear', '.skills', function() {

				$(this).each(function(){ 

					var skills_cont = $(this);
					skills_cont.find(".skill").each(function(index, element) {
						$(this).width(''+$(this).attr('data-percentage')+'%');
					});
				});
			});
		});
	}
	


/*===========================================================================================
										Shortcodes
=============================================================================================*/
	
	// Shortcodes Page ---------------------------------------------------
	if($(window).width() > 1230) {
		var shortcodes_height = $(".shortcodes .data_container").outerHeight();
		if(shortcodes_height > ($(".shortcodes .shortcodes_list_container .list").outerHeight() + 201)) {
			$(".shortcodes .shortcodes_list_container").height(shortcodes_height-201);
		}
		else {
			$(".shortcodes .shortcodes_list_container").height('auto');
		}
	}

	$(window).resize(function(event) {
		
		if($(window).width() > 1230) {
			var shortcodes_height = $(".shortcodes .data_container").outerHeight();
			if(shortcodes_height > $(".shortcodes .shortcodes_list_container .list").outerHeight()) {
				$(".shortcodes .shortcodes_list_container").height(shortcodes_height-201);
			}
			else {
				$(".shortcodes .shortcodes_list_container").height('auto');
			}
		}
	});
	

	$(".responsive_shortcode_list").click(function(event) {
		event.preventDefault();

		$(this).parent().find('.list').slideToggle(500);
	});

	$(".shortcodes .list a").click(function(event) {
		event.preventDefault();

		if(!$(this).hasClass('active')) {

			var wanted_shortcode = $(this).attr('data-attr');
			var current_link = $(this);

			if($(this).hasClass('full_view')) {
				$(".shortcodes .data_container, .shortcodes .why_us").fadeOut(300, function() {
					$(".shortcodes .full_view_data_container").fadeIn(300);
					$(".shortcodes .full_view_data_container .shortcode_data[data-attr="+wanted_shortcode+"]").fadeIn(300, function() {
						$(this).addClass('active');
					});
				});
				$(window).scrollTo(0,600);
			}
			else {
				$(".shortcodes .list a.active").removeClass('active');
				current_link.addClass('active');
				$(".shortcodes .data_container .shortcode_data.active").fadeOut(300, function() {
					$(this).removeClass('active');
					$(".shortcodes .data_container .shortcode_data[data-attr="+wanted_shortcode+"]").fadeIn(300, function() {
						$(this).addClass('active');

						if($(window).width() > 1230) {
							var shortcodes_height = $(".shortcodes .data_container").outerHeight();
							if(shortcodes_height > ($(".shortcodes .shortcodes_list_container .list").outerHeight() + 201)) {
								$(".shortcodes .shortcodes_list_container").height(shortcodes_height-201);
							}
							else {
								$(".shortcodes .shortcodes_list_container").height('auto');
							}
						}
					});
				});	
			}
		}

		if($(".responsive_shortcode_list").is(':visible')) {
			$('.shortcodes_list_container .list').slideToggle(500);
		}
	});

	$(".shortcodes .back_to_list").click(function(event) {
		event.preventDefault();

		$(".shortcodes .full_view_data_container").fadeOut(300, function() {
			$(".shortcodes .full_view_data_container .shortcode_data.active").removeClass('active').fadeOut(1);
			$(".shortcodes .data_container, .shortcodes .why_us").fadeIn(300);
		});
		
	});


	// Accordions ---------------------------------------------------
	$(window).resize(function(event) {
		
		$(".accordion_1, .accordion_2").each(function(index, el) {
			var text_height = $(this).find('.row.selected .text_cont .text');
			$(this).find('.row.selected .text_cont').height(text_height.outerHeight());
		});
	});

    $(".accordion_1 .row .title, .accordion_2 .row .title").click(function(e) {
        e.preventDefault();

        var current_accordion = $(this).parent().parent();
        var wanted_height = $(this).next().find('.text').outerHeight();
        var current_row = $(this).parent();

		if($(this).parent().hasClass('selected')){
			
			$(this).parent().find('.text_cont').animate({height:'0px'},400, function() {
				current_row.removeClass('selected');
			});
			$(this).parent().find(".icon").text('+');
		}
		else{
			current_accordion.find(".row.selected").find('.text_cont').animate({height:'0px'},400);
			current_accordion.find(".row.selected .icon").text('+');
			current_accordion.find(".row.selected").removeClass('selected');
			
			$(this).next().animate({height:wanted_height},400, function(){
				current_row.addClass('selected');
			});
			$(this).parent().find(".icon").text('-');
		}
    });


    // Tabs ---------------------------------------------------
	$(".horizontal_tabs, .vertical_tabs").each(function(index, el) {
		var wanted_height = $(this).find('.tab_content.selected').height();
		$(this).find('.data').height(wanted_height);
	});
	

	$(window).resize(function(event) {
		
		$(".horizontal_tabs, .vertical_tabs").each(function(index, el) {
			var text_height = $(this).find('.tab_content.selected');
			$(this).find('.data').height(text_height.height());
		});
	});

    $(".horizontal_tabs .tabs li a, .vertical_tabs .tabs li a").click(function(e) {
		e.preventDefault();

		var current_tab = $(this).parentsUntil('.tabs').parent().parent();

		current_tab.find(".tabs a.selected").removeClass('selected');
		$(this).addClass('selected');
		
		var wanted_tab = $(this).attr('data-id');
		
		if(current_tab.find(".data .selected").attr('data-id') != wanted_tab){
			current_tab.find(".tab_content.selected").fadeOut(250,function(){
				current_tab.find(".tab_content.selected").removeClass('selected');
				current_tab.find(".tab_content[data-id="+wanted_tab+"]").fadeIn(250,function(){
					current_tab.find(".tab_content[data-id="+wanted_tab+"]").addClass('selected');
				});
				current_tab.find(".data").height(current_tab.find(".tab_content[data-id="+wanted_tab+"]").height());
			});
		}
    });


    // Alerts ------------------------------------------------------------------------------------
    $(".alert_warning .close, .alert_success .close," + 
    " .alert_info .close, .alert_message .close," + 
    " .alert_icon_warning .close, .alert_icon_success .close," + 
    " .alert_icon_info .close, .alert_icon_message .close").click(function(event) {
    	event.preventDefault();

    	$(this).parent().fadeOut(300);
    });


    // Counter Circles ------------------------------------------------------------------------------------
	$('.circle-counter[data-style="circle-style-1"]').easyPieChart({
        lineWidth	: 15,
        size 		: 125,
        rotate		: 180,
        animate 	: 2000,
        scaleColor	: false,
        lineCap		: 'square',
        trackColor	: '#d5d5d5',
        barColor	: $(".template_color").css('color'),

        onStep: function(value) {
          this.$el.find('span').text(~~value + 1);
        }
    });
	$('.circle-counter[data-style="circle-style-2"]').easyPieChart({
        lineWidth	: 15,
        size 		: 205,
        rotate		: 180,
        animate 	: 2000,
        scaleColor	: false,
        lineCap		: 'square',
        trackColor	: '#d5d5d5',
        barColor	: $(".template_color").css('color'),

        onStep: function(value) {
          this.$el.find('span').text(~~value + 1);
        }
    });
	$('.circle-counter[data-style="circle-style-3"]').easyPieChart({
        lineWidth	: 6,
        size 		: 205,
        rotate		: 180,
        animate 	: 2000,
        scaleColor	: false,
        lineCap		: 'square',
        trackColor	: '#d5d5d5',
        barColor	: $(".template_color").css('color'),

        onStep: function(value) {
          this.$el.find('span').text(~~value + 1);
        }
    });

	$('.circle-counter').each(function(index, el) {
		
		var current_style = $(this).attr('data-style');
		$(this).appear();

		if($(this).is(':appeared') && !$(this).hasClass('done')) {
			
			var wanted_percent = parseInt($(this).attr('data-animate-percent'));
		    $(this).data('easyPieChart').update(wanted_percent);

			$(this).addClass('done');
		}

		$(this).on('appear', function() {

			if(!$(this).hasClass('done')) {
				
				var wanted_percent = parseInt($(this).attr('data-animate-percent'));
		    	$(this).data('easyPieChart').update(wanted_percent);


				$(this).addClass('done');
			}
		});
	});
	

	// Number Counters ------------------------------------------------------------------------------------
	$(".number_counter").each(function(index, element) {

		var wanted_value = parseInt($(this).attr('data-number'));

		$(this).appear();
		if($(this).is(':appeared') && !$(this).hasClass('done')) {

			$(this).find('.number').countTo({
				from: 0,
				to: wanted_value,
				speed: 2500,
				refreshInterval: 30
			});
			$(this).addClass('done');
		}
	});
	$(document.body).on('appear', '.number_counter', function() {

		var wanted_value = parseInt($(this).attr('data-number'));

		if(!$(this).hasClass('done')) {

			$(this).find('.number').countTo({
				from: 0,
				to: wanted_value,
				speed: 2500,
				refreshInterval: 30
			});
			$(this).addClass('done');
		}
	});
	

	// Progress Bars ---------------------------------------------------
	$(".progress_bar").each(function(index, el) {

		$(this).appear();
		if($(this).is(':appeared')) {
			var wanted_perc = $(this).find(".fg").attr('data-percentage');
			$(this).find(".fg").width(''+wanted_perc+'%');
		}
	});
	$(document.body).on('appear', '.progress_bar', function() {

		$(this).each(function(){ 
			var wanted_perc = $(this).find(".fg").attr('data-percentage');
			$(this).find(".fg").width(''+wanted_perc+'%');
		});
	});
	

	// Carousel ---------------------------------------------------
	$("#carousel_1 .items_wrapper, #carousel_2 .items_wrapper, #carousel_3 .items_wrapper").owlCarousel({
		items : 4,
		pagination : false,
		slideSpeed : 450,
		itemsDesktop : [1230,2],
	    itemsDesktopSmall : false,
	    itemsTablet: [690,1],
	    itemsMobile: false
	});
	$("#carousel_4 .items_wrapper").owlCarousel({
		items : 3,
		slideSpeed : 450,
		pagination : false,
		itemsDesktop : [1230,2],
	    itemsDesktopSmall : false,
	    itemsTablet: [690,1],
	    itemsMobile: false
	});
	$("#testimonials_carousel_1 .items_wrapper, #testimonials_carousel_2 .items_wrapper").owlCarousel({
		singleItem : true,
		slideSpeed : 450,
		autoHeight : true
	});
	$("#testimonials_carousel_3 .items_wrapper").owlCarousel({
		items : 2,
		slideSpeed : 450,
		itemsDesktop : [1230,1],
	    itemsDesktopSmall : false,
	    itemsTablet: false,
	    itemsMobile: false
	});

	$(".carousel_1 .arrow_left").click(function(event) {
		event.preventDefault();

		$(this).parent().find('.items_wrapper').trigger('owl.prev');
	});

	$(".carousel_1 .arrow_right").click(function(event) {
		event.preventDefault();
		
		$(this).parent().find('.items_wrapper').trigger('owl.next');
	});


	// Parallax ---------------------------------------------------
	$('.parallax_bg_1').parallax("40%", 0.5);
	$('.parallax_bg_2').parallax("40%", 0.5);
	$('.parallax_bg_3').parallax("40%", 0.5);


	// Icons ---------------------------------------------------
	$(".fontaweomse_set a, .icomoon_set a, .entypo_set a").each(function(index, el) {
		
		$(this).attr('title', $(this).attr('class'));
	});
	$(".fontaweomse_set a, .icomoon_set a, .entypo_set a").tooltipster({

		fixedWidth: 120
	});


	// Video ---------------------------------------------------
	$("body").fitVids();
	$(".vid .play_button").click(function(event) {
		event.preventDefault();

		$(this).parent().fadeOut('300', function() {

			var old_src = $(this).parent().find('iframe').attr('src');
			var new_src = old_src + '&autoplay=1';
			$(this).parent().find('iframe').attr('src', new_src);
		});
	});



/*===========================================================================================
										Blog & Journal
=============================================================================================*/


	// Adding Flexslider to blog post.
	$(".post .post-media .flexslider").flexslider({

		animation: "fade",
		easing: "swing",
		direction: "horizontal",
		slideshow: true,
		slideshowSpeed: 7000,
		animationSpeed: 600,
		controlNav: false,
		directionNav: true,
		prevText: "",
		nextText: ""
	});

	// Adding masonry layout to blog posts.
	$('body').imagesLoaded(function() {
		$(".journal .posts").isotope();
	});

	// Adding related posts carousel.
	$("#blog_carousel_1 .items_wrapper").owlCarousel({
		items : 3,
		slideSpeed : 450,
		pagination : false,
		itemsDesktop : [1230,2],
	    itemsDesktopSmall : false,
	    itemsTablet: [690,1],
	    itemsMobile: false
	});


/*===========================================================================================
										Portfolio
=============================================================================================*/

	// Adding FancyBox animation in Corporate layout, Home Portfolio layout.
	$(".projects a.fancybox").fancybox({
    	openEffect	: 'elastic',
    	closeEffect	: 'elastic',
    	padding 	: 0,

    	helpers : {
	        overlay : {
	            css : {
	                'background' : 'rgba(0, 0, 0, 0.9)'
	            }
	        }
	    }
    });


	// Adjusting all the effects in portfolio section including slider, filters.
	function adjust_portfolio_projects(window_width, category_filter) {

		var is_project_selected = null,
			selected_project = null,
			projects_container = $(".portfolio .projects_container"),
			projects_count = $(".portfolio .projects .project").length,
			visible_projects = 0,
			visible_projects_width = 0,
			project_container_left = 0,
			project_width = 384,
			window_width,
			category_filter,
			project_sliding = "no";

		$(".portfolio .arrow_left, .portfolio .arrow_right").removeClass('useless');
		$(".portfolio .projects .project").attr('data-current', null);
		$(".portfolio .projects .project.current").removeClass('current');
		if(!category_filter) {
			category_filter = "";
		}
		visible_projects = $(".portfolio .projects .project"+category_filter+"").length;

		if(window_width < 690) {
			project_width = 220;
		}
		$(".portfolio .projects_container").width(projects_count * project_width);
		

		if($(".portfolio .projects .project.selected").is(':visible')) {
			is_project_selected = "yes";
			selected_project = $(".portfolio .projects .project.selected").index() + 0.5;
			project_container_left = (window_width/2) - (selected_project * project_width);
			projects_container.css('left', project_container_left+'px');
			var project_position = $(".portfolio .projects .project.selected").index();
			$(".portfolio .projects .project.selected").attr('data-current', project_position);
		}
		else {
			project_container_left = (window_width/2) - (0.5 * project_width);
			projects_container.css('left', project_container_left+'px');
			$(".portfolio .projects .project"+category_filter+":eq(0)").addClass('selected').attr('data-current', 0);
			$(".portfolio .arrow_left").addClass('useless');
		}


		if(visible_projects == 0 || visible_projects == 1) {
			$(".portfolio .arrow_right, .portfolio .arrow_left").addClass('useless');
		}
		else if(visible_projects == 2 && $(".portfolio .projects .project"+category_filter+":eq(0)").hasClass('selected')) {
			$(".portfolio .arrow_left").addClass('useless');
		}
		else if(visible_projects == 2 && $(".portfolio .projects .project"+category_filter+":eq(1)").hasClass('selected')) {
			$(".portfolio .arrow_right").addClass('useless');
		}
		else if($(".portfolio .projects .project"+category_filter+":eq("+(visible_projects-1)+")").hasClass('selected')) {
			$(".portfolio .arrow_right").addClass('useless');
		}


		
		$(".portfolio .arrow_left, .portfolio .arrow_right").unbind('click');


		$(".portfolio .arrow_left, .portfolio .arrow_right").click(function(event) {
			event.preventDefault();

			if(project_sliding == "no" && !$(this).hasClass('useless')) {

				project_sliding = "yes";
				var sliding_direction,
					wanted_project = null,
					project_track = null;

				if($(this).hasClass('arrow_left')) {

					sliding_direction = 1;
					project_track = parseInt($(".portfolio .projects .project.selected").attr('data-current')) - 1;
					wanted_project = $(".portfolio .projects .project"+category_filter+":eq("+project_track+")");
					$(".portfolio .projects .project.selected").removeClass('selected');
					wanted_project.addClass('selected').attr('data-current', project_track);
					if($(".portfolio .projects .project"+category_filter+":eq(0)").hasClass('selected')) {
						$(".portfolio .arrow_left").addClass('useless');
					}
					$(".portfolio .arrow_right").removeClass('useless');
				}
				else if($(this).hasClass('arrow_right')) {

					sliding_direction = -1;
					project_track = parseInt($(".portfolio .projects .project.selected").attr('data-current')) + 1;
					wanted_project = $(".portfolio .projects .project"+category_filter+":eq("+project_track+")");
					$(".portfolio .projects .project.selected").removeClass('selected');
					wanted_project.addClass('selected').attr('data-current', project_track);
					if($(".portfolio .projects .project"+category_filter+":eq("+(visible_projects-1)+")").hasClass('selected')) {
						$(".portfolio .arrow_right").addClass('useless');
					}
					$(".portfolio .arrow_left").removeClass('useless');
				}

				
				projects_container.css('left', "+="+(sliding_direction * project_width)+'px');
				

				setTimeout(function() {
					project_sliding = "no";
				},300);
			}
		});
	}

	$('body').imagesLoaded(function() {

		if($(".portfolio").is(':visible')) {

			adjust_portfolio_projects($(window).width(), false);

			if($(".portfolio .categories").is(':visible')) {
				$(".portfolio .projects_container").isotope({ layoutMode:'fitRows' });
			}

			$('.portfolio .projects .project').click(function(){
				return false;
			});

			$(".portfolio .categories a").click(function(e) {
				$(".portfolio .categories a").removeClass('selected');
				$(this).addClass('selected');

				var selector = $(this).attr('data-filter');

				$('.projects_container_').isotope({
		            filter: selector,
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
				});

		      /*  e.preventDefault();
				
				$(".portfolio .projects .project.selected").removeClass('selected');
				$(".portfolio .categories a.selected").removeClass('selected');
				$(this).addClass('selected');
				var selector = $(this).attr('data-filter');
				$(".portfolio .projects_container").isotope({ filter: selector,layoutMode:'fitRows' });
				adjust_portfolio_projects($(window).width(), selector);*/

				return false;
		    });
		}

		$(window).resize(function(event) {

			if($(".portfolio").is(':visible')) {

				var active_filter = $(".portfolio .categories a.selected").attr('data-filter');
				adjust_portfolio_projects($(window).width(), active_filter);
			}
		});
	})
	


	// Portfolio 2
	if($(".portfolio_2 .categories").is(':visible')) {
		$(".portfolio_2 .projects_container").isotope({ layoutMode:'fitRows' });
	}

	$(".portfolio_2 .categories a").click(function(e) {
        e.preventDefault();
		
		$(".portfolio_2 .categories a.selected").removeClass('selected');
		$(this).addClass('selected');
		var selector = $(this).attr('data-filter');
		$(".portfolio_2 .projects_container").isotope({ filter: selector,layoutMode:'fitRows' });
    });

	$(".portfolio_2 .project").hover(function() {
		$(this).find('.click').addClass('hovered');
	}, function() {

		setTimeout(function() {
			$(this).find('.click').removeClass('hovered');
		},300);
	});


});

})(jQuery);

