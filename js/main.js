require.config({
    "packages": [
    	"widgets/calendar",
    	"widgets/datetime",
    	"widgets/redmine",
    	"widgets/traffic",
    	"widgets/twitter",
    	"widgets/weather"
    ]
});

define(function () {
	var defaultWidgets = [["widgets/datetime"], ["widgets/twitter"]],
		refreshQueueInterval = 1000,
		$wrapper = $("body"),

		widgetConfig = JSON.parse(localStorage.getItem("widgets")) || defaultWidgets,
		widgetsCount = widgetConfig.length,
		widgetsReady = 0,
		cssFiles = [],

		widgets = [],
		refreshQueue = [[]];
		
	function refreshQueueFunc () {
		refreshQueue.shift().forEach(function (id) {
			if (typeof widgets[id] === "undefined") {
				return;
			}

			var widget = widgets[id],
				// Execute refresh
				next = widget.refresh.apply(widget);

			// Re-fill queue
			for (var i = 0; i <= next; i++) {
				if (typeof refreshQueue[i] === "undefined") {
					refreshQueue[i] = [];
				}
			}

			refreshQueue[next].push(id);
		});

		// Prevent empty queue
		if (typeof refreshQueue[0] === "undefined") {
			refreshQueue[0] = [];
		}

		setTimeout(refreshQueueFunc, refreshQueueInterval);
	}

	// Pre-fill wrapper element
	var html = '';
	widgetConfig.forEach(function (item, i) {
		name = item[0];
		html += '<section class="widget ' + name.replace(/s\//, '-') + '" id="widget-' + i + '"><div></div></section>';
	});
	$wrapper.append(html);

	// Obtain widget classes
	widgetConfig.forEach(function (item, i) {
		name = item[0];
		// Ugly bugfix, shame on me (or shame on require.js for not letting me pass static callback arguments)
		define('widget-config-' + i, {
			i: i,
			name: name,
			config: item[1] || {}
		});

		require([name, 'widget-config-' + i], function (widget, config) {
			widget.id = config.i;
			widget.name = config.name;
			widget.config = config.config;

			widget.element = $('#widget-' + widget.id).children('div');

			// Add css files
			if (typeof widget.css !== "undefined") {
				if (!$.isArray(widget.css)) {
					widget.css = [widget.css];
				}

				widget.css.forEach(function (file) {
					cssFiles.push("js/" + widget.name + "/" + file);
				});
			}

			// Add widget to widgets array
			widgets[widget.id] = widget;

			// Execute initialization function
			if (typeof widget.init !== "undefined") {
				widget.init.apply(widget);
			}

			// Add widget to first queue
			if (typeof widget.refresh !== "undefined") {
				refreshQueue[0].push(widget.id);
			}

			// All widgets finished?
			widgetsReady++;
			if (widgetsReady === widgetsCount) {
				// inject css into head
				var html = '';
				cssFiles.forEach(function (file) {
					html += '<link rel="stylesheet" href="' + file + '" />';
				})
				$("head").append(html);

				// Start queue
				setTimeout(refreshQueueFunc, refreshQueueInterval);
			}
		});
	});

	delete widgetConfig;
	delete cssFiles;
});