/**
 * Created by acidghost on 25/05/14.
 */

jQuery.githubUser = function(username, callback) {
	jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
	this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");

	var target = this;
	$.githubUser(username, function(data) {
		var repos = data.data; // JSON Parsing
		sortByName(repos);

		var list = $('<dl/>');
		target.empty().append(list);
		$(repos).each(function() {
			if (this.name != (username.toLowerCase()+'.github.com')) {
				list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
				list.append('<dd>' + this.description +'</dd>');
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

	$('a').click(function(e) {
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

});
