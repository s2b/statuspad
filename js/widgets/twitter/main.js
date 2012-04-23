define(["text!./twitter.html"], function (html) {
	function refresh () {
		var that = this;

		$.getJSON(this.config._url + '&callback=?', function (tweets) {
			if (mode === 'search') {
				tweets = tweets.results;
			}
			
			that.element.html(that.html.render({
				'tweets?': tweets.length,
				tweets: tweets
			}));
		});

		return 30;
	}

	function init() {
		var count = (typeof this.config.count !== "undefined") ? parseInt(this.config.count, 10) : 10,
			url;

		if (typeof this.config.url !== "undefined" && this.config.url) {
			url = this.config.url;
			mode = 'url';
		} else if (typeof this.config.list !== "undefined" && this.config.list) {
			if (typeof this.config.user !== "undefined" && this.config.user) {
				url = 'https://api.twitter.com/1/lists/statuses.json?slug=' + encodeURIComponent(this.config.list) + '&owner_screen_name=' + encodeURIComponent(this.config.user);
			} else {
				url = 'https://api.twitter.com/1/lists/statuses.json?list_id=' + encodeURIComponent(this.config.list);
			}
			url += '&count=' + count + '&include_entities=1';
			mode = 'list';
		} else if (typeof this.config.user !== "undefined" && this.config.user) {
			url = 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + encodeURIComponent(this.config.user) + '&count=' + count + '&include_entities=1';
			mode = 'user';
		} else if (typeof this.config.search !== "undefined" && this.config.search) {
			url = 'http://search.twitter.com/search.json?q=' + encodeURIComponent(this.config.search) + '&include_entities=1&rpp=' + count;
			mode = 'search';
		}

		if (typeof url === "undefined") {
			url = 'http://api.twitter.com/1/statuses/public_timeline.json?include_entities=1&count=' + count;
			mode = 'public';
		}

		this.config._url = url;
		this.config._mode = mode;

		this.refresh();
	}

	return {
		html: Hogan.compile(html),
		css: 'twitter.css',
		refresh: refresh,
		init: init,
		configForm: {
			user: {type: 'text'},
			list: {type: 'text'},
			search: {type: 'text'},
			count: {type: 'number', default: 10},
			url: {type: 'url'}
		}
	};
});