(function() {
  this.Dosbox = (function() {
    function Dosbox(options) {
      this.onload = options.onload;
      this.onrun = options.onrun;
      this.ui = new Dosbox.UI(options);
      this.module = new Dosbox.Module({
        canvas: this.ui.canvas
      });
      this.ui.onStart((function(_this) {
        return function() {
          _this.ui.showLoader();
          return _this.downloadScript();
        };
      })(this));
    }

    Dosbox.prototype.run = function(archiveUrl, executable) {
      return new Dosbox.Mount(this.module, archiveUrl, {
        success: (function(_this) {
          return function() {
            var func, hide;
            _this.ui.updateMessage("Launching " + executable);
            hide = function() {
              return _this.ui.hideLoader();
            };
            func = function() {
              return _this._dosbox_main(_this, executable);
            };
            setTimeout(func, 1000);
            return setTimeout(hide, 3000);
          };
        })(this),
        progress: (function(_this) {
          return function(total, current) {
            return _this.ui.updateMessage("Mount " + executable + " (" + (current * 100 / total | 0) + "%)");
          };
        })(this)
      });
    };

    Dosbox.prototype.requestFullScreen = function() {
      if (this.module.requestFullScreen) {
        return this.module.requestFullScreen(true, false);
      }
    };

    Dosbox.prototype.downloadScript = function() {
      this.module.setStatus('Downloading js-dos');
      this.ui.updateMessage('Downloading js-dos');
      return new Dosbox.Xhr('js-dos.js', {
        success: (function(_this) {
          return function(script) {
            var func;
            _this.ui.updateMessage('Initializing dosbox');
            func = function() {
              return _this._jsdos_init(_this.module, script, _this.onload);
            };
            return setTimeout(func, 1000);
          };
        })(this),
        progress: (function(_this) {
          return function(total, current) {
            return _this.ui.updateMessage("Downloading js-dos (" + (current * 100 / total | 0) + "%)");
          };
        })(this)
      });
    };

    Dosbox.prototype._jsdos_init = function(module, script, onload) {
      var Module;
      Module = module;
      eval(script);
      if (onload) {
        return onload(this);
      }
    };

    Dosbox.prototype._dosbox_main = function(dosbox, executable) {
      var exception, func;
      try {
        if (dosbox.onrun) {
          func = function() {
            return dosbox.onrun(dosbox, executable);
          };
          setTimeout(func, 1000);
        }
        return dosbox.module.ccall('dosbox_main', 'int', ['string'], [executable]);
      } catch (error) {
        exception = error;
        if (exception === 'SimulateInfiniteLoop') {

        } else {
          return typeof console !== "undefined" && console !== null ? typeof console.error === "function" ? console.error(exception) : void 0 : void 0;
        }
      }
    };

    return Dosbox;

  })();

}).call(this);
