
var profilesBrowser = document.querySelectorAll('.fbProfileBrowser')[0],
    profilesResult = document.querySelectorAll('.fbProfileBrowserResult')[0],
    profilesContainer = profilesResult.childNodes[0],
    spinnergif = "http://whatshouldiplay.net/img/spinner.gif";


var spinner = {
    el: null,
    parentNode: null,
    init: function()
    {
        this.el = document.createElement("div");
        this.addStyles();
        return this;
    },
    addStyles: function()
    {
        this.el.style.background = "url('"+spinnergif+"') no-repeat center center";
        this.el.style.height = "66px";
        this.el.style.width = "66px";
        this.el.style.position = "absolute";
        this.el.style.top = "166px";
        this.el.style.left = "252px";
    },
    insertIntoDOM: function(parentNode)
    {
        profilesResult.style.opacity = "0.3";

        this.parentNode = parentNode;
        this.parentNode.insertBefore(this.el, this.parentNode.childNodes[0]);
    },
    removeFromDom: function()
    {
        this.parentNode.removeChild(this.el);
    }
}

spinner.init().insertIntoDOM(profilesBrowser);
  
var newProfilesLoop = setInterval(function()
{
    if( profilesResult.scrollTop < profilesContainer.clientHeight - profilesResult.clientHeight)
    {
        profilesResult.scrollTop = profilesContainer.clientHeight - profilesResult.clientHeight
    } 
    else 
    {
        clearInterval(newProfilesLoop);

        for (x = 0, list = profilesContainer.querySelectorAll('.checkableListItem'); x < list.length; x++) 
        {
            classes = list[x].className;
            
            if(classes.indexOf('checkableListItem') > -1 && classes.indexOf('disabledCheckable') == -1)
            {
                list[x].querySelectorAll('.checkbox')[0].click();  
            }
        } 

        spinner.removeFromDom();

        profilesResult.style.opacity = "1";    
    }

}, 1000);
