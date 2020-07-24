    define([], function() {
      "use strict";
      var PageModule = function PageModule() {};

      PageModule.prototype.isFormValid = function(form) {
        var tracker = document.getElementById(form);
        if (tracker.valid === "valid") {
          return true;
        } else {
          tracker.showMessages();
          tracker.focusOn("@firstInvalidShown");
          return false;
        }
      };

      PageModule.prototype.resetFields = function() {
        document.getElementById("houseNum").value = "";
        $("#dwellingType").val("");
        $('#captureStat').val('Contact/Interview');
        document.getElementById("stickerNumber").value = ""; 
        
        document.getElementById("stickerNumPhoto").src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";

      };

      PageModule.prototype.getTime = function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time = today.getTime();
        today = yyyy + mm + dd + "_" + time;
        return today;

      };

      PageModule.prototype.testValidStickerNumber = function(newValue) {
        return [{
          validate: (newValue) => {

            if (isNaN(newValue) || newValue < 1) {
              throw new Error("Invalid sticker number");
            } else {
              return true;
            }
          }
        }];
      };

      PageModule.prototype.getLocalTime = function(time) {
        var splitTime = time.split("_")[1];
        var intTime = parseInt(splitTime, 10);
        var lTime = new Date(intTime).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        return lTime;

      };

      PageModule.prototype.createDir = function() {

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
          window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
            gotFS, fail);
        }

        function gotFS(fileSystem) {
          var path =
            "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/";
          window.resolveLocalFileSystemURL(path, function(dir) {
            dir.getDirectory("tempPhoto", {
              create: true
            }, gotDir);
          });
          window.resolveLocalFileSystemURL(path, function(dir) {
            dir.getDirectory("uploadedPhotos", {
              create: true
            }, gotDir);
          });
        }

        function fail() {
          alert("Failed to create folder");
        }

        function gotDir(dirEntry) {
          dirEntry.getFile("log.txt", {
            create: true,
            exclusive: true
          }, gotFile);
        }

        function gotFile(fileEntry) {}
      };

      PageModule.prototype.saveStickerPhoto = function(fileBlob, fileName) {
        window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
          onInitFs, onErrorLoadFs);

        function onInitFs(fs) {
          saveFile(fs.root, fileBlob, fileName);
        }

        function onErrorLoadFs() {
          alert("could not create file");
        }
      };

      function saveFile(dirEntry, fileData, fileName) {
        var path =
          "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto";
        var filename = fileName;

        window.resolveLocalFileSystemURL(path, function(dir) {
          dir.getFile(filename, {
            create: true
          }, function(fileEntry) {
            writeFile(fileEntry, fileData);

          });
        });
      }

      function writeFile(fileEntry, dataObj, isAppend) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.onwriteend = function() {
          };
          fileWriter.onerror = function(e) {
            alert("could not create fileWrite");
          };
          fileWriter.write(dataObj);
        });
      }
  
      PageModule.prototype.deleteFromTemp = function(fName) {

        var path =
          "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto";
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
        });
      };
      var watchId;
      PageModule.prototype.GetLatitude = function(arg1) {
        var lat = document.getElementById("latitude").value;
        var i = 0;
        while (isNaN(lat)) {
          lat = document.getElementById("latitude").value;
          i = i + 1;
          if (i == 1000) {
            break;
          }
        }
        return lat;
      };

      PageModule.prototype.GetLongitude = function(arg1) {
        var i = 0;
        var long = document.getElementById("longitude").value;

        while (isNaN(long)) {
          long = document.getElementById("longitude").value;
          i = i + 1;
          if (i == 1000) {
            break;
          }
        }
        return long;
      };

      PageModule.prototype.StartHeiGeo = function(arg1) {

        gpsReady();

        navigator.geolocation.setSource('external', gpsReady);
        
        function gpsReady() {
          watchId = navigator.geolocation.watchPosition(onLocate);
        }
        

        function onLocate(pos) {
          document.getElementById("latitude").value = pos.coords.latitude;
          document.getElementById("longitude").value = pos.coords.longitude;

        }
        
        //if (watchId !== null) {
          //navigator.geolocation.clearWatch(watchId);
          //watchId = null;
        //}
      };

      PageModule.prototype.showLoader = function(arg1) {
        $("#loaderid").css("display", "block");
      };

      PageModule.prototype.hideLoader = function(arg1) {
        $("#loaderid").css("display", "none");
      };

      PageModule.prototype.setImageSrc = function(fileBlob) {
        const blobURL = URL.createObjectURL(fileBlob);
        document.getElementById("stickerNumPhoto").src = blobURL;
      };

      PageModule.prototype.saveDashboardDataOffline = function(arg1) {
        var jsonData = {"DashboardData": arg1};
        localStorage.setItem(arg1.uniqueSurveyID + "_GeoMobibackupdata"+"_DashboardData",JSON.stringify(jsonData));
      };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */

  /**
   *
   * @param {String} arg1
   * @return {String}
   */

      return PageModule;

    });
