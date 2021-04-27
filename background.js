 /* 
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
*/


const lastActiveTabKey = "lastActiveTab";

 


  function processChangedTab(isWindowActive){

    browser.tabs.query({'active': true}, (tabs)=>{
      //getting information about the current page
      if (tabs.length >0 && tabs[0]!= null){
        var currentTab = tabs[0];
        var url = currentTab.url;
        console.log("url"+url);
        var title = currentTab.title;
        var hostName = url;
        
        //console.log("current tab:" + currentTab + "url"+ url + "title:" + title+"hostname"+ hostName );
      }

      // getting information of the last active tab    
      browser.storage.local.get([lastActiveTabKey], (result) => {
        let lastActiveTabString = result[lastActiveTabKey];
        console.log("get results");
        console.log(result);
        lastActiveTab = {};
        var isFull = false;
        if(lastActiveTabString != null){
          var lastActiveTab = JSON.parse(lastActiveTabString);
          isFull = true;
        }

      });



      if(isFull){
        let lastUrl = lastActiveTab["url"];
        let currentDateVal_ = Date.now();
        let passedSeconds = (currentDateVal_ - lastActiveTab["lastDateVal"]) * 0.001;
        console.log(passedSeconds);
        //send the data 
        
      }

      let currentDateValue = Date.now();
      //adding the new tab as lastActive tab
      let url_ = window.location.hostname;
      let lastTabInfo = {"url": url, "lastDateVal": currentDateValue};
      if(isWindowActive){           //and not in list 
        lastTabInfo = {}
      }

      let newLastTabObject = {}
      newLastTabObject[lastActiveTabKey] = JSON.stringify(lastTabInfo);
                                                 
      browser.storage.local.set(newLastTabObject, ()=>{
        console.log("lastActiveTab stored: " + url);
        chrome.storage.local.set(newTabTimesObject)
      })
      
    })//function 




  }//function process 


  browser.windows.onFocusChanged.addListener((windowId) => {
    
    
    if(windowId == browser.windows.WINDOW_ID_NONE){
      processChangedTab(false);
    }else{
      processChangedTab(true);
    }


  });
