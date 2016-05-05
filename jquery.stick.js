/**
* @file jQuery plugin that sticks the given fixed position element to any another element
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.0.1
* @requires jquery
*/
(function($) {
    /**
    * Get the positional data of element (e.g. top, left, width, height)
    * @method getElementBounds
    * @return {Object} element boundary data object
    */
    function getElementBounds(el) {
        var $el = $(el);
        var $window = $(window);
        var scrollTop = $window.scrollTop();
        var scrollLeft = $window.scrollLeft();
        var offset = $el.offset();
        var outerHeight = $el.outerHeight();
        var outerWidth = $el.outerWidth();

        return {
            top: offset.top - scrollTop,
            left: offset.left - scrollLeft,
            bottom: (offset.top - scrollTop) + outerHeight,
            right: (offset.left - scrollLeft) + outerWidth,
            middle: (offset.top - scrollTop) + (outerHeight / 2),
            center: (offset.left - scrollLeft) + (outerWidth / 2),
            width: outerWidth,
            height: outerHeight
        };
    }

    function alignTop($el, targetBounds, options) {
        $el.css('bottom', window.innerHeight - targetBounds.top - options.offsetTop + 'px');
    }

    function alignBottom($el, targetBounds, options) {
        $el.css('top', targetBounds.bottom + options.offsetTop + 'px');
    }

    function alignVerticalBaseline($el, targetBounds, options) {
        $el.css('bottom', window.innerHeight - targetBounds.bottom - options.offsetTop + 'px');
    }

    function alignMiddle($el, targetBounds, options) {
        var targetDeltaHeight = targetBounds.height - $el.outerHeight();
        $el.css('top', targetBounds.top + (targetDeltaHeight / 2) + options.offsetTop + 'px');
    }

    function alignLeft($el, targetBounds, options) {
        $el.css('right', window.innerWidth - targetBounds.left - options.offsetLeft + 'px');
    }

    function alignHorizontalBaseline($el, targetBounds, options) {
        $el.css('left', targetBounds.left + options.offsetLeft + 'px');
    }

    function alignRight($el, targetBounds, options) {
        $el.css('left', targetBounds.right + options.offsetLeft + 'px');
    }

    function alignCenter($el, targetBounds, options) {
        var targetDeltaWidth = targetBounds.width - $el.outerWidth();
        $el.css('left', targetBounds.left + (targetDeltaWidth / 2) + options.offsetLeft + 'px');
    }

    /**
    * jQuery plugin that sticks the given fixed position element to any another element
    *
    * @method "jQuery.fn.stick"
    * @param targetEl the target element to stick to
    * @param {Object} [options]
    * @param {number} [options.alignX]
    * @param {number} [options.alignY]
    * @param {number} [options.offsetTop]
    * @param {number} [options.offsetLeft]
    * @return {jQuery} chainable jQuery class
    */
    $.fn.stick = function(targetEl, options) {
        options = $.extend({
            alignX: 0,
            alignY: 0,
            offsetTop: 0,
            offsetLeft: 0
        }, options);

        var targetBounds = getElementBounds(targetEl);

        return this.each(function onEach() {
            var $this = $(this);

            switch (options.alignY) {
                case 0:
                case "top":
                    alignTop($this, targetBounds, options); break;
                case 1:
                case "baseline":
                    alignVerticalBaseline($this, targetBounds, options); break;
                case 2:
                case "bottom":
                default:
                    alignBottom($this, targetBounds, options); break;
                case 3:
                case "middle":
                    alignMiddle($this, targetBounds, options); break;
            }

            switch (options.alignX) {
                case 0:
                case "left":
                    alignLeft($this, targetBounds, options); break;
                case 1:
                case "baseline":
                default:
                    alignHorizontalBaseline($this, targetBounds, options); break;
                case 2:
                case "right":
                    alignRight($this, targetBounds, options); break;
                case 3:
                case "center":
                    alignCenter($this, targetBounds, options); break;
            }
        });
    };
}(jQuery));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/