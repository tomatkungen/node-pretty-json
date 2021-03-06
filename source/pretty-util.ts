import { iPrettyConfig } from "./pretty-print";
import { eToken } from "./pretty-token";

export class cPrettyUtil {
    public static isArray<T>(value: T): boolean {
        return Array.isArray(value);
    }

    public static isNumber<T>(value: T): boolean {
        return typeof value === 'number';
    }

    public static isBoolean<T>(value: T): boolean {
        return typeof value === 'boolean';
    }

    public static isObject<T>(value: T): boolean {        
        return (
            typeof value === 'object' && 
            !Array.isArray(value) &&
            value !== null
        );
    }

    public static isUndefined<T>(value: T): boolean {
        return value === undefined;
    }

    public static isNull<T>(value: T): boolean {
        return value === null;
    }

    public static isString<T>(value: T): boolean {
        return typeof value === 'string';
    }

    public static isSymbol<T>(value: T): boolean {
        return typeof value === 'symbol';
    }

    public static isFunction<T>(value: T): boolean {
        return typeof value === 'function';
    }

    public static isToken<T>(value: T): boolean {
        return (
            cPrettyUtil.isNumber(value)     ||
            cPrettyUtil.isBoolean(value)    ||
            cPrettyUtil.isString(value)     ||
            cPrettyUtil.isUndefined(value)  ||
            cPrettyUtil.isNull(value)       ||
            cPrettyUtil.isSymbol(value)     ||
            cPrettyUtil.isFunction(value)
        );
    }

    public static isPrevCarriageReturn(prevToken: eToken): boolean {
        return prevToken === eToken.CARRIGE_RETURN;
    }

    public static isPrevIndent(prevToken: eToken): boolean {
        return prevToken === eToken.INDENT;
    }

    public static isNotPrevCarriageReturn(prevToken: eToken): boolean {
        return (
            prevToken !== eToken.CARRIGE_RETURN &&
            prevToken !== eToken.NULL
        );
    }

    public static isIndexBreak(config: iPrettyConfig): boolean {
        return ((config.currentIndex + 1) % config.indexBreak) === 0;
    }

    public static isDelimiter(config: iPrettyConfig): boolean {
        return config.currentIndex !== (config.currentLength - 1);
    }
}