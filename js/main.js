
var PROFILE_WEB = {};

PROFILE_WEB.content_one = '#content-one';
PROFILE_WEB.content_two = '#content-two';

PROFILE_WEB.nextContent = function() {
	if ($(this.content_one).html().length == 0) {
		return this.content_one;
	} else {
		return this.content_two;
	}
};

PROFILE_WEB.changePage = function(content_to_show) {
	$(content_to_show).addClass('page-visible');

	if (content_to_show === PROFILE_WEB.content_one) {
		$(PROFILE_WEB.content_one).show();
		$(PROFILE_WEB.content_two).hide();
		$(PROFILE_WEB.content_two).empty();
		$(PROFILE_WEB.content_two).removeClass('page-visible');
	} else {
		$(PROFILE_WEB.content_two).show();
		$(PROFILE_WEB.content_one).hide();
		$(PROFILE_WEB.content_one).empty();
		$(PROFILE_WEB.content_one).removeClass('page-visible');
	}
};

// Place any jQuery/helper plugins in here.

(function($) {
  var app = $.sammy(function() {
    this.use('Template');
    console.log(PROFILE_WEB.nextContent());

    this.get('#/', function() {
    	this.element_selector = PROFILE_WEB.nextContent();
        this.render('./templates/home.template').replace(this.element_selector);
        PROFILE_WEB.changePage(this.element_selector);
     });

    this.get('#/gallery', function() {
    	this.element_selector = PROFILE_WEB.nextContent();
    	console.log(PROFILE_WEB.nextContent());
        this.render('./templates/gallery.template').replace(this.element_selector);
        PROFILE_WEB.changePage(this.element_selector);
    });

    this.get('#/about', function() {
    	this.element_selector = PROFILE_WEB.nextContent();
    	console.log(PROFILE_WEB.nextContent());
        $(PROFILE_WEB.nextContent()).text('About');
        PROFILE_WEB.changePage(this.element_selector);
    });

  });

  $(function() {
        app.run('#/')
  });
})(jQuery);