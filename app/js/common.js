$(function() {
	// carousel
	var width = $(window).width();
	var height= $(window).height();
	var summ = 0;


	$('.carousel').slick({
		mobileFirst: true,
		 slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    dots: true,
    asNavFor: '.carousel_top',
		responsive: [
			{
				breakpoint: 1024,
				settings: "unslick"
			},
		]
	});
	$('.carousel_top').slick({
		slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
	  arrows: false,
	  dots: false,
	  fade: true,
	  responsive: [
			{
				breakpoint: 999999,
				settings: "unslick"
			},
			{
			 breakpoint: 1025,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        arrows: false,
	        infinite: true,
	        dots: false
	      }
	    }
		],
	  asNavFor: '.carousel'
	});

	$('.feautures_li').hover(function() {
		$('.feautures_li').removeClass('features_li_active');
		$(this).addClass('features_li_active');

		$('.feautures_descr').removeClass('feautures_descr_active').hide();;
		$('.feautures_descr[data-feauture="' + $(this).data('feauture') + '"]').show().addClass('feautures_descr_active');
	});

	$('.cart_close').click(function() {
		$('.cart').toggleClass('cart_closed cart_opened');
		if( $('.cart_item').length ) {
			$('.cart_wrapper').slideToggle();
			$('.cart_lorem').remove();
		} else {
			if( !$('.cart_lorem').length ) {
				$('<p class="cart_lorem">Пусто(</p>').insertBefore('.cart_list')
			}

			if( width < 769 ) {
				$('.cart_wrapper').slideToggle();
			}
		}
	});

	$('.menu_btn_mob').click(function() {
		if( $(this).hasClass('opened') ) {
			$(this).removeClass('opened');
			$('.page-menu_mob').removeClass('opened');
		} else {
			$(this).addClass('opened');
			$('.page-menu_mob').addClass('opened');
		}
	});

	$('.item_btn, .menu_item_btn').click(function() {
		var th = $(this);
		$('.cart_lorem').remove();

		if( $('.cart_item').length ) {
			var checked = 0;

			if( $(th).hasClass('item_btn') ) {
				for( var i = 0; i < $('.cart_item_name').length; i++) {
					var name = $('.cart_item_name')[i];
					
					if( $(name).text().slice(5, $(name).text().length - 1) == th.siblings('.item_title').text() ) {
						var num = $(name).siblings('.cart_item_count').children('.count_num').text().slice(1);
						num = +num + 1;
						$(name).siblings('.cart_item_count').children('.count_num').text('x' + num);
						$('.cart_mob_count').text( +$('.cart_mob_count').text() + 1 )

						checked++;
					}
				};
			} else {
				for( var i = 0; i < $('.cart_item_name').length; i++) {
					var name = $('.cart_item_name')[i];
					
					if( $(name).text() == th.parents('.menu_item_descr').siblings('.menu_item_title').text() ) {
						var num = $(name).siblings('.cart_item_count').children('.count_num').text().slice(1);
						num = +num + 1;
						$(name).siblings('.cart_item_count').children('.count_num').text('x' + num);
						$('.cart_mob_count').text( +$('.cart_mob_count').text() + 1 )

						checked++;
					}
				};
			}

			if( !checked ) {
				createItem();
			}
		} else {
			createItem();
		}

		

		function createItem() {
			if( !$('.cart_item').length ) {
				$('.cart').addClass('cart_opened').removeClass('cart_closed');
			}
			if( width < 769 ) {
				$('.cart').removeClass('cart_opened').addClass('cart_closed');
				$('.cart_wrapper').hide();
			}

			var item = document.createElement('li');
			$(item).addClass('cart_item');
			$('.cart_list').append(item);

			$(item).append('<div class="cart_item_delete"><svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><g stroke="#E79898" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M1.278 7.278L8.293.263M1.243.243l7.035 7.035"/></g></svg></div>');

			var table = document.createElement('div');
			$(table).addClass('cart_table');
			$(item).append(table);

			var name = document.createElement('div');
			$(name).addClass('cart_item_name');
			$(table).append(name);

			var count = document.createElement('div');
			$(count).append('<div class="count_num"></div>');
			$(count).children('.count_num').text('x' + $(th).data('count'))
			$(count).addClass('cart_item_count');
			$(table).append(count);

			$(count).append('<div class="count_up">+</div>');
			$(count).append('<div class="count_down">-</div>');


			if( $(th).data('description') ) {
				var descr = document.createElement('div');
				$(descr).addClass('cart_item_descr').text($(th).data('description'));
				$(item).append(descr);
			}

			if( $(th).hasClass('item_btn') ) {
				$(name).text('Сет «' + $(th).siblings('.item_title').text() + '»');
				$(count).children('.count_num').attr('data-price', $(th).siblings('.item_price').text().slice(0,3));
				$(item).addClass('byTen');
			} else {
				$(name).text( $(th).parents('.menu_item_descr').siblings('.menu_item_title').text() );
				$(count).children('.count_num').attr('data-price', $(th).siblings('.menu_item_price').text().slice(0,3));
				$(item).addClass('byThree');
			}

			if( $('.cart').outerHeight() > height * 0.8 ) {
				$('.cart').css({
					'overflow-y':'scroll',
					'max-height':'80vh'})
			}

			var count = 0;
			$('.count_num').each(function() {
				count = count + +$(this).text().slice(1);
			});
			$('.cart_mob_count').text(count);

			calc();

		}

		calc();

	});

	function calc() {
		var price = 0;
		$('.cart_item').each(function() {
			price += +$(this).find('.count_num').text().slice(1) * $(this).find('.count_num').data('price');
		})
		$('.cart_mob_price').text(price);
	}


	$(document).on('click', '.count_up', function() {
		var num = $(this).siblings('.count_num').text().slice(1);
		num = +num + 1;
		$(this).siblings('.count_num').text('x' + num);

		calc();
		
	});
	$(document).on('click', '.count_down', function() {
		var num = $(this).siblings('.count_num').text().slice(1);
		if( num == 10 && $(this).parents('.cart_item').hasClass('byTen') ) {
			$(this).parents('.cart_item').remove();
			if( !$('.cart_item').length ) {
				$('.cart').addClass('cart_closed').removeClass('cart_opened');
				if( width < 769 ) {
					$('.cart_wrapper').slideToggle();
				}
			}
		} else if ( num == 3 && $(this).parents('.cart_item').hasClass('byThree') ) {
			$(this).parents('.cart_item').remove();
			if( !$('.cart_item').length ) {
				$('.cart').addClass('cart_closed').removeClass('cart_opened');
				if( width < 769 ) {
					$('.cart_wrapper').slideToggle();
				}
			}
		} else {
			num = +num - 1;
			$(this).siblings('.count_num').text('x' + num);
		}
		calc();
	});
	$(document).on('click', '.cart_item_delete', function() {
		$(this).parents('.cart_item').remove();
		if( !$('.cart_item').length ) {
			$('.cart').addClass('cart_closed').removeClass('cart_opened');
			if( width < 769 ) {
				$('.cart_wrapper').slideToggle();
			}
		}
		calc();
	});

	// menu scroll
	$('.menu_li, .mob-menu_li').click(function() {
		$('.page-menu_mob, .menu_btn_mob').removeClass('opened')
		var scroll_el = $(this).data('scroll');
			$('html, body').animate({ scrollTop: $('#' + scroll_el).offset().top - 60 }, 500);
		return false;
	});

	// filter
	var filtered = [];

	function filter() {
		var items = [];
		$('.menu_item_wrapper').removeClass('filtered');

		for (var i = 0; i < filtered.length; i ++) {
			items.push( $('.' + filtered[i]) );
			$('.' + filtered[i]).addClass('filtered');
		}
		$('.menu_item_wrapper').hide();
		$('.filtered').show();
	};

	$('.menu_nav_item').click(function() {
		filtered.push($(this).data('type'));
		$(this).addClass('checked');

		filter();
	});
	
	$('.menu_nav_remove').click(function() {
		for( var i = 0; i < filtered.length; i++ ) {
			if( filtered[i] === $(this).parent('.menu_nav_item').data('type') ) {
				filtered.splice(i, 1)
			}
		};

		$(this).parent('.menu_nav_item').removeClass('checked');

		if( filtered.length == 1 ) {
			$('.menu_item_wrapper').show();
			filter($(this).parent('.menu_nav_item').data('type'));
		} else if ( filtered.length == 0 ) {
			$('.menu_item_wrapper').show();
		}

		return false;
	});

	var isChecked = false;
	// cart Input
	$('.cart_input').inputmask('+7-(999)-999-99-99',{'oncomplete':function(){ isChecked = 1; }});

	// send
	// $('.cart_btn').click(function() {
	// 	if(isChecked) {
	// 		var i = 1;
	// 		var hiddenForm = document.createElement('form');
	// 		$('#list').append(hiddenForm);
	// 		$(hiddenForm).addClass('hidden hidden_form');
	// 		$('.cart_item_name').each(function() {
	// 			var count = $(this).siblings('.cart_item_count').children('.count_num').text();

	// 			var input = document.createElement('input');
	// 			$(input).addClass('hidden').attr('name', $(this).text()).attr('value', count).val( count );
	// 			$(hiddenForm).append(input);
	// 			i++;
	// 		});

	// 		var phoneNum = document.createElement('input');
	// 		$(phoneNum).addClass('hidden').attr('name', 'Телефон:').attr('value', $('.cart_input').val()).val( $('.cart_input').val() );
	// 		$(hiddenForm).append(phoneNum);

	// 		var data = $('.hidden_form').serialize();
	// 		$.ajax({
	// 			method: 'post',
	// 			data: data,
	// 			url: 'mail.php'
	// 		}).done(function(response) {
	// 			popup_open();
	// 		});
	// 	}
	// 	return false;
	// });

	// popup
	var win_top = 0;
	$(document).on('click', '.popup_close, .overflow', function(){
		popup_close();
	});
	function popup_open(){
		win_top = $(window).scrollTop();
		$('#list').css({
			'position'	: 'fixed',
			'top'		: '0',
			'margin-top': '-'+win_top+'px' 
		})
		$('bode').css({
			'overflow'	: 'hidden',
			'overflow-y'	: 'scroll',
		})
		$('.overflow, .popup').fadeIn();
	}

	// animation
	if( width > 768 ) {
		var waypoints = $('.items').waypoint(function(direction) {
			$($(this)[0].element).addClass('scrolled')
		}, {
		  offset: '75%'
		})
	} else {
		$('.items').addClass('scrolled')
	};
});