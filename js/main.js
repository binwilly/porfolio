
(function($) {
  var app = $.sammy(function() {
  	this.use('Template');

    this.get('#/', function() {
      $('#content').text('Home');
      //this.('templates/home.template');
    });

    this.get('#/gallery', function() {
      $('#content').text('Hello World');
    });

	this.get('#/about', function() {
      $('#content').text('About');
    });

  });

  $(function() {
    app.run('#/')
  });
})(jQuery);