define(["text!./datetime.html", "moment"], function (html) {
	function refresh() {
		var now = moment();

		this.element.html(this.html.render({
			date: now.format('ddd, D. MMMM YYYY'),
			time: now.format('H:mm:ss')
		}));
		
		return 0;
	}

	moment.lang('de');

	return {
		html: Hogan.compile(html),
		css: 'datetime.css',
		refresh: refresh,
		init: refresh
	};
});