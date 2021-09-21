import { eToken, iPrettyConfig } from "./pretty-print";

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
            !Array.isArray(value)
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

    public static isSpace(config: iPrettyConfig): boolean {
        if (config.currentIndex === 0)
            return true;

        return cPrettyUtil.isCarriageReturn(
            {
                ...config,
                currentIndex: config.currentIndex -1
            }
        ) || config.prevToken === eToken.CARRIGE_RETURN;
    }

    public static isCarriageReturn(config: iPrettyConfig): boolean {
        if (config.propertyBreak === 0)
            return true;
        
        return ((config.currentIndex +1) % config.propertyBreak) === 0;
    }

    public static isDelimiter(config: iPrettyConfig): boolean {
        return config.currentIndex !== (config.currentLength - 1);
    }
}