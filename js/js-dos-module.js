(function() {
  Dosbox.Module = (function() {
    function Module(options) {
      this.elCanvas = options.canvas;
      this.canvas = this.elCanvas[0];
    }

    Module.prototype.preRun = [];

    Module.prototype.postRun = [];

    Module.prototype.totalDependencies = 0;

    Module.prototype.print = function(text) {
      text = Array.prototype.slice.call(arguments).join(' ');
      return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(text) : void 0 : void 0;
    };

    Module.prototype.printErr = function(text) {
      text = Array.prototype.slice.call(arguments).join(' ');
      return typeof console !== "undefined" && console !== null ? typeof console.error === "function" ? console.error(text) : void 0 : void 0;
    };

    Module.prototype.setStatus = function(text) {
      return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(text) : void 0 : void 0;
    };

    Module.prototype.monitorRunDependencies = function(left) {
      var status;
      this.totalDependencies = Math.max(this.totalDependencies, left);
      status = left ? "Preparing... (" + (this.totalDependencies - left) + "/" + this.totalDependencies + ")" : 'All downloads complete.';
      return this.setStatus(status);
    };

    return Module;

  })();

}).call(this);
