(function(global) {
    var eventDealer = global.eventDealer;
    var base = global.base;

    function CleverScroll(scrollContainer) {
        init(this, scrollContainer);

        if (!CleverScroll.prototype._init) {
            base.extend({
                _init: true,
                destroy: function() {
                    this._scrollContainer.removeEventListener(
                        'DOMNodeInserted',
                        this._DOMNodeInserted
                    );
                    this._DOMNodeInserted = null;

                    this._scrollContainer.removeEventListener(
                        'scroll',
                        this._scroll
                    );
                    this._scroll = null;
                },
                scrollToBottom: function() {
                    scrollToBottom(this._scrollContainer);
                }
            }, eventDealer);
        }

        function init(_this, scrollContainer) {
            _this._scrollContainer = scrollContainer;

            _this._scrollContainer.addEventListener(
                'DOMNodeInserted',
                DOMNodeInserted
            );
            _this._DOMNodeInserted = DOMNodeInserted;

            _this._scrollContainer.addEventListener(
                'scroll',
                scroll
            );
            _this._scroll = scroll;

            function scroll() {
                if (atBottom(_this._scrollContainer)) {
                    _this.trigger('bottom');
                }
            }

            function DOMNodeInserted(event) {
                var con = _this._scrollContainer;
                if (atBottom(con, event.target)) {
                    scrollToBottom(con);
                }
            }
        }

        function atBottom(con, newElement) {
            if (newElement) {
                return con.scrollHeight - con.offsetHeight - con.scrollTop === newElement.offsetHeight;
            }
            return con.scrollHeight - con.offsetHeight - con.scrollTop === 0;
        }

        function scrollToBottom(con) {
            con.scrollTop = con.scrollHeight - con.offsetHeight;
        }
    }

    global.createCleverScroll = function(scrollContainer) {
        return new CleverScroll(scrollContainer);
    };

})((window.WEBUI = window.WEBUI || {}, window.WEBUI));