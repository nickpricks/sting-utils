(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./string-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var string_utils_1 = require("./string-utils");
    exports.cfl = string_utils_1.cfl;
    exports.capitalize = string_utils_1.capitalize;
    exports.pez = string_utils_1.pez;
    exports.stringify = string_utils_1.stringify;
    exports.uuid = string_utils_1.uuid;
});
