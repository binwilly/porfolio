
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

PROFILE_WEB.changePage = function(options) {
	var element_to_hide = $(PROFILE_WEB.contentToHide(options.selector));
	var element_to_show = $(options.selector);
	console.log('show: ' + element_to_show.selector + ' hide: ' + element_to_hide.selector);

	//element_to_show.removeClass();
	element_to_show.addClass('page-swipe-' + options.direction);

	element_to_show.show();
	setTimeout(function(){
        element_to_show.removeClass();
		element_to_hide.hide();
		
    }, 100);
    
    element_to_hide.empty();
};

$('#b_action').bind('click', function() {
	$('#content-one').prepend('<div class="prepend_div">Test</div>');
});



// Place any jQuery/helper plugins in here.

(function($) {

	var app = $.sammy(function() {
		this.use('Template');
		var options = null;

		this.get('#/', function() {
			this.element_selector = PROFILE_WEB.emptyContent();
			this.render('./templates/home.template').replace(this.element_selector);
			options = {'selector': this.element_selector, 'direction':'left'};
		});

		this.get('#/gallery', function() {
			this.element_selector = PROFILE_WEB.emptyContent();
			//console.log(PROFILE_WEB.emptyContent());
			this.render('./templates/gallery.template').replace(this.element_selector);
			options = {'selector': this.element_selector, 'direction':'bottom'};
		});

		this.get('#/about', function() {
			this.element_selector = PROFILE_WEB.emptyContent();
			console.log(PROFILE_WEB.emptyContent());
			this.render('./templates/about.template').replace(this.element_selector);
			options = {'selector': this.element_selector, 'direction':'right'};
		});

		//this.bindToAllEvents(function(e) {console.log(e);});

		this.bind('swipe-page', function() {
			console.log('ahora');
		 	PROFILE_WEB.changePage(options);
		 });



	});

	

	$(function() {
		app.run('#/')
	});
})(jQuery);