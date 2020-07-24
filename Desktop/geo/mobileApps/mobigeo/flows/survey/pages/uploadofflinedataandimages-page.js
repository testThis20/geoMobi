define([], function() {
  
  'use strict';

  var PageModule = function PageModule() {};

PageModule.prototype.deleteAllOfflineData = function(arg1) {
    var keys = Object.keys(localStorage);
    for (var key in keys) {
    if (keys[key].includes("_GeoMobibackupdata")) {
        localStorage.removeItem(keys[key]);
      }
    }
  };
  
  PageModule.prototype.getOfflineData = function(arg1) {

    var keys = Object.keys(localStorage);

    var i=0;
    var jsonValue=new Array();

    for (var key in keys) {
    if (keys[key].includes("_GeoMobibackupdata")) {
     
        var objectValue = localStorage.getItem(keys[key]);
        jsonValue[i++] = JSON.parse(objectValue);
        
      }
    }
    return jsonValue;
  };

  PageModule.prototype.getSurveyData = function (jsonValue) {
        var surveyData;
        if (typeof jsonValue["DashboardData"] != "undefined" && jsonValue["DashboardData"] != "") {
           surveyData=jsonValue["DashboardData"];
        }
        else if (typeof jsonValue["HeadOfHouseHold"] != "undefined" && jsonValue["HeadOfHouseHold"] != "") {
           surveyData=jsonValue["HeadOfHouseHold"] ;
        }
        else if (typeof jsonValue["HouseHoldDetails"] != "undefined" &&jsonValue["HouseHoldDetails"] != "") {
          surveyData=jsonValue["HouseHoldDetails"];
        }
        else if (typeof jsonValue["SpouseDetails"] != "undefined" && jsonValue["SpouseDetails"] != "") {
          surveyData=jsonValue["SpouseDetails"] ;
        }
        else if (typeof jsonValue["ServiceDetails"] != "undefined" && jsonValue["ServiceDetails"] != "") {
          surveyData=jsonValue["ServiceDetails"];
        }
        return surveyData;
  };

  PageModule.prototype.getDataSurveyCategory = function (jsonValue) {
   
       var dataCategory;
    
       if (typeof jsonValue["DashboardData"] != "undefined" && jsonValue["DashboardData"] != "") {
           dataCategory="Dashboard";
       }
       else if (typeof jsonValue["HeadOfHouseHold"] != "undefined" && jsonValue["HeadOfHouseHold"] != "") {
           dataCategory="Head";
       }
       else if (typeof jsonValue["HouseHoldDetails"] != "undefined" &&jsonValue["HouseHoldDetails"] != "") {
          dataCategory="Household";
       }
       else if (typeof jsonValue["SpouseDetails"] != "undefined" && jsonValue["SpouseDetails"] != "") {
          dataCategory="Spouse";
       }
       else if (typeof jsonValue["ServiceDetails"] != "undefined" && jsonValue["ServiceDetails"] != "") {
          dataCategory="Service";
       }
       return dataCategory;
  };
   
  PageModule.prototype.deleteOfflineData = function (jsonValue, surveyID) {
       if (typeof jsonValue["DashboardData"] != "undefined" && jsonValue["DashboardData"] != "") {
            localStorage.removeItem(surveyID+"_GeoMobibackupdata"+"_DashboardData");
       }
       else if (typeof jsonValue["HeadOfHouseHold"] != "undefined" && jsonValue["HeadOfHouseHold"] != "") {
           localStorage.removeItem(surveyID+"_GeoMobibackupdata"+"_HeadHouseholdData");
       }
       else if (typeof jsonValue["HouseHoldDetails"] != "undefined" &&jsonValue["HouseHoldDetails"] != "") {
           localStorage.removeItem(surveyID+"_GeoMobibackupdata"+"_HouseholdData");
       }
       else if (typeof jsonValue["SpouseDetails"] != "undefined" && jsonValue["SpouseDetails"] != "") {
           localStorage.removeItem(surveyID+"_GeoMobibackupdata"+"_SpouseData");
       }
       else if (typeof jsonValue["ServiceDetails"] != "undefined" && jsonValue["ServiceDetails"] != "") {
           localStorage.removeItem(surveyID+"_GeoMobibackupdata"+"_ServiceData");
       }       
   }; 

  PageModule.prototype.uploadOfflineData = function(arg1) {
    var keys = Object.keys(localStorage);

    for (var value in keys) {

      if (keys[value].includes("_GeoMobibackupdata")) {

        var objectValue = localStorage.getItem(keys[value]);

        var jsonValue = JSON.parse(objectValue);

        var dev_base_url = "https://integration227992-pmmopc.integration.ocp.oraclecloud.com/ic/builder/design/GM/1.0/resources/data/";
        var stage_base_url = "https://integration227992-pmmopc.integration.ocp.oraclecloud.com/ic/builder/rt/GM/1.0/resources/data/";
        var live_base_url = "https://integration227992-pmmopc.integration.ocp.oraclecloud.com/ic/builder/rt/GM/live/resources/data/";
        var base_url = stage_base_url;
        var url = base_url + 'DashBO/1/action/updateDashDetails';
        var savedDataKeys = Object.keys(jsonValue);
         if (typeof jsonValue["DashboardData"] != "undefined" && jsonValue["DashboardData"] != "") {
          if (sendPOSTRequest(url, jsonValue["DashboardData"], keys[value])) {}
        }
       
        if (typeof jsonValue["HeadOfHouseHold"] != "undefined" && jsonValue["HeadOfHouseHold"] != "") {
          url = base_url + "HeadHouseholdBO/1/action/updateDetailsHH";
          if (sendPOSTRequest(url, jsonValue["HeadOfHouseHold"], keys[value])) {}
        }
        
        if (typeof jsonValue["HouseHoldDetails"] != "undefined" &&jsonValue["HouseHoldDetails"] != "") {
          url =base_url + "HouseholdInfoBO/1/action/updateHouseholdInfo";
          if (sendPOSTRequest(url, jsonValue["HouseHoldDetails"], keys[value])) {}
        }
        
        if (typeof jsonValue["SpouseDetails"] != "undefined" && jsonValue["SpouseDetails"] != "") {
          url =base_url + "SpouseDetailsBO/1/action/UpdateSpouseDetails";
          if (sendPOSTRequest(url, jsonValue["SpouseDetails"], keys[value])) {}
        }

        if (typeof jsonValue["ServiceDetails"] != "undefined" && jsonValue["ServiceDetails"] != "") {
          url =base_url + "ServiceBO/1/action/UpdateServices";
          if (sendPOSTRequest(url, jsonValue["ServiceDetails"], keys[value])) {
           
          }
        }
      }

    }
  };

  function sendPOSTRequest(url, datatosend, localstoragekey) {

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {

      if (httpRequest.readyState == 4 && httpRequest.status == 204) {
        localStorage.removeItem(localstoragekey);
        return true;

      }else{
          confirm(JSON.stringify(httpRequest));
          return false;
        }

    }
    var beartoken ="eyJ4NXQjUzI1NiI6Im5kUDhwak5jN0dIU2QtVXM5SUkyMXhEdHNOV05sQWItbWstRms0Z3Y0VU0iLCJ4NXQiOiJ4TTJTMlNfdUNqcFlELWF4Z3c3UzRRRWswQ3MiLCJraWQiOiJTSUdOSU5HX0tFWSIsImFsZyI6IlJTMjU2In0.eyJ1c2VyX3R6IjoiQW1lcmljYVwvQ2hpY2FnbyIsInN1YiI6InNhdHlhbSIsInVzZXJfbG9jYWxlIjoiZW4iLCJpZHBfbmFtZSI6ImxvY2FsSURQIiwidXNlci50ZW5hbnQubmFtZSI6ImlkY3MtOWMxNGU3YmZhZDc1NDhlYzljMjAwODBjODJlYjNjZWQiLCJpZHBfZ3VpZCI6ImxvY2FsSURQIiwiYW1yIjpbIlVTRVJOQU1FX1BBU1NXT1JEIl0sImlzcyI6Imh0dHBzOlwvXC9pZGVudGl0eS5vcmFjbGVjbG91ZC5jb21cLyIsInVzZXJfdGVuYW50bmFtZSI6ImlkY3MtOWMxNGU3YmZhZDc1NDhlYzljMjAwODBjODJlYjNjZWQiLCJjbGllbnRfaWQiOiJCM0NDNjFBRjVCM0U0MUYzOTEwMDRBNTNFMEY0QzQ0MF9BUFBJRCIsInNpZCI6IjJhMjFhOGU0LTRjYzAtNGY1OS04ZTYwLTIwODMzYTBhYTMwZCIsInN1Yl90eXBlIjoidXNlciIsInNjb3BlIjoidXJuOm9wYzpyZXNvdXJjZTpjb25zdW1lcjo6YWxsIiwiY2xpZW50X3RlbmFudG5hbWUiOiJpZGNzLTljMTRlN2JmYWQ3NTQ4ZWM5YzIwMDgwYzgyZWIzY2VkIiwidXNlcl9sYW5nIjoiZW4iLCJleHAiOjE1OTQ3OTA5MTcsImlhdCI6MTU5NDc4NzMxNywiY2xpZW50X2d1aWQiOiI5YmJlZWI1MWU3YmI0OTQ2OGQ3NjU4MDNhZmZkZGVmMSIsImNsaWVudF9uYW1lIjoiT0lDSU5TVF9JbnRlZ3JhdGlvbjIyNzk5MiIsImlkcF90eXBlIjoiTE9DQUwiLCJ0ZW5hbnQiOiJpZGNzLTljMTRlN2JmYWQ3NTQ4ZWM5YzIwMDgwYzgyZWIzY2VkIiwianRpIjoiYmQ2ZDI1Y2ItNTVmMS00OGMzLWJkYWUtMGZkZGM1MWZmODk3IiwidXNlcl9kaXNwbGF5bmFtZSI6InNhdHlhbSBzaGl2YW0iLCJzdWJfbWFwcGluZ2F0dHIiOiJ1c2VyTmFtZSIsInByaW1UZW5hbnQiOnRydWUsInRva190eXBlIjoiQVQiLCJjYV9ndWlkIjoiY2FjY3QtZWVlYjg3MzU0MDYzNGQ1MmEwZGVlNmQ2NDE1OTU0YTIiLCJhdWQiOlsiaHR0cHM6XC9cL0IzQ0M2MUFGNUIzRTQxRjM5MTAwNEE1M0UwRjRDNDQwLmludGVncmF0aW9uLm9jcC5vcmFjbGVjbG91ZC5jb206NDQzIiwidXJuOm9wYzpsYmFhczpsb2dpY2FsZ3VpZD1CM0NDNjFBRjVCM0U0MUYzOTEwMDRBNTNFMEY0QzQ0MCJdLCJ1c2VyX2lkIjoiNmQ0ZTdlOTRmYmNkNGEwNmIyYmE0NDk0NDM5YTkwMTEiLCJ0ZW5hbnRfaXNzIjoiaHR0cHM6XC9cL2lkY3MtOWMxNGU3YmZhZDc1NDhlYzljMjAwODBjODJlYjNjZWQuaWRlbnRpdHkub3JhY2xlY2xvdWQuY29tIn0.BVdz4EmUaJh4xPrDYcaUpQ0MlNbw48eQylNYf69ZAX7BbstFlZX9RlfE0NBjM5u3TQgMCMpihpYBV8bSauMpQzY9f9hLIwJuTpIPKDcSFu-IPQZwMSBg9qlzkfAW_T0SfZNPkztLwboIgnM7jatmJkufisCbXaGSUPGrJJJahH0YJKttlbiqdYwrKUDMKlMF8d70p0FFsQW3jB1TU0kmxAAiHnWbSYvvXqH5g6W5D6QgNhxGlkV3DlD7VZ3vpNh2izGeasaVALZzZCRqXMOrMuES2k7VizJS62lt6ECZ8qZ-pDLPTKrWVj1Ypj-4hEXyv8ePlTDSOrcMu-ZrMvt16g";
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Authorization', 'Bearer ' + beartoken);
    httpRequest.setRequestHeader('content-type',
      'application/vnd.oracle.adf.action+json');
    httpRequest.send(JSON.stringify(datatosend));

  }
 
  PageModule.prototype.getFileEntries =  function() {
    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto";
    var filename = new Array(); 
    window.resolveLocalFileSystemURL(path, function(dir) {
      var reader =  dir.createReader();
      var i;
      reader.readEntries(
         function(entries) {
          for (i = 0; i < entries.length; i++) {
            filename[i] = String(entries[i].name);
          }
          document.getElementById("fn").value=filename;
        });
    });
  };
  
  PageModule.prototype.ReadFileEntries = function() {
        var fn = document.getElementById("fn").value;
        var i = 0;
        while (isNaN(fn)) {
          fn = document.getElementById("fn").value;
          i = i + 1;
          if (i == 1000) {
            break;
          }
        }
        document.getElementById("fn").value="";
        return fn;
  };

  PageModule.prototype.getImageCategory = function(fileName) {
    var ImageCategory;
    
    if (fileName.includes("StickerNumber"))
      ImageCategory = "S";
    else if (fileName.includes("PhotoDwelling"))
      ImageCategory = "D";
    else if (fileName.includes("documentHH"))
      ImageCategory = "H";
    else if (fileName.includes("BirthCertificate"))
      ImageCategory = "B";
    else if (fileName.includes("SpouseIdDocument"))
      ImageCategory = "I";
    else if (fileName.includes("MarriageCertificate"))
      ImageCategory = "M";
    return ImageCategory;
  };

  PageModule.prototype.getImageSurveyId = function(fileName) {    
    if (fileName.includes('_')) {
      var spliteddata = fileName.split("_");
      if (spliteddata.length > 2) {
        return String(spliteddata[0]) + "_" + String(spliteddata[1]);
      } else {
        return "Error : invalid filename";
      }
    } else {
      return "Error : invalid filename";
    }
  };

  PageModule.prototype.deleteFromTemp = function(fName) {
  return new Promise(function(resolve, reject) {
    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/";
    var filename = fName;
    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {
        create: false
      }, function(fileEntry) {
        fileEntry.remove(function() {
         
        }, function(error) {
          alert("could not  delete file");
        }, function() {
          alert("photo does not exist");
        });
      });
      resolve(filename);
    }, function(error) {
               console.log(error);
               reject("The error is: " + error);
           }
    );
    
  });
  };

  PageModule.prototype.getFileBlob =async function (filename) {
  
  let promise = new Promise((resolve, reject) => {      
    var path ="file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/";
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    window.resolveLocalFileSystemURL(path, function(dir) {
    dir.getFile(filename, {
        create: false
      }, function(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function() {
                  var blob = new Blob([new Uint8Array(this.result)], {type: "image/jpg"});
                  document.getElementById("blob").value=blob;
                  const blobURL = window.URL.createObjectURL(blob);
                  document.getElementById("blob_img").src = blobURL;   
                  };
              reader.readAsArrayBuffer(file);
           });
        });
      });
       return 0;
        }    
     setTimeout(() => resolve("done!"), 5000)
  });
  let result = await promise;
  }; 
  
  
   
  PageModule.prototype.ReadFileBlob = function() {
    var blob = document.getElementById("blob").value;
    var i = 0;
    while (isNaN(blob)) {
      blob = document.getElementById("blob").value;
      i = i + 1;
      if (i == 10000) {
        break;
      }
    }
    document.getElementById("blob").value="";
    return blob;
  };  
      
     
  
      
      
  PageModule.prototype.showLoader = function(arg1) {
      $("#loaderid").css('display', 'block');
    };

  PageModule.prototype.hideLoader = function(arg1) {
      $("#loaderid").css('display', 'none');
    };

  PageModule.prototype.hideLoaderCompleted = function(arg1) {
      $("#loaderid").css('display', 'block');
    setTimeout(function(){ 
    $("#loaderid").css('display', 'none'); }, 2000);
    setTimeout(() => {     window.location.reload(); }, 1000);

    

    };
 
  PageModule.prototype.resetBlobImg = function (arg1) {
    document.getElementById("blob_img").src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
  };
  
  PageModule.prototype.updateDataCount = function (i,total) {  
    document.getElementById("data_count").value= "                                     "+i + " / " + total;   
  };
  
  PageModule.prototype.updateImageCount = function (i,total) {  
    document.getElementById("img_count").value= "                                     "+i + " / " + total;   
  };



  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.refresh = function () {
    
    setTimeout(() => {     window.location.reload(); }, 2000);
  };
  
  return PageModule;
  
});
