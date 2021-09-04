import { cPrettyUtil } from "./pretty-util";

export enum eToken {
    START_SQUARE_BRACKET    = '[',
    END_SQUARE_BRACKET      = ']',
    DELIMITER               = ',',
    CARRIGE_RETURN          = '\n',
    SPACE                   = '--',
    NUMBER                  = 'number',
    NULL                    = 'null'
}

export interface iPrettyConfig {
    propertyBreak: number;
    indent: number;
    currentIndex: number;
    currentLength: number;
    prevToken: eToken;
}

export interface iPrettyArray extends Array<{}> {};

class cPrettyPrint {
    constructor() {}

    public static prettyPrint(value: iPrettyArray, propertyBreak: number, indent: number): string {
        return (new cPrettyPrint()).state(value, {
            propertyBreak,
            indent,
            currentIndex: 0,
            currentLength: 0,
            prevToken: eToken.NULL
        });
    }

    private state(value: iPrettyArray | number, config: iPrettyConfig): string {
        const aryLines  = cPrettyUtil.isArray(value)    && this.prtArray(value as iPrettyArray, config);
        const numLine   = cPrettyUtil.isNumber(value)   && this.prtValue(value, config);
        
        return `${numLine}${aryLines}`;
    }

    private prtArray(ary: iPrettyArray, config: iPrettyConfig): string {
        
        const strBeginBracketsLine = this.prtBeginBracket(config);

        const aryLines = ary.map((current, index, ary) => {
            const aryState = this.state(
                current as iPrettyArray,
                {
                    ...config,
                    currentIndex: index,
                    currentLength: ary.length,
                    indent: (config.indent + 1)
                }
            );
            return `${aryState}`;
        }).join('');

        const strEndBracketsLine = this.prtEndBracket(config);
        
        return `${strBeginBracketsLine}${aryLines}${strEndBracketsLine}`;
    }

    private prtValue<T>(value: T, config: iPrettyConfig): string {
        return [
            cPrettyUtil.isSpace(config) && this.prtSpaces(config.indent) || '',
            `${value}`,
            cPrettyUtil.isDelimiter(config) && eToken.DELIMITER || '',
            cPrettyUtil.isCarriageReturn(config) && eToken.CARRIGE_RETURN || '',
        ].join('');
    }
    
    private prtBeginBracket(config: iPrettyConfig) {
        console.log('prtBeginBracket',config);
        return [
            (config.indent > 1 && !cPrettyUtil.isCarriageReturn({
                ...config,
                currentIndex: config.currentIndex - 1
            }) && eToken.CARRIGE_RETURN) || '',
            this.prtSpaces(config.indent - 1),
            eToken.START_SQUARE_BRACKET,
            eToken.CARRIGE_RETURN,
        ].join('');
    }

    private prtEndBracket(config: iPrettyConfig) {
        return [
            (config.indent > 1 && !cPrettyUtil.isCarriageReturn(config) && eToken.CARRIGE_RETURN) || '',
            this.prtSpaces(config.indent - 1),
            eToken.END_SQUARE_BRACKET,
            cPrettyUtil.isDelimiter(config) && eToken.DELIMITER || '',
            eToken.CARRIGE_RETURN,
        ].join('');
    }

    private prtSpaces(numSpaces: number): string {
        return (new Array(2 * numSpaces + 1)).join(eToken.SPACE);
    }
}

export { cPrettyPrint };



