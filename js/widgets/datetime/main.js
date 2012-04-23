define(["text!./datetime.html", "moment"], function (html) {
	var date, time, hours, minutes, seconds, counter;
	
	function refresh() {
		if (counter >= 3600) {
			init();
		}
		var now = moment(),
			data = {
				date:		now.format('ddd, D. MMMM YYYY'),
				time:		now.format('H:mm:ss'),
				hours:		now.format('h'),
				minutes:	now.format('m'),
				seconds:	now.format('s')
			};
		date.text(data.date);
		time.text(data.time);
		
		counter++;
		
		return 0;
	}
	
	function init() {
		var now = moment(),
			data = {
				date:		now.format('ddd, D. MMMM YYYY'),
				time:		now.format('H:mm:ss'),
				hours:		now.format('h'),
				minutes:	now.format('m'),
				seconds:	now.format('s')
			};
		
		counter = 0;
		
		data.hourDeg = getHourDeg(data.hours, data.minutes);
		data.minuteDeg = getMinuteDeg(data.minutes);
		data.secondDeg = getSecondDeg(data.seconds);
		
		this.element.html(this.html.render(data));
		
		// cache DOM nodes
		date = this.element.find('.widget-datetime-date');
		time = this.element.find('.widget-datetime-time');
		hours = this.element.find('.widget-datetime-hours');
		minutes = this.element.find('.widget-datetime-minutes');
		seconds = this.element.find('.widget-datetime-seconds');
		
		// set analog clock to the right position
		hours.css('-webkit-transform', 'rotate(' + data.hourDeg + 'deg)');
		minutes.css('-webkit-transform', 'rotate(' + data.minuteDeg + 'deg)');
		
		seconds
			.css({
				'-webkit-transform':	'rotate(' + data.secondDeg + 'deg)',
				'-webkit-transition':	'-webkit-transform ' + (60 - data.seconds) + 's linear 0s'
			})
			.on('webkitTransitionEnd', function() {
				seconds.css('-webkit-transition', '-webkit-transform 0s linear 0s');
				setTimeout(function() {
					now = moment(),
					data = {
						hours:		now.format('h'),
						minutes:	now.format('m'),
						seconds:	now.format('s')
					};
					data.hourDeg = getHourDeg(data.hours, data.minutes);
					data.minuteDeg = getMinuteDeg(data.minutes);
					data.secondDeg = getSecondDeg(data.seconds);
					
					console.log(data.secondDeg);
					
					hours.css('-webkit-transform', 'rotate(' + data.hourDeg + 'deg)');
					minutes.css('-webkit-transform', 'rotate(' + data.minuteDeg + 'deg)');
					seconds.css('-webkit-transform', 'rotate(0deg)');
					
					setTimeout(function() {
						seconds.css('-webkit-transition', '-webkit-transform 60s linear 0s');
						
						setTimeout(function() {
							seconds.css('-webkit-transform', 'rotate(360deg)');
						}, 0);
					}, 0);
				}, 0);
			});
		
		setTimeout(function() {
			seconds.css('-webkit-transform', 'rotate(360deg)');
		}, 0);
		
	}
	
	function getHourDeg(h, m) {
		return 30 * h + 30 / m;
	}
	
	function getMinuteDeg(m) {
		return 6 * m;
	}
	
	function getSecondDeg(s) {
		return 6 * s;
	}

	moment.lang('de');

	return {
		html: Hogan.compile(html),
		css: 'datetime.css',
		refresh: refresh,
		init: init
	};
});