(function () {

	var template = {

		init: function () {
			this.cacheDom();
			// Bind events
			this.bindEvents();
			// Enable totop button
			this.totopButton();
			// Init slick slider
			this.initSlider();
			// Init counter element ( example on services page )
			this.initCounterElement();
			// Init contact form ( example on contact page )
			this.initContactForm();
			// Eenable mailchimp form
			this.enableMailchimpForm();
			// Enable grid gallery
			this.enableGridGallery();
			// Enable pop-up gallery
			this.enablePopupGallery();
			// Enable range slider ( example on shop page )
			this.enableRangeSlider();
			// Enable anchors animation
			this.enableAnchors();
			// Enable accordions ( example on frontpage )
			this.toggleAccordion();
		},
		cacheDom: function(){
			this.toTop = $('.totop');
			this.menuBurger = $('.hg-menuBurger');
			this.rezMenu = $('.hg-resMenu');
			this.subMenuButton = $('.hg-res-submenu-trigger');
			this.pageWrapper = $('#page_wrapper');
			this.homepageSider = $('.hg-slider');
			this.quoteSlider = $('.hg-quoteSlider');
			this.teamSlider = $('.hg-teamSlider');
			this.mapSlider = $('.hg-mapSlider');
			this.featureSlider = $('.hg-featureSlider');
			this.counterElement = $('.hg-counterElement');
			this.contactInput = $('.hg-input');
			this.formComponent= $('.hg-form-component');
			this.hasAnimation = $('.hasAnimation');
		},
		bindEvents: function(){
			var self = this;
			$(document).on('click','.hg-searchBtn', self.openSearchBox);
			$(document).on('click','.hg-menuBurger', self.triggerMenu);
			$(document).on('click','.hg-resMenu a:not(.hg-resMenu-back)', self.CloseMenu);
			$(document).on('click','.hg-resMenu-backIcon', self.CloseMenu);
			$(document).on('click','.hg-subMenu-backIcon', self.CloseMenu);
			$(document).on('click','.hg-res-submenu-trigger', self.triggerSubMenu);
			$(document).on('click','.hg-verticalTabs__listItem', self.openActivePanel);
			$(document).on('click','.hg-iconbox--tab', self.openActivePanel);
			$(document).on('click','.hg-pagination__item', self.openActivePanel);
			$(document).on('click','.hg-pagination__item', self.changePaginationLink);
			$(document).on('keyup, change', '.hg-input', self.changeInputLabel);
			$(document).on('click','.hg-bookPanel .hg-input', self.expandForm);
			$(document).on('click', '.hg-shopbar__display li', self.changeProductsDispaly);
			$(document).on('mouseenter', '.hg-icon-star', self.addHoverRating);
			$(document).on('click', '.hg-quantity__group .glyphicon', self.changeQuantity);
			$(document).on('click', '.hg-cartList__itemRemove', self.removeShopItem);
			$(window).on('scroll', self.addAnimations);
		},
		enableAnchors: function() {
			$(document).on('click', '.hasAnchor', function(e) {
				var $link = $(this),
						linkAttribute = $link.attr('href'),
						sectionId = linkAttribute.substring( linkAttribute.indexOf('#') ),
						$section = $( sectionId );

					if( $section.length != 0 ){
						e.preventDefault();
						var positionToTop = $section.offset().top,
							topOffset = $link.data('offset');

						// Check if link has offset
						if( topOffset ){
							positionToTop = positionToTop + topOffset;
						}
						// Scroll to element
						$( 'html, body').animate( {scrollTop: positionToTop }, 'slow' );
					}
			});
		},
		changePaginationLink: function() {
			var currentPagination = $(this).closest('.hg-pagination');
			currentPagination.find('.hg-pagination__item--current').removeClass('hg-pagination__item--current');
			$(this).addClass('hg-pagination__item--current');
		},
		changeQuantity: function() {
			var input = $(this).closest('.hg-quantity__group').find('#quantity');
			var currentQuant = input.val();
			var convertQuant = parseInt(currentQuant);
			var btn = $(this).hasClass('glyphicon-plus');
			if (btn === true) {
				currentQuant = convertQuant + 1;
			} else {
				currentQuant = ((convertQuant !== 1) ? convertQuant - 1 : convertQuant);
			}
			input.val(currentQuant);
		},
		removeShopItem: function() {
			$(this).closest('.hg-cartList__item').remove();
		},
		addHoverRating: function() {

			$(this).nextAll().removeClass('hg-productRating__star--selected');
			$(this).prevAll().addClass('hg-productRating__star--selected');
			$(this).addClass('hg-productRating__star--selected');

		},
		changeProductsDispaly: function() {
			var dispaly = $(this).attr('data-display');
			$('.hg-shopArchive').attr('data-col', dispaly);

		},
		enableRangeSlider: function() {
			var range = document.getElementById('range-filter');
			if (range !== null) {
				var moneyFormat = wNumb({
					decimals: 0,
					thousand: ',',
					prefix: '$'
				});
				noUiSlider.create(range, {
					start: [16, 200],
					step: 1,
					range: {
						'min': [16],
						'max': [230]
					},
					format: moneyFormat,
					connect: true
				});

				// Set visual min and max values and also update value hidden form inputs
				range.noUiSlider.on('update', function(values, handle) {
					$('#range-filter-value1').text(values[0]);
					$('#range-filter-value2').text(values[1]);
					$("[name = 'min-value']").val(moneyFormat.from(
						values[0]));
					$("[name = 'max-value']").val(moneyFormat.from(
						values[1]));
				});
			}
		},
		enableGridGallery: function() {
			$('.hg-gridGallery').each(function( i, el ){
				var item = $(el).find('.hg-gridItem');
				$(el).masonry({
						itemSelector: '.hg-gridItem__Wrapp',
						columnWidth: '.hg-gridItem__Wrapp',
						horizontalOrder: true
				});
			});
		},
		enablePopupGallery: function() {
			$('.hg-popupGallery').each(function() {
					$(this).magnificPopup({
							delegate: 'a',
							type: 'image',
							gallery: {
								enabled:true
							}
					});
			});
		},
		addAnimations: function() {
			template.hasAnimation.each(template.startAnimations);
		},
		startAnimations: function(index, el) {
			var itemIsReached = template.isScrolledIntoView(el);
			if (itemIsReached) {

				var animationType = $(this).attr("data-animationType");
				var animationDuration = $(this).attr("data-animationDuration");
				var animationDelay = $(this).attr("data-animationDelay");

				if (!$(this).hasClass('is-animating')) {

				$(this).css({"animation-duration": animationDuration,
							"animation-name":animationType,
							"animation-delay":animationDelay});
				}
				$(this).addClass('is-animating');
			}
		},
		expandForm: function() {
			$(this).closest('.hg-bookPanel').addClass('hg-bookPanel--expanded');
			$(this).closest('.hg-bookPanel').find('.hg-form-component--hidded').each(function() {
				$(this).removeClass('hg-form-component--hidded');
			});
		},
		changeInputLabel: function() {
			var inputValue = $(this).val();
			if(inputValue !== '') {
				$(this).addClass('hasContent');
			} else {
				$(this).removeClass('hasContent');
			}
		},
		enableMailchimpForm: function(){
			$('.hg-newsletter').on('submit', function(event){

				// Prevent the default
				event.preventDefault();

				var responseContainer = $(this).find('.hg-newsletter-message');

				// Clear the message container
				responseContainer.html('').removeClass('has-error is-valid');

				var data = {};
				var dataArray = $(this).serializeArray();
				$.each(dataArray, function (index, item) {
					data[item.name] = item.value;
				});

				var url = $(this).find('.hg-newsletter-form').attr('action').replace('/post?', '/post-json?').concat('&c=?');

				$.ajax({
					url: url,
					data: data,
					cache       : false,
					dataType: 'jsonp',
					error: function(data){
						alert('There was an error submitting your request. Please try again in a few minutes.');
					},
					success: function(data){
						if( data.result.length ){
							if( data.result == 'error' ){
								responseContainer.html( data.msg ).addClass('has-error');
							}
							else if( data.result == 'success' ){
								responseContainer.html( data.msg ).addClass('is-valid');
							}
						}
						else{
							alert('There was an error submitting your request. Please try again in a few minutes.');
						}
					}
				});
			});
		},
		openActivePanel: function() {
			var $tabTrigger = $(this),
					panelsContainer = $tabTrigger.closest('.hg-tabs'),
					activeTab = $( '.' + $tabTrigger.attr('data-tab') );

			// Get active tabs
			var newActive = $tabTrigger.add( activeTab );
			// Remove currently active tabs
			panelsContainer.find('.activeTab').removeClass('activeTab');

			// Set the new tab as active
			newActive.addClass('activeTab');
		},
		initContactForm: function() {
			var contactForm = $('.hg-contactform');
			if( contactForm.length === 0 ){
				return;
			}
			contactForm.on('submit', function(e) {
				e.preventDefault();
				e.stopPropagation();

				var self = $(this),
					submitButton = self.find('.hg-submitcontact');

				//#! Disable repetitive clicks on the submit button. Prevents postbacks
				self.addClass('js-disable-action');
				submitButton.addClass('js-disable-action');

				//#! Redirect to the specified url on success, ONLY if a url is present in the input value
				var redirectToInput = self.find('.hg-redirect-to'),
					redirectTo = ( typeof(redirectToInput) != 'undefined' ? redirectToInput.val() : '' ),
					//#! Holds the reference to the wrapper displaying the result message
					responseWrapper = self.find('.form-message');

				//#! Clear message
				responseWrapper.empty().hide();

				var fields = self.find('input'),
					textareas = self.find('textarea');

				var data = {
					'isAjaxForm': true
				};
				fields.each(function(i, field){
					data[field.name] = $(field).val();
				});

				// Textarea values cannot be read with val()
				textareas.each(function(i, field){
					data[field.name] = $(field).text();
				});

				//#! Execute the ajax request
				$.ajax({
					url: self.attr('action'),
					method: 'POST',
					cache: false,
					timeout: 20000,
					async: true,
					data: data
				}).done(function(response){
					responseWrapper.removeClass('js-response-success js-response-error');
					if(response && typeof(response.data) != 'undefined' ) {
						responseWrapper.empty();
						if( ! response.success ){
							responseWrapper.addClass('js-response-error');
							$.each( response.data, function(i, err) {
								responseWrapper.append('<p>'+err+'</p>');
							});
						}
						else {
							responseWrapper
								.addClass('js-response-success')
								.append('<p>'+response.data+'</p>');
							//#! Clear the form
							self.find('.hg-input').val('');
							//#! Redirect on success (maybe to a Thank you page, whatever)
							if( redirectTo.length > 0 ){
								window.setTimeout(function(){
									window.location.href = redirectTo;
								}, 2000);
							}
						}
						responseWrapper.fadeIn();
					}
					else {
						responseWrapper.removeClass('js-response-success');
						responseWrapper.empty().addClass('js-response-error').append('<p>An error occurred. Please try again in a few seconds.</p>').fadeIn();
					}
				}).fail(function(txt, err){
					responseWrapper.empty().addClass('js-response-error').append('<p>An error occurred: '+txt+' Err:'+err+'. Please try again in a few seconds.</p>').fadeIn();
				}).always(function() {
					self.removeClass('js-disable-action');
					submitButton.removeClass('js-disable-action');
				});
			});
		},
		initCounterElement: function() {
			var counterElement = $('.hg-counterElement'),
			itemIsReached;

			counterElement.each(function(){
				var $el = $(this);

				$(window).scroll(function(){
					itemIsReached = template.isScrolledIntoView($el);
					if (itemIsReached) {
						if( $el.hasClass( 'hg-didAnimation' ) ){
							return true;
						}
						$el.addClass( 'hg-didAnimation' );
						$el.data('countToOptions', {
							formatter: function (value, options) {
								return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
							}
						});
						var options = $.extend({}, options || {}, $el.data('countToOptions') || {});
						$el.countTo(options);
					}
				}).trigger('scroll');
			});
		},
		isScrolledIntoView: function(elem) {

			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
			var offset = 600;

			return ((elemBottom <= docViewBottom + offset) && (elemTop >= docViewTop - offset));
		},
		initSlider: function() {
			var self = this;
			self.homepageSider.slick({
				infinite: true,
				arrows: true,
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				nextArrow: '<span class="hg-icon-slider-next"></span>',
				prevArrow: '<span class="hg-icon-slider-prev"></span>',
			});
			self.teamSlider.slick({
				infinite: true,
				arrows: true,
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				dots: true
			});
			self.mapSlider.slick({
				infinite: true,
				arrows: true,
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				dots: true,
				nextArrow: '<span class="hg-icon-arrow-right"></span>',
				prevArrow: '<span class="hg-icon-arrow-left"></span>',
			});
			self.quoteSlider.slick({
				infinite: true,
				arrows: false,
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true
			});
			self.featureSlider.slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				nextArrow: '<span class="hg-icon-arrow-right2"></span>',
				prevArrow: '<span class="hg-icon-arrow-left2"></span>',
				responsive: [
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true
						}
					}
				]
			});
			$('.hg-shopSlider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.hg-shopSlider-nav'
			});
			$('.hg-shopSlider-nav').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor: '.hg-shopSlider',
				centerMode: true,
				focusOnSelect: true,
				arrows: true,
				vertical: true,
				nextArrow: '<span class="hg-icon-arrow-down"></span>',
				prevArrow: '<span class="hg-icon-arrow-up"></span>',
				infinite: true
			});
		},
		toggleAccordion: function(e) {

			$(document).on('click', '.hg-accordion__title', function(){
				var accordionContainer = $(this).closest('.hg-accordion'),
						openedAccordions = accordionContainer.find( '.is-opened' ),
						openedContent = openedAccordions.find('.hg-accordion__content'),
						newAccordionGroup  = $(this).closest('.hg-accordion__group'),
						newAccordionContent = newAccordionGroup.find('.hg-accordion__content');

				// Close existing accordions
				openedContent.slideUp(500);
				openedAccordions.removeClass('is-opened');

				// Open the existing panel
				newAccordionContent.slideDown(500);
				newAccordionGroup.addClass('is-opened');
			});
		},
		triggerMenu: function(e) {
			e.preventDefault();

			if($(this).hasClass('is-active')){
				template.CloseMenu();
			}
			else {
				template.OpenMenu();
			}
		},
		triggerSubMenu: function(e) {
			$(this).closest('.hg-res-submenu').find('.hg-subMenu').addClass('hg-menu--visible');
		},
		CloseMenu: function() {
			$(this).closest('ul').removeClass('hg-menu--visible');
			template.menuBurger.removeClass('is-active');
			template.removeMenuHeight();
		},
		OpenMenu: function() {
			template.rezMenu.addClass('hg-menu--visible');
			template.menuBurger.addClass('is-active');
			template.setMenuHeight();
		},
		setMenuHeight: function() {
			var _menu = $('.hg-menu--visible').last(),
			window_height  = $(window).height(),
			height = _menu.css({window_height:'auto'});
			template.pageWrapper.css({'height':height});
		},
		removeMenuHeight: function() {
			template.pageWrapper.css({'height':'auto'});
		},
		openSearchBox: function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).find('span').removeClass('glyphicon-remove');
				$(this).closest('.hg-search').find('.hg-search-container').removeClass('panel-opened');
			} else {
				$(this).addClass('active');
				$(this).find('span').addClass('glyphicon-remove');
				$(this).closest('.hg-search').find('.hg-search-container').addClass('panel-opened');
			}
		},
		totopButton: function() {
			var self = this;

			/* Show totop button*/
			$(window).scroll(function(){
				var toTopOffset = self.toTop.offset().top;
				var toTopHidden = 1000;
				if (toTopOffset > toTopHidden) {
					self.toTop.addClass('totop-vissible');
				} else {
					self.toTop.removeClass('totop-vissible');
				}
			});

			/* totop button animation */
			if(self.toTop && self.toTop.length > 0){
				self.toTop.on('click',function (e){
					e.preventDefault();
					$( 'html, body').animate( {scrollTop: 0 }, 'slow' );
				});
			}
		}
	};
	template.init();
})();
