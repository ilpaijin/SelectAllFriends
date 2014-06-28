"use strict";

(function(window, document)
{
    /**
     * [fbDom description]
     * @type {Object}
     */
    var fbDom = {
        wrapper: document.querySelectorAll('.fbProfileBrowser')[0],
        container: document.querySelectorAll('.fbProfileBrowserResult')[0]
    };
    fbDom.scrollable = fbDom.container.childNodes[0];

    /**
     * [spinner description]
     * @type {Object}
     */
    var spinner = {
        imgPath: "http://whatshouldiplay.net/img/spinner.gif",
        el: null,
        parentNode: null,
        create: function()
        {
            this.el = document.createElement("div");
            this.addStyles();
            return this;
        },
        addStyles: function()
        {
            this.el.style.background = "url('"+this.imgPath+"') no-repeat center center";
            this.el.style.height = "66px";
            this.el.style.width = "66px";
            this.el.style.position = "absolute";
            this.el.style.top = "166px";
            this.el.style.left = "252px";
        },
        insertIntoDOM: function(parentNode)
        {
            this.parentNode = parentNode;
            this.parentNode.insertBefore(this.el, this.parentNode.childNodes[0]);
        },
        removeFromDom: function()
        {
            this.parentNode.removeChild(this.el);
        }
    }    


    /**
     * [Saf description]
     * @param {[type]} obj [description]
     */
    function Saf(obj)
    {
        /**
         * [dom description]
         * @type {[type]}
         */
        this.dom = obj.dom;

        /**
         * [spinner description]
         * @type {[type]}
         */
        this.spinner = obj.spinner;

        /**
         * [options description]
         * @type {Object}
         */
        this.options = {
            removeDisabled: false,
            checkableItemsClassname: 'checkableListItem',
            checkableItemsClass: '.checkableListItem',
            disabledItemsClassname: 'disabledCheckable'
        }

        /**
         * [having description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        this.having = function(options)
        {
            for (var opt in options)
            {
                if(this.options.hasOwnProperty(opt))
                {
                    this.options[opt] = options[opt];
                }
            }
            
            return this;
        }

        /**
         * [startLoading description]
         * @return {[type]} [description]
         */
        this.startLoading = function()
        {
            this.dom.container.style.opacity = "0.3";
            this.spinner.create().insertIntoDOM(this.dom.wrapper);
        }

        /**
         * [endLoading description]
         * @return {[type]} [description]
         */
        this.endLoading = function()
        {
            this.spinner.removeFromDom();
            this.dom.container.style.opacity = "1"; 
        }

        /**
         * [selectFriends description]
         * @return {[type]} [description]
         */
        this.selectFriends = function()
        {
            var scrollId = setInterval((function(self){ 
                return function()
                {
                    if( self.dom.container.scrollTop < self.dom.scrollable.clientHeight - self.dom.container.clientHeight)
                    {
                        self.dom.container.scrollTop = self.dom.scrollable.clientHeight - self.dom.container.clientHeight
                    } 
                    else 
                    {
                        clearInterval(scrollId);

                        self.checkThemAll();

                        self.endLoading(); 
                    }
                }; 
            })(this), 1000);
        }

        /**
         * [checkThemAll description]
         * @return {[type]} [description]
         */
        this.checkThemAll = function()
        {
            if(this.options.removeDisabled)
            {
                this.removeDisabledFromDom();
            }

            for (var x = 0, list = this.dom.scrollable.querySelectorAll(this.options.checkableItemsClass); x < list.length; x++) 
            {
                var className = list[x].className;

                if(className.indexOf(this.options.checkableItemsClassname) > -1 && className.indexOf(this.options.disabledItemsClassname) == -1)
                {
                    list[x].querySelectorAll('.checkbox')[0].click();  
                }
            }   
        };

        /**
         * [removeDisabledFromDom description]
         * @return {[type]} [description]
         */
        this.removeDisabledFromDom = function()
        {
            for (var x = 0, list = this.dom.scrollable.querySelectorAll(this.options.checkableItemsClass); x < list.length; x++) 
            {
                if(list[x].className.indexOf(this.options.disabledItemsClassname) > -1)
                {
                    list[x].parentNode.removeChild(list[x]);
                } 
            } 
        };

        /**
         * [run description]
         * @return {[type]} [description]
         */
        this.run = function()
        {
            this.startLoading();

            this.selectFriends();
        }
    }

    //////////////////////////
    // ***** Instance ***** //
    //////////////////////////
    var saf = new Saf({
        dom: fbDom,
        spinner: spinner
    });

    /////////////////////
    // ***** Run ***** //
    /////////////////////
    saf.having({
        removeDisabled: true
    }).run();

})(window, document);


