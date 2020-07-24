define([], function() {
  'use strict';

  var AppModule = function AppModule() {

    
    };

  /**
   * Hide spinner screen since the application is ready to display root UI
   */
  AppModule.prototype.hideSpinner = function() {
    
    // tear down the spinner screen
    var spinner = document.getElementById('vb-spinner');
    if (spinner) {
      // if the spinner screen is not yet displayed, immediately remove it and return
      var computedStyle = window.getComputedStyle(spinner);
      var opacity = parseInt(computedStyle.getPropertyValue('opacity'), 10);
      if (opacity < 0.1) {
        spinner.parentNode.removeChild(spinner);
        return;
      }

      var transEndFn = function() {
        if (spinner.parentNode) {
          spinner.parentNode.removeChild(spinner);
        }
        spinner.removeEventListener('transitionend', transEndFn);
      };
      spinner.addEventListener('transitionend', transEndFn, false);
      spinner.className += ' vb-spinner-reveal-trans';
    }
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.validateUser = function (arg1) {
var photoUrl=arg1;
return photoUrl;
  };
           	
            AppModule.prototype.isFormValid = function(form) {
              var tracker = document.getElementById(form); 
              if (tracker.valid === "valid") {
                return true;
              } else {
                tracker.showMessages();
                tracker.focusOn("@firstInvalidShown");
                return false;
              }
            };
            
 return AppModule;
});
