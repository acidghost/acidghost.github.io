/**
 * Created by acidghost on 25/05/14.
 */

jQuery.githubUser = function(username, callback) {
	jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
};

jQuery.fn.loadRepositories = function(username) {
	this.html('<span>Querying GitHub for ' + username +'"s repositories...</span>');

	var target = this;
	$.githubUser(username, function(data) {
		var repos = data.data; // JSON Parsing
		if(data.meta.status != '200') {
			repos = [
				{
					name: 'bearded-wookie',
					language: 'JavaScript',
					homepage: 'nan',
					description: 'Provola'
				},
				{
					name: 'geowiki',
					language: 'JavaScript',
					homepage: 'nan',
					description: 'Provola'
				}
			];
		}
		sortByName(repos);

		target.empty();
		$(repos).each(function() {
			if (this.name != (username.toLowerCase()+'.github.com')) {
				target.append('<div class="row">' +
					'<div class="col-sm-4">' +
					'<h2><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a></h2>' +
					'<h3>'+(this.language?('('+this.language+')'):'')+'</h3>' +
					'<p>'+(this.description||'Nothing to say here...')+'</p>' +
					'</div>' +
					'<div class="col-sm-8"><iframe src="http://hopping-rabbit.herokuapp.com/charts/bar/'+username+'/'+this.name+'" class="chart"></iframe></div>' +
					'</div>');
				target.append('<hr />');
			}
		});
	});

	function sortByName(repos) {
		repos.sort(function(a,b) {
			return a.name - b.name;
		});
	}
};

$(document).ready(function() {

	$('#repos').loadRepositories('acidghost');

	$('a').not('#side-nav a').click(function(e) {
		e.preventDefault();
		e = $(e.target);
		if(e.attr('href').indexOf('#') == -1) {
			$('body').addClass('fade');
			window.setTimeout(function() {
				window.location = e.attr('href');
			}, 500);
		}
	});

	function spectrum(){
		var colors = [
			'rgb(256,0,0)', //red
			'rgb(0,256,0)', //green
			'rgb(0,0,256)', //blue
			'rgb(256,256,0)', //orange
			'rgb(256,0,256)', //magenta
			'rgb(0,256,256)']; //cyan
		var hue1 = colors[(Math.floor(Math.random() * colors.length))];
		var hue2 = colors[(Math.floor(Math.random() * colors.length))];

		$('.navbar-brand').css('color', hue1);
		$('.description').css('color', hue2);
	}
	spectrum();
	window.setInterval(spectrum, 5000);

	window.setInterval(function() {
		if($('#intro-sec').hasClass('green')) {
			$('#intro-sec').removeClass('green');
		} else {
			$('#intro-sec').addClass('green');
		}
	}, 2000);

	$('body').scrollspy({
		target: '#side-nav'
	});

	// Animated scroll
	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
		}
	});

	// Footer stick to bottom if body height is less than inner window height
	if($('body').height() < window.innerHeight) {
		$('footer').addClass('navbar-fixed-bottom');
	}

});
