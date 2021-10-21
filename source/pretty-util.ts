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

    public static isIndent(config: iPrettyConfig, prevToken: eToken): boolean {
        return prevToken === eToken.CARRIGE_RETURN;
        // if (config.currentIndex === 0)
        //     return true;

        // return cPrettyUtil.isCarriageReturn(
        //     {
        //         ...config,
        //         currentIndex: config.currentIndex -1
        //     }
        // ) || prevToken === eToken.CARRIGE_RETURN;
    }

    public static isCarriageReturn(config: iPrettyConfig, prevToken: eToken): boolean {
        console.log('index',config.currentIndex, config.currentLength);
        // if (
        //     config.currentIndex === 0 ||
        //     config.currentIndex === config.currentLength
        // ) {
        //     return true;
        // }

        return ((config.currentIndex + 1) % config.indexBreak) === 0;
    }

    public static isStartBracketCarriageReturn(prevToken: eToken): boolean {
        return (
            prevToken !== eToken.CARRIGE_RETURN &&
            prevToken !== eToken.NULL
        );
    }

    public static isTokenCarrigeReturn(config: iPrettyConfig): boolean {
        return ((config.currentIndex + 1) % config.indexBreak) === 0;
    }

    public static isDelimiter(config: iPrettyConfig): boolean {
        return config.currentIndex !== (config.currentLength - 1);
    }
}