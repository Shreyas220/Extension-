  
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
const tabTimeObjectKey = "tabTimeObject";
const lastActiveTabKey = "lastActiveTab";

  chrome.windows.onFocusChanged.addListener((windowId) => {
    
    
    if(windowId == chrome.windows.WINDOW_ID_NONE){
      processChangedTab(false);
    }else{
      processChangedTab(true);
    }


  });


  function processChangedTab(){

    chrome.tabs.query({'active': true}, (tabs)=>{

      if (tabs.length >0 && tabs[0]!= null){
        let currentTab = tabs[0];
        let url = currentTab.url;
        let title = currentTab.title;
        let hostName = url;
        console.log("current tab:" + currentTab + "url"+ url + "title:" + title+"hostname"+ hostName );


        try {
          let urlObject = new URL(url);
          hostName = urlObject.hostname;

        }catch(e){
          console.log(`could not construct url from ${currentTab.url}, error : $(e)`)
        }

      }
      // getting information of the last active tab 
      chrome.storage.local.get([tabTimeObjectKey, lastActiveTabKey], (result) => {
        let lastActiveTabString = result[lastActiveTabKey];
        let tabTimeObjectString = result[tabTimeObjectKey];
        console.log("get results");
        console.log(result);
        tabTimeObject = {}
        if(tabTimeObjectString != null){
          tabTimeObject = JSON.parse(tabTimeObjectString);
        }
        lastActiveTab = {};
        if(lastActiveTabString != null){
          lastActiveTab = JSON.parse(lastActiveTabString);
        }

      });

      //After the focus change adding tracked seconds 
      if(lastActiveTab.hasOwnProperty("url")&& lastActiveTab.hasOwnProperty("lastDateVal")){

        let lastUrl = lastActiveTab["url"];
        //local scope date val
        let currentDateVal_ = Date.now();
        let passedSeconds = (currentDateVal_ - lastActiveTab["LastDateVal"]) * 0.001;

        if (tabTimeObject.hasOwnProperty(lastUrl)){
            let lastUrlObjectInfo = tabTimeObject[lastUrl];
            if (lastUrlObjectInfo.hasOwnProperty("trackedseconds")){
              lastUrlObjectInfo["trackedSeconds"] = lastUrlObjectInfo["trackedSeconds"] + passedSeconds;

            }else{
              lastUrlObjectInfo["trackedSeconds"] =  passedSeconds;
            }

        }else{
          let newUrlInfo = {url:lastUrl , trackedSeconds : passedSeconds, lastDateVal : currentDateVal_};
          tabTimeObjecte[lastUrl] = newUrlInfo; 
        }

      }

      let currentDateValue = Date.now();

      //if adding the new tab as lastActive tab
      let lastTabInfo = {"url": hostName, "lastDateVal": currentDateValue};
      if(!isWindowActive){
        lastTabInfo = {}
      }

      let newLastTabObject = {}
      newLastTabObject[lastActiveTabKey] = JSON.stringify(lastTabInfo);

      chrome.storage.local.set(newLastTabObject, ()=>{
        console.log("lastActiveTab stored: " + hostName);
        const tabTimeObjectString = JSON.stringify(tabTimeObject);
        let newTabTimesObject = {}
        newTabTimesObject[tabTimeObject] = tabTimeObjectString;
        chrome.storage.local.set(newTabTimesObject)
      })
      
    })//end of function 




  }//end of function process 