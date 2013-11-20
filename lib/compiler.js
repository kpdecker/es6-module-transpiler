import AMDCompiler from './amd_compiler';
import YUICompiler from './yui_compiler';
import CJSCompiler from './cjs_compiler';
import GlobalsCompiler from './globals_compiler';
import { Unique } from './utils';
import Parser from './parser';

/**
 * Public interface to the transpiler.
 *
 * @class Compiler
 * @constructor
 * @param {String} string Input string.
 * @param {String} moduleName The name of the module to output.
 * @param {Object} options Configuration object.
 */
class Compiler {
  constructor(string, moduleName, options) {
    if (moduleName == null) {
      moduleName = null;
    }

    if (options == null) {
      options = {};
    }

    this.string = string;
    this.moduleName = moduleName;
    this.options = options;

    this.inBlockComment = false;
    this.reExportUnique = new Unique('reexport');

    this.parse();
  }

  parse() {
    var parser = new Parser(this.string);
    this.imports = parser.imports;
    this.exports = parser.exports;
    this.exportDefault = parser.exportDefault;
    this.directives = parser.directives;
  }

  /**
   * Transpiles an ES6 module to AMD.
   * @method toAMD
   * @return {String} The transpiled output
   */
  toAMD() {
    return new AMDCompiler(this, this.options).stringify();
  }

  /**
   * Transpiles an ES6 module to YUI.
   * @method toYUI
   * @return {String} The transpiled output
   */
  toYUI() {
    return new YUICompiler(this, this.options).stringify();
  }

  /**
   * Transpiles an ES6 module to CJS.
   * @method toCJS
   * @return {String} The transpiled output
   */
  toCJS() {
    return new CJSCompiler(this, this.options).stringify();
  }

  /**
   * Transpiles an ES6 module to IIFE-wrapped globals.
   * @method toGlobals
   * @return {String} The transpiled output
   */
  toGlobals() {
    return new GlobalsCompiler(this, this.options).stringify();
  }
}

export default Compiler;
