define(["text!./weather.html"], function (html) {
	function refresh () {
		var that = this;

		$.getJSON(this.config._url + '&callback=?', function (weather) {
			weather = weather["query"]["results"]["channel"];

			var today = weather["item"]["forecast"][0],
				tomorrow = weather["item"]["forecast"][1];

			[today, tomorrow].forEach(function (item) {
				for (var i in that.config._weather) {
					if (!that.config._weather.hasOwnProperty(i)) {
						continue;
					}

					if (that.config._weather[i].indexOf(parseInt(item.code, 10)) >= 0) {
						item.className = 'widget-weather-' + i;
						break;
					}
				}

				item.low = Math.round((item.low - 32) / 1.8);
				item.high = Math.round((item.high - 32) / 1.8);
			});

			that.element.html(that.html.render({
				city: weather["location"]["city"],
				today: [today],
				tomorrow: [tomorrow]
			}));
		});

		return 30;
	}

	function init() {
		var woeid = (typeof this.config.woeid !== "undefined") ? this.config.woeid : '20066558';
		this.config._url = 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20woeid%20%3D%20' + woeid + '&format=json';

		this.config._weather = {
			storm: [0, 1, 2, 3, 4, 23, 24, 37, 38, 39, 45, 47],
			snow: [5, 7, 14, 13, 15, 16, 17, 41, 42, 43, 46],
			rain: [6, 10, 11, 12, 18, 35],
			drizzle: [8, 9, 40],
			cloudy: [19, 20, 22, 26, 25, 27, 28, 21],
			'cloudy-sunny': [29, 30, 44],
			sunny: [32, 33, 34, 36, 31]
		};

		this.refresh();
	}

	return {
		html: Hogan.compile(html),
		css: 'weather.css',
		refresh: refresh,
		init: init,
		configForm: {
			woeid: {type: 'text'}
		}
	};
});