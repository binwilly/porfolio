
var PROFILE_WEB = {};

PROFILE_WEB.content_one = '#content-one';
PROFILE_WEB.content_two = '#content-two';


PROFILE_WEB.emptyContent = function() {
	if ($(PROFILE_WEB.content_one).html().length === 0) {
		return PROFILE_WEB.content_one;
	} else {
		return PROFILE_WEB.content_two;
	}
};

PROFILE_WEB.contentToHide = function(content_to_show) {
	return (PROFILE_WEB.content_one === content_to_show)?PROFILE_WEB.content_two:PROFILE_WEB.content_one;
};

PROFILE_WEB.changePage = function(content_to_show, side) {
	var content_to_hide = PROFILE_WEB.contentToHide(content_to_show);
	console.log('content to show: ' + content_to_show);
	console.log('content to hide: ' + content_to_hide);


	$(content_to_show).toggleClass('page-transition page-visible');

	console.log('empty: ' + content_to_hide);
	$(content_to_hide).one('webkitTransitionEnd ',
		function(e) {
			console.log('empty: ' + content_to_hide);
			$(content_to_hide).addClass('page-hidden');
			$(content_to_hide).empty();
	});

	$(content_to_hide).addClass('page-hidden');

};


// Place any jQuery/helper plugins in here.

(function($) {
	var app = $.sammy(function() {
		this.use('Template');

		this.get('#/', function() {
			this.element_selector = PROFILE_WEB.emptyContent();
			this.render('./templates/home.template').replace(this.element_selector);
			options = {'selector': this.element_selector, 'direction':'left'};
			this.trigger('swipe-page', options);
		});

		this.get('#/gallery', function() {
			this.element_selector = PROFILE_WEB.emptyContent();
			//console.log(PROFILE_WEB.emptyContent());
			this.render('./templates/gallery.template').replace(this.element_selector);
			options = {'selector': this.element_selector, 'direction':'bottom'};
			this.trigger('swipe-page', options);
		});

		this.get('#/about', function() {
			this.element_selector = PROFILE_WEB.emptyContent();
			//console.log(PROFILE_WEB.emptyContent());
			$(PROFILE_WEB.emptyContent()).text('About');
			options = {'selector': this.element_selector, 'direction':'right'};
			this.trigger('swipe-page', options);
		});

		this.bind('swipe-page', function(event, options) {
			console.log(options);
			PROFILE_WEB.changePage(this.element_selector, options);
		});

	});

	$(function() {
		app.run('#/')
	});
})(jQuery);