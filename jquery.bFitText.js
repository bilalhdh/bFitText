(function ($) {
    $.fn.bFitText = function (factor) {
        return this.each(function () {
            var $this = $(this);
            //
            var update_font_size = function (factor) {
                //we need this timeout since browser may put scroll then remove it so size change, so we wait this small timeout
                //till the browser be fixed & remove or add scrll after browser finish re-painting
                setTimeout(function () {
                    //in some browser when we put a too large font-size the clone_div will kept at a fixed width that 
                    //will not return bigger anymore while other browser may return wrong width like a small wrong width
                    var tmp_size = 1000 * (factor || 0.8);
                    var clone_div = $("<div></div>").css({
                        'visibility': 'hidden'  //hides the element
                        , 'font-size': tmp_size + 'px'
                        , 'white-space': 'nowrap'
                        , 'display': 'inline-block'   //must be display inline block so width auto change as text changed
                        //here we must later if we use anything else related to font we must set it here also
                        , 'font-family': $this.css('font-family')
                        , 'font-weight': $this.css('font-weight')
                        , 'text-transform': $this.css('text-transform')
                    }).html($this.html()).appendTo('body');
                    //we need the chile width without margin/border/padding
                    var w_ratio = $this.width() / clone_div.width();
                    clone_div.remove();
                    var new_size = Math.floor(w_ratio * tmp_size);
                    $this.css({
                        'font-size': Math.floor(new_size) + 'px'
                        , 'white-space': 'nowrap'
                    });
                }, 100);
            };
            //call it initially at load
            update_font_size(factor);
            //on browser resize or tablete/mobile orientation change update font size
            $(window).on('resize.bFitText orientationchange.bFitText', function () {
                update_font_size(factor);
            });
        });
    };
})(jQuery);
