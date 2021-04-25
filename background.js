  
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

  chrome.windows.onFocusChanged.addListener((windowId) => {
      //
  });

  function processChangedTab(){

    chrome.tabs.query({'active': true}, (tabs)=>{

      if (tabs.length >0 && tab[0]!= null){
        let currentTab = tab[0];
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

      //get lastActiveTab detail from storage 

      if(lastActiveTab.hasOwnProperty("url")&& lastActiveTab.hasOwnProperty("lastDateVal")){

        let lastUrl = lastActiveTab["url"];
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
      
    })




  }