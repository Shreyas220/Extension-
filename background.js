
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

  function start (){
    var start_time = new Date();

    getCurrentWindowTabs().then((tabs)=>{
        console.log(tab.url);

    })
  }

  function end(){
      var end_time = new Date();
      var timeSpent  = start_time - end_time;
        console.log(timeSpent);
    }

  //function to let a start time and url 
  document.addEventListener("DOMContentLoaded", start);
  document.addEventListener("unload", end);

  // read mozilla docs for more info on browser extention APIs
  // window.onCreated/onRemoved
  // window.getCurrent().tabInfo
