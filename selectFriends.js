chrome.browserAction.onClicked.addListener(function(tab)
{
    var fat = chrome.tabs.executeScript(
        null, 
        {file:"contentscript.js"}, 
        function(a, b)
        {
            // var msg = {
            //     'a:' a,
            //     'b': b,
            //     'c': "ciao"
            // };

            // chrome.browserAction.setPopup({
            //     "popup": "result.html"
            // });
            // chrome.runtime.sendMessage(msg);
        }
    );
});
