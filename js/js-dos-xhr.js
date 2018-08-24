(function() {
  Dosbox.Xhr = (function() {
    function Xhr(url, options) {
      var e;
      this.success = options.success;
      this.progress = options.progress;
      if (window.ActiveXObject) {
        try {
          this.xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (error) {
          e = error;
          this.xhr = null;
        }
      } else {
        this.xhr = new XMLHttpRequest();
      }
      this.xhr.open('GET', url, true);
      this.xhr.overrideMimeType('text/plain; charset=x-user-defined');
      this.xhr.addEventListener('progress', (function(_this) {
        return function(evt) {
          if (_this.progress) {
            return _this.progress(evt.total, evt.loaded);
          }
        };
      })(this));
      this.xhr.onreadystatechange = (function(_this) {
        return function() {
          return _this._onReadyStateChange();
        };
      })(this);
      this.xhr.send();
    }

    Xhr.prototype._onReadyStateChange = function() {
      if (this.xhr.readyState === 4 && this.success) {
        return this.success(this.xhr.responseText);
      }
    };

    return Xhr;

  })();

}).call(this);
