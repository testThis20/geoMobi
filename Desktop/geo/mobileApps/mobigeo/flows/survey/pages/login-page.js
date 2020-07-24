define([], function() {
  'use strict';

  var PageModule = function PageModule() {};

  PageModule.prototype.createDir = function() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, gotFS,
        fail);
    }

    function gotFS(fileSystem) {
      var path =
        "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/";

      window.resolveLocalFileSystemURL(path, function(dir) {
        dir.getDirectory("tempPhoto", {
          create: true
        }, gotDir);

      });
    }

    function fail() {
      alert("Could not to create temp photo folder!");
    }

    function gotDir(dirEntry) {
     
    }

    function gotFile(fileEntry) {}
  };

  PageModule.prototype.offlineLogin = function(username, password) {
    var pass_id = localStorage.getItem(username);
    var pass;
    var id;
    
    if (pass_id.includes('_')) {
      var splitteddata = pass_id.split("_");
      if (splitteddata.length == 2) {
       
        pass= String(splitteddata[0]);
        id=String(splitteddata[1]);
        }
        
    if (pass == password) {
      return id;
    } else {
      return 0;
    }
  }
  };

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

  PageModule.prototype.createUser = function(userName, password, userID) {
    localStorage.setItem(userName, password+"_"+ userID);
  };


  PageModule.prototype.showLoader = function(arg1) {
    $("#loaderid").css('display', 'block');
    $("#oj-button--1444192320-1").attr('disabled', true);
  };

  PageModule.prototype.hideLoader = function(arg1) {
    $("#loaderid").css('display', 'none');
    $("#oj-button--1444192320-1").attr('disabled', false);
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  
  return PageModule;
});
