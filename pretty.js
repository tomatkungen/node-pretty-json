var test = (() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // source/pretty-print.ts
  var pretty_print_exports = {};
  __export(pretty_print_exports, {
    cPrettyPrint: () => cPrettyPrint,
    eToken: () => eToken
  });

  // source/pretty-util.ts
  var cPrettyUtil = class {
    static isArray(value) {
      return Array.isArray(value);
    }
    static isNumber(value) {
      return typeof value === "number";
    }
    static isBoolean(value) {
      return typeof value === "boolean";
    }
    static isObject(value) {
      return typeof value === "object" && !Array.isArray(value) && value !== null;
    }
    static isUndefined(value) {
      return value === void 0;
    }
    static isNull(value) {
      return value === null;
    }
    static isString(value) {
      return typeof value === "string";
    }
    static isSymbol(value) {
      return typeof value === "symbol";
    }
    static isSpace(config, prevToken) {
      if (config.currentIndex === 0)
        return true;
      return cPrettyUtil.isCarriageReturn({
        ...config,
        currentIndex: config.currentIndex - 1
      }) || prevToken === eToken.CARRIGE_RETURN;
    }
    static isCarriageReturn(config) {
      if (config.propertyBreak === 0)
        return true;
      return (config.currentIndex + 1) % config.propertyBreak === 0;
    }
    static isDelimiter(config) {
      return config.currentIndex !== config.currentLength - 1;
    }
  };

  // source/pretty-print.ts
  var eToken;
  (function(eToken2) {
    eToken2["START_CURLY_SQUARE_BRACKET"] = "{";
    eToken2["END_CURLY_SQUARE_BRACKET"] = "}";
    eToken2["START_SQUARE_BRACKET"] = "[";
    eToken2["END_SQUARE_BRACKET"] = "]";
    eToken2["DELIMITER"] = ",";
    eToken2["CARRIGE_RETURN"] = "\n";
    eToken2["SPACE"] = "  ";
    eToken2["VALUE"] = "value";
    eToken2["NULL"] = "null";
  })(eToken || (eToken = {}));
  var cPrettyPrint = class {
    prevToken;
    constructor() {
      this.prevToken = eToken.NULL;
    }
    static prettyPrint(value, propertyBreak, indent) {
      return new cPrettyPrint().state(value, {
        propertyBreak,
        indent,
        currentIndex: 0,
        currentLength: 0
      });
    }
    state(value, config) {
      const aryLines = cPrettyUtil.isArray(value) && this.prtArray(value, { ...config, indent: config.indent + 1 }) || "";
      const objLines = cPrettyUtil.isObject(value) && this.prtObject(value, { ...config, indent: config.indent + 1 }) || "";
      const numLine = cPrettyUtil.isNumber(value) && this.prtToken(value, config) || "";
      const bolLine = cPrettyUtil.isBoolean(value) && this.prtToken(`${value}`, config) || "";
      const strLine = cPrettyUtil.isString(value) && this.prtToken(`'${value}'`, config) || "";
      const undefinedLine = cPrettyUtil.isUndefined(value) && this.prtToken(`undefined`, config) || "";
      const nullLine = cPrettyUtil.isNull(value) && this.prtToken(`null`, config) || "";
      const symbolLine = cPrettyUtil.isSymbol(value) && this.prtToken(`symbol`, config) || "";
      return `${symbolLine}${nullLine}${undefinedLine}${strLine}${bolLine}${numLine}${aryLines}${objLines}`;
    }
    prtObject(obj, config) {
      const strBeginBracketsLine = this.prtBeginBracket(config, eToken.START_CURLY_SQUARE_BRACKET);
      const objLines = Object.keys(obj).map((key, index) => {
        config.currentIndex = index;
        config.currentLength = Object.keys(obj).length;
        if (cPrettyUtil.isArray(obj[key]) || cPrettyUtil.isObject(obj[key]) || cPrettyUtil.isSymbol(obj[key])) {
          const objState = this.state(obj[key], config);
          return `${objState}`;
        }
        return this.prtToken(`${key}: ${String(obj[key])}`, config);
      }).join("");
      const strEndBracketsLine = this.prtEndBracket(config, eToken.END_CURLY_SQUARE_BRACKET);
      return `${strBeginBracketsLine}${objLines}${strEndBracketsLine}`;
    }
    prtArray(ary, config) {
      const strBeginBracketsLine = this.prtBeginBracket(config, eToken.START_SQUARE_BRACKET);
      const aryLines = ary.map((currentValue, index, ary2) => {
        config.currentIndex = index;
        config.currentLength = ary2.length;
        const aryState = this.state(currentValue, config);
        return `${aryState}`;
      }).join("");
      const strEndBracketsLine = this.prtEndBracket(config, eToken.END_SQUARE_BRACKET);
      return `${strBeginBracketsLine}${aryLines}${strEndBracketsLine}`;
    }
    prtToken(value, config) {
      return [
        cPrettyUtil.isSpace(config, this.prevToken) && this.prtSpaces(config.indent) || "",
        this.prtValue(value),
        cPrettyUtil.isDelimiter(config) && this.prtDelimiter() || "",
        (cPrettyUtil.isCarriageReturn(config) || !cPrettyUtil.isDelimiter(config)) && this.prtCarriageReturn() || ""
      ].join("");
    }
    prtBeginBracket(config, bracket) {
      return [
        this.prevToken !== eToken.CARRIGE_RETURN && this.prevToken !== eToken.NULL && this.prtCarriageReturn() || "",
        this.prtSpaces(config.indent - 1),
        bracket,
        this.prtCarriageReturn()
      ].join("");
    }
    prtEndBracket(config, bracket) {
      return [
        this.prevToken !== eToken.NULL && this.prevToken !== eToken.CARRIGE_RETURN && this.prtCarriageReturn() || "",
        this.prtSpaces(config.indent - 1),
        bracket,
        (cPrettyUtil.isDelimiter(config) || config.indent >= 2) && this.prtDelimiter() || "",
        this.prtCarriageReturn()
      ].join("");
    }
    prtValue(value) {
      this.prevToken = eToken.VALUE;
      return value;
    }
    prtSpaces(numSpaces) {
      this.prevToken = eToken.SPACE;
      return new Array(2 * numSpaces + 1).join(eToken.SPACE);
    }
    prtDelimiter() {
      this.prevToken = eToken.DELIMITER;
      return eToken.DELIMITER;
    }
    prtCarriageReturn() {
      this.prevToken = eToken.CARRIGE_RETURN;
      return eToken.CARRIGE_RETURN;
    }
    prtStartSquareBracket() {
      this.prevToken = eToken.START_SQUARE_BRACKET;
      return eToken.START_SQUARE_BRACKET;
    }
    prtEndSquareBracket() {
      this.prevToken = eToken.END_SQUARE_BRACKET;
      return eToken.END_SQUARE_BRACKET;
    }
  };
  return pretty_print_exports;
})();
