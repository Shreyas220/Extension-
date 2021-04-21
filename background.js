chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    console.log(url);
    // use `url` here inside the callback because it's asynchronous!
});
$(document).ready(function() {
    var start = new Date();
  
    $(window).unload(function() {
        var end = new Date();
        $.ajax({ 
          url: "log.php",
          data: {'timeSpent': end - start},
          async: false
        })
     });
  });


  // read mozilla docs for more info on browser extention APIs
  // window.onCreated/onRemoved
  // window.getCurrent().tabInfo
