  
  function start (tabInfo,tabId){
    var start_time = new Date();
    console.log(tabId)
    if(tabId.status == "complete"){
    console.log("website changed");
    var start_time = new Date();
    console.log(start_time);
    }
  }

  function end(){
      var end_time = new Date();
      var timeSpent  = start_time - end_time;
        console.log(timeSpent);
    }

  //function to let a start time and url 
  browser.tabs.onUpdated.addListener(start);
  //browser.tabs.onLoaded.addListener(start);
  function handleCreated(tab) {
    console.log(tab.title);
  }
  
  //browser.tabs.onCreated.addListener(handleCreated);