define([], function() {
  'use strict';

  var PageModule = function PageModule() {};

  PageModule.prototype.phoneFocus = function() {
    document.getElementById("oj-input-text--1332266279-38").focus();
  };

  PageModule.prototype.phoneFocusSpouse = function() {
    document.getElementById("oj-input-text--1332266279-3801").focus();
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

/*
Format:
{YYMMDD}{G}{SSS}{C}{A}{Z}
YYMMDD : Date of birth.
G  : Gender. 0-4 Female; 5-9 Male.
SSS  : Sequence No. for DOB/G combination.
C  : Citizenship. 0 SA; 1 Other.
A  : Usually 8, or 9 [can be other values]
Z  : Control digit calculated in the following section:

*/

 //SA ID validation control digit
  PageModule.prototype.testValid = function(newValue) {

    var idstring = newValue;
    if(idstring.length!=13){

      return false;
    }
    
    var component1 = sumParts(idstring.substring(0, 12));
    
    var component2 = parseInt(concatParts(idstring.substring(1, 12)).replace(/^[0]+/g, "")) * 2;
    var component3 = sumdig(component2); //sumParts(trailZeros(component2.toString(), 7).split('').join("0"));
    var component4 = component1 + component3;
    
    var result = "";
    if ((component4 % 10 == 0) && (parseInt(idstring.substring(12, 13)) ==0)) {
      result = 1;
    } else {
      result = 10 - (component4 % 10) === parseInt(idstring.substring(12,13));
    }
    
    function sumdig(value)
    {
      var  sum = 0;

      while (value) {
    sum += value % 10;
    value = Math.floor(value / 10);
    }
    
    return sum;
    }
    function trailZeros(value, count) {
      while (value.length < count) {
        value += "0";
      }
      return value;
    }

    function sumParts(idstring) {
      var x = parseInt(idstring[0]) + parseInt(idstring[2]) + parseInt(idstring[4]) + parseInt(idstring[6]) + parseInt(idstring[8]) + parseInt(idstring[10]);

      return x;
    }

    function concatParts(idstring) {
      return idstring[0] + "" + idstring[2] + "" + idstring[4] + "" +idstring[6] + "" + idstring[8] + "" + idstring[10];
    }
    if (result == true) {
      return true;
    } else {
      return false;
    }
  };
 
 
  PageModule.prototype.testValidSpouse = function(newValue) {
    var idstring = newValue;
    if(idstring.length!=13){
      return false;
    }
    
    var component1 = sumParts(idstring.substring(0, 12));
    
    var component2 = parseInt(concatParts(idstring.substring(1, 12)).replace(/^[0]+/g, "")) * 2;
    var component3 = sumdig(component2); 
    var component4 = component1 + component3;
    
    var result = "";
    if ((component4 % 10 == 0) && (parseInt(idstring.substring(12, 13)) ==0)) {
      result = 1;
    } else {
      result = 10 - (component4 % 10) === parseInt(idstring.substring(12,13));
    }
    
    function sumdig(value)
    {
      var  sum = 0;

      while (value) {
    sum += value % 10;
    value = Math.floor(value / 10);
    }
    
    return sum;
    }
    function trailZeros(value, count) {
      while (value.length < count) {
        value += "0";
      }
      return value;
    }

    function sumParts(idstring) {
      var x = parseInt(idstring[0]) + parseInt(idstring[2]) + parseInt(idstring[4]) + parseInt(idstring[6]) + parseInt(idstring[8]) + parseInt(idstring[10]);

      return x;
    }

    function concatParts(idstring) {
      return idstring[0] + "" + idstring[2] + "" + idstring[4] + "" +idstring[6] + "" + idstring[8] + "" + idstring[10];
    }
    if (result == true) {
      return true;
    } else {
      return false;
    }
  };
  
  /*
Format:
{YYMMDD}{G}{SSS}{C}{A}{Z}
YYMMDD : Date of birth.
G  : Gender. 0-4 Female; 5-9 Male.
SSS  : Sequence No. for DOB/G combination.
C  : Citizenship. 0 SA; 1 Other.
A  : Usually 8, or 9 [can be other values]
Z  : Control digit calculated in the following section:

*/

  PageModule.prototype.idDetailsGender = function(SAid) {
    var id = SAid;

    var gender = id.substring(6, 7);
    if (gender > 4) {
      //male
      return 1;

    } else {
      //female
      return 0;
    }


  };

/*
Format:
{YYMMDD}{G}{SSS}{C}{A}{Z}
YYMMDD : Date of birth.
G  : Gender. 0-4 Female; 5-9 Male.
SSS  : Sequence No. for DOB/G combination.
C  : Citizenship. 0 SA; 1 Other.
A  : Usually 8, or 9 [can be other values]
Z  : Control digit calculated in the following section:

*/
  PageModule.prototype.idDetailsNationality = function(SAid) {
 
    var id = SAid;
    var nationality = id.substring(10, 11);
    if (nationality == 0) {
      //SA National
      return 0;
    } else {
      //SA permanent reisdent
      return 1;
    }
  };

/*
Format:
{YYMMDD}{G}{SSS}{C}{A}{Z}
YYMMDD : Date of birth.
G  : Gender. 0-4 Female; 5-9 Male.
SSS  : Sequence No. for DOB/G combination.
C  : Citizenship. 0 SA; 1 Other.
A  : Usually 8, or 9 [can be other values]
Z  : Control digit calculated in the following section:

*/

  PageModule.prototype.idDetailsAge = function(SAid) {
    var id = SAid;
    var newYear = "";
    var today = new Date();
    var birthday = id.substring(0, 6);
    var birthYear = id.substring(0, 2);
    var birthMonth = id.substring(2, 4);
    var birthDate = id.substring(4, 6);

    var ageCategory = "";
    if (birthYear <= 20) {
      birthYear = "20" + birthYear;
    } else {
      birthYear = "19" + birthYear;
    }

    var age = today.getFullYear() - birthYear;
    var m = 1 + today.getMonth() - birthMonth;
    if (m < 0 || (m === 0 && today.getDate() < birthDate)) {
      age--;
    }
    if ((age >= 16) && (age <= 20)) {
      ageCategory = "16-20";
    } else if ((age >= 21) && (age <= 30)) {
      ageCategory = "21-30";
    } else if ((age >= 31) && (age <= 40)) {
      ageCategory = "31-40";
    } else if ((age >= 41) && (age <= 50)) {
      ageCategory = "41-50";
    } else if ((age >= 51) && (age <= 60)) {
      ageCategory = "51-60";
    } else if ((age >= 61) && (age <= 70)) {
      ageCategory = "61-70";
    } else if (age >= 71) {
      ageCategory = "71+";
    }

    return ageCategory;
  };


  PageModule.prototype.isValidPhone = function(phoneNumber) {
    var idstring = phoneNumber;
    var component1 = length(idstring);

    function length(idstring) {
      if (idstring.length == 10 && (!isNaN(phoneNumber)) && idstring.substring(
          0, 1) == "0") {
        return true;
      } else {
        return false;
      }
    }

    if (component1 == true) {
      return true;
    } else {
      return false;
    }

  };


  PageModule.prototype.showPic = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("mypic").onload = function() {
      URL.revokeObjectURL(blobURL);
    };
    document.getElementById("mypic").src = blobURL;
    return blobURL;
  };


  PageModule.prototype.showPic1 = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("mypic1").onload = function() {
      URL.revokeObjectURL(blobURL);
    };
    document.getElementById("mypic1").src = blobURL;
  };



  PageModule.prototype.returnURL = function(fileBlob) {
    alert(fileBlob);
  };

  PageModule.prototype.isValid = function(arg1) {
    return [{
      validate: (newValue) => {
        var isValue = newValue;
        if (isValue) {
          return true;
        } else {
          throw new Error('Please select an option');
        }
      }
    }];
  };





  PageModule.prototype.savePhoto = function(fileBlob, fileName) {
    window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
      onInitFs, onErrorLoadFs);

    function onErrorLoadFs() {
      alert("could not create file");
    }

    function onInitFs(fs) {
      saveFile(fs.root, fileBlob, fileName);
    }
    var a =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/" +
      fileName;
    return a;
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
        readBinaryFile(fileEntry);
      };
      fileWriter.onerror = function(e) {
        alert("could not create fileWrite third");
      };
      fileWriter.write(dataObj);
    });
  }

  function readBinaryFile(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        displayFileData(fileEntry.fullPath + ": " + this.result);
        var blob = new Blob([new Uint8Array(this.result)], {
          type: "image/jpg"
        });
        var returningFile = displayImageByFileURL(fileEntry);
      };

      reader.readAsArrayBuffer(file);

    }, onErrorReadFile);

    function displayFileData(data) {}

    function onErrorReadFile() {
      console.log("Create file fail...");
    }

    function onErrorLoadFs() {
      console.log("File system fail...");
    }
  }

  function displayImage(blob) {
    var elem = document.getElementById('imageFile');
    elem.src = window.URL.createObjectURL(blob);
  }

  function displayImageByFileURL(fileEntry) {
    // var elem = document.getElementById("photoOfDwelling");
    //elem.src = fileEntry.toURL();
  }



  PageModule.prototype.savePhotoIdHH = function(fileBlob, fileName) {
    window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
      onInitFs, onErrorLoadFs);

    function onErrorLoadFs() {
      alert("could not create file");
    }

    function onInitFs(fs) {
      saveFiles(fs.root, fileBlob, fileName);
    }
    var a =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/" +
      fileName + "_IDdocumentHH.jpg";
    return a;
  };

  function saveFiles(dirEntry, fileData, fileName) {
    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto";
    var filename = fileName + "_IDdocumentHH.jpg";

    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {
        create: true
      }, function(fileEntry) {
        writeFiles(fileEntry, fileData);
      });
    });
  }

  function writeFiles(fileEntry, dataObj, isAppend) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function() {
        readBinaryFiles(fileEntry);
      };
      fileWriter.onerror = function(e) {
        alert("could not create fileWrite third");
      };
      fileWriter.write(dataObj);
    });
  }

  function readBinaryFiles(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        displayFileData(fileEntry.fullPath + ": " + this.result);
        var blob = new Blob([new Uint8Array(this.result)], {
          type: "image/jpg"
        });
        displayImageByFileURLs(fileEntry);
      };

      reader.readAsArrayBuffer(file);

    }, onErrorReadFile);

    function displayFileData(data) {}

    function onErrorReadFile() {
      console.log("Create file fail...");
    }

    function onErrorLoadFs() {
      console.log("File system fail...");
    }

  }

  function displayImages(blob) {
    var elem = document.getElementById('imageFile');
    elem.src = window.URL.createObjectURL(blob);
  }

  function displayImageByFileURLs(fileEntry) {
  }






  PageModule.prototype.saveSpousePhotoIdHH = function(fileBlob, fileName) {
    window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
      onInitFs, onErrorLoadFs);

    function onErrorLoadFs() {
      alert("could not create file");
    }

    function onInitFs(fs) {

      saveFiled(fs.root, fileBlob, fileName);
    }
    var a =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/" +
      fileName + "_SpouseIdDocument.jpg";
    return a;
  };

  function saveFiled(dirEntry, fileData, fileName) {
    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto";
    var filename = fileName + "_SpouseIdDocument.jpg";

    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {
        create: true
      }, function(fileEntry) {
        writeFiled(fileEntry, fileData);
      });
    });
  }

  function writeFiled(fileEntry, dataObj, isAppend) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function() {
        readBinaryFiled(fileEntry);
      };
      fileWriter.onerror = function(e) {
        alert("could not create fileWrite third");
      };
      fileWriter.write(dataObj);
    });
  }

  function readBinaryFiled(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        displayFileData(fileEntry.fullPath + ": " + this.result);
        var blob = new Blob([new Uint8Array(this.result)], {
          type: "image/jpg"
        });
        displayImageByFileURLd(fileEntry);
      };

      reader.readAsArrayBuffer(file);

    }, onErrorReadFile);

    function displayFileData(data) {}

    function onErrorReadFile() {
      console.log("Create file fail...");
    }

    function onErrorLoadFs() {
      console.log("File system fail...");
    }

  }

  function displayImaged(blob) {
    var elem = document.getElementById('imageFile');
    elem.src = window.URL.createObjectURL(blob);
  }

  function displayImageByFileURLd(fileEntry) {
  }





  PageModule.prototype.saveMarriageCertificate = function(fileBlob, nameP) {
    window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
      onInitFs, onErrorLoadFs);

    function onErrorLoadFs() {
      alert("could not create file");
    }

    function onInitFs(fs) {

      saveFileds(fs.root, fileBlob, nameP);
    }
    var a =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/" +
      nameP + "_MarriageCertificate.jpg";
    return a;
  };

  function saveFileds(dirEntry, fileData, nameP) {

    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto";
    var filename = nameP + "_MarriageCertificate.jpg";
    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {
        create: true
      }, function(fileEntry) {
        writeFileds(fileEntry, fileData);
      });
    });
  }

  function writeFileds(fileEntry, dataObj, isAppend) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function() {
        readBinaryFileds(fileEntry);
      };
      fileWriter.onerror = function(e) {
        alert("could not create fileWrite third");
      };
      fileWriter.write(dataObj);
    });
  }

  function readBinaryFileds(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        displayFileData(fileEntry.fullPath + ": " + this.result);
        var blob = new Blob([new Uint8Array(this.result)], {
          type: "image/jpg"
        });
        displayImageByFileURLds(fileEntry);

      };

      reader.readAsArrayBuffer(file);

    }, onErrorReadFile);

    function displayFileData(data) {}

    function onErrorReadFile() {
      console.log("Create file fail...");
    }

    function onErrorLoadFs() {
      console.log("File system fail...");
    }
  }

  function displayImageds(blob) {
    var elem = document.getElementById('imageFile');
    elem.src = window.URL.createObjectURL(blob);
  }

  function displayImageByFileURLds(fileEntry) {
    //var elem = document.getElementById('MarriageCertificate');
    //elem.src = fileEntry.toURL();

  }

  PageModule.prototype.saveBirthCertificatePhoto = function(fileBlob,
    fileName, num) {
    window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024,
      onInitFs, onErrorLoadFs);

    function onErrorLoadFs() {
      alert("could not create file");
    }

    function onInitFs(fs) {
      saveFilePhoto(fs.root, fileBlob, fileName, num);
    }
    var a =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/" +
      fileName + "_DependantBirthCertificate_" + num + ".jpg";
    return a;
  };

  function saveFilePhoto(dirEntry, fileData, fileName, num) {
    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/tempPhoto/";
    var filename = fileName + "_DependantBirthCertificate_" + num + ".jpg";

    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {
        create: true
      }, function(fileEntry) {
        writeFilePhoto(fileEntry, fileData, num);
      });
    });
  }

  function writeFilePhoto(fileEntry, dataObj, num) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function() {
        readBinaryFilePhoto(fileEntry, num);
      };
      fileWriter.onerror = function(e) {
        alert("could not create fileWrite third");
      };
      fileWriter.write(dataObj);
    });
  }

  function readBinaryFilePhoto(fileEntry, num) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        displayFileData(fileEntry.fullPath + ": " + this.result);
        var blob = new Blob([new Uint8Array(this.result)], {
          type: "image/jpg"
        });
        displayImageByFileURLPhoto(fileEntry, num);
      };

      reader.readAsArrayBuffer(file);

    }, onErrorReadFile);

    function displayFileData(data) {}

    function onErrorReadFile() {
      console.log("Create file fail...");
    }

    function onErrorLoadFs() {
      console.log("File system fail...");
    }
  }

  function displayImagePhoto(blob) {

    var elem = document.getElementById('imageFile');
    elem.src = window.URL.createObjectURL(blob);
  }

  function displayImageByFileURLPhoto(fileEntry, num) {


    //var elem = document.getElementById("dependantPhoto"+num);
    //elem.src = fileEntry.toURL();
  }



  PageModule.prototype.movePhotos = function(fileBlob, fileName) {

    return new Promise(function(resolve, reject) {
      window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024,
        movedPhotos, failed);

      function failed() {
        alert("could not create file");
      }

      function movedPhotos(fs) {
        uploadedPhotos(fs.root, fileBlob, fileName);
      }

      var a =
        "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/uploadedPhotos/" +
        fileName;
      resolve(a);
      reject("Timeout");
    });

  };

  function uploadedPhotos(dirEntry, fileData, fileName) {
    var path =
      "file:///storage/emulated/0/android/data/vbcs.mobigeo.geomobi.appid/files/uploadedPhotos/";
    var filename = fileName;
    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {
        create: true
      }, function(fileEntry) {
        write_File(fileEntry, fileData);
      });
    });
  }

  function write_File(fileEntry, dataObj, isAppend) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function() {
        readBinary_File(fileEntry);
      };
      fileWriter.onerror = function(e) {
        alert("could not create fileWrite third");
      };
      fileWriter.write(dataObj);
    });
  }

  function readBinary_File(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        var blob = new Blob([new Uint8Array(this.result)], {
          type: "image/jpg"
        });
      };

      reader.readAsArrayBuffer(file);

    }, onErrorReadFile);

    function onErrorReadFile() {
      console.log("Create file fail...");
    }

    function onErrorLoadFs() {
      console.log("File system fail...");
    }
  }







  PageModule.prototype.deleteFromTemp = function(fName) {
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
    });
  };


  PageModule.prototype.TownDurationMoreThanDwellingDurationValidator=
    function(dwellingYear, dwellingMonth, townYear, townMonth) {
      
      if(isNaN(dwellingYear)) {
        return false;
      }
      else if(isNaN(townYear)) {
        return false;
      }
      else if (townYear == dwellingYear) {
        if (isNaN(dwellingMonth)) {
                return false;
        } 
        else if (isNaN(townMonth)) {
                return false;
        } 
        else if (dwellingMonth > townMonth) {
                return false;
        }
        else if ((dwellingMonth < townMonth) ||(dwellingMonth == townMonth)) {
                return true;
        }
      }
      else if(townYear < dwellingYear){
        return false;
        }
      else if(townYear > dwellingYear){
        return true;
        }
      
    };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.focusGrants = function(arg1) {
    document.getElementById("oj-select-one--1332266279-35").focus();
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.calcNumOfDependant = function(num) {
    var count = num - 1;
    return count;

  };

  PageModule.prototype.showLoader = function(arg1) {
    $("#loaderid").css('display', 'block');
  };

  PageModule.prototype.hideLoader = function(arg1) {
    $("#loaderid").css('display', 'none');
  };

  PageModule.prototype.saveHeadOfHouseDetailsOffline = function(arg1) {
     var jsonValue = {"HeadOfHouseHold": arg1};
    localStorage.setItem(arg1.surveyIDVar + "_GeoMobibackupdata"+"_HeadHouseholdData", JSON.stringify(jsonValue));
    
  };
  PageModule.prototype.saveHouseHoldDetailsOffline = function(arg1) {
    var jsonValue = {"HouseHoldDetails": arg1};
    localStorage.setItem(arg1.surveyIDVar + "_GeoMobibackupdata"+"_HouseholdData", JSON.stringify(jsonValue));
  };
  PageModule.prototype.saveSpoucesDetailsOffline = function(arg1) {
    var jsonValue = {"SpouseDetails": arg1};
    localStorage.setItem(arg1.surveyIDVar + "_GeoMobibackupdata"+"_SpouseData", JSON.stringify(jsonValue));
  };
  PageModule.prototype.saveServiceDataOffline = function(arg1) {
    var jsonValue = {"ServiceDetails": arg1};
    localStorage.setItem(arg1.surveyIDVar + "_GeoMobibackupdata"+"_ServiceData", JSON.stringify(jsonValue));
  };
  PageModule.prototype.setDwellingPhotoImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("photoOfDwelling").src = blobURL;
  };
  PageModule.prototype.setPhotoIDDocumentHHImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("photoIDDocHH").src = blobURL;
  };

  PageModule.prototype.setSpousePhotoIDDocumentImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("spousePhotoIDDocHH").src = blobURL;
  };
  PageModule.prototype.setMarriageCertificateImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("MarriageCertificate").src = blobURL;
  };
  PageModule.prototype.setdependantPhotoImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("dependantPhoto").src = blobURL;
  };
  PageModule.prototype.setdependantPhoto1ImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("dependantPhoto1").src = blobURL;
  };
  PageModule.prototype.setdependantPhoto2ImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("dependantPhoto2").src = blobURL;
  };
  PageModule.prototype.setdependantPhoto3ImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("dependantPhoto3").src = blobURL;
  };
  PageModule.prototype.setdependantPhoto4ImgSrc = function(fileBlob) {
    const blobURL = URL.createObjectURL(fileBlob);
    document.getElementById("dependantPhoto4").src = blobURL;
  };


  PageModule.prototype.testValidRentAmount = function(newValue) {
        return [{
          validate: (newValue) => {

            if (isNaN(newValue) || newValue < 1) {
              throw new Error('Invalid Rent Amount');
            } else {
              return true;
            }
          }
        }];
  };
      
      
  return PageModule;
});
