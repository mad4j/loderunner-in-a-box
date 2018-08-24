(function() {
  Dosbox.Mount = (function() {
    function Mount(module, url, options) {
      this.module = module;
      new Dosbox.Xhr(url, {
        success: (function(_this) {
          return function(data) {
            var bytes;
            bytes = _this._toArray(data);
            if (_this._mountZip(bytes)) {
              return options.success();
            } else {
              return typeof console !== "undefined" && console !== null ? typeof console.error === "function" ? console.error('Unable to mount', url) : void 0 : void 0;
            }
          };
        })(this),
        progress: options.progress
      });
    }

    Mount.prototype._mountZip = function(bytes) {
      var buffer, extracted;
      buffer = this.module._malloc(bytes.length);
      this.module.HEAPU8.set(bytes, buffer);
      extracted = this.module.ccall('extract_zip', 'int', ['number', 'number'], [buffer, bytes.length]);
      this.module._free(buffer);
      return extracted === 0;
    };

    Mount.prototype._toArray = function(data) {
      var arr, i, len;
      if (typeof data === 'string') {
        arr = new Array(data.length);
        i = 0;
        len = data.length;
        while (i < len) {
          arr[i] = data.charCodeAt(i);
          ++i;
        }
        return arr;
      }
      return data;
    };

    return Mount;

  })();

}).call(this);
