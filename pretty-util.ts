import { eToken, iPrettyConfig } from "./pretty-print";

export class cPrettyUtil {
    public static isArray<T>(value: T): boolean {
        return Array.isArray(value);
    }

    public static isNumber<T>(value: T): boolean {
        return typeof value === 'number';
    }

    public static isSpace(config: iPrettyConfig): boolean {
        if (config.currentIndex === 0)
            return true;

        return config.prevToken === eToken.CARRIGE_RETURN;
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