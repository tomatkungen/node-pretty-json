import { cPrettyUtil } from "./pretty-util";

export enum eToken {
    START_SQUARE_BRACKET    = '[',
    END_SQUARE_BRACKET      = ']',
    DELIMITER               = ',',
    CARRIGE_RETURN          = '\n',
    SPACE                   = '--',
    VALUE                   = 'value',
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
        console.log('',config);
        // Array
        const aryLines  = (
            cPrettyUtil.isArray(value) &&
            this.prtArray(value as iPrettyArray, {...config, indent: config.indent + 1})
        ) || '';0
        
        // Number
        const numLine   = (
            cPrettyUtil.isNumber(value) &&
            this.prtToken(value, config)
        ) || '';
        
        return `${numLine}${aryLines}`;
    }

    private prtArray(ary: iPrettyArray, config: iPrettyConfig): string {

        const strBeginBracketsLine = this.prtBeginBracket(config);

        const aryLines = ary.map((currentValue, index, ary) => {

            config.currentIndex = index;
            config.currentLength = ary.length;

            const aryState = this.state(
                currentValue as iPrettyArray,
                config
            );

            return `${aryState}`;
        }).join('');

        const strEndBracketsLine = this.prtEndBracket(config);
        
        return `${strBeginBracketsLine}${aryLines}${strEndBracketsLine}`;
    }

    private prtToken<T>(value: T, config: iPrettyConfig): string {
        return [
            cPrettyUtil.isSpace(config) && this.prtSpaces(config.indent, config) || '',
            this.prtValue(value, config),
            cPrettyUtil.isDelimiter(config) && this.prtDelimiter(config) || '',
            (
                (
                    cPrettyUtil.isCarriageReturn(config) ||
                    !cPrettyUtil.isDelimiter(config)
                ) && this.prtCarriageReturn(config)
            ) || '',
        ].join('');
    }
    
    private prtBeginBracket(config: iPrettyConfig) {
        return [
            (
                config.prevToken !== eToken.CARRIGE_RETURN &&
                config.prevToken !== eToken.NULL &&
                this.prtCarriageReturn(config)
                // config.indent > 1 && !cPrettyUtil.isCarriageReturn({
                //     ...config,
                //     currentIndex: config.currentIndex - 1
                // }) && eToken.CARRIGE_RETURN
            ) || '',
            this.prtSpaces(config.indent - 1, config),
            this.prtStartSquareBracket(config),
            this.prtCarriageReturn(config),
        ].join('');
    }

    private prtEndBracket(config: iPrettyConfig) {
        return [
            (
                config.prevToken !== eToken.NULL &&
                config.prevToken !== eToken.CARRIGE_RETURN &&
                this.prtCarriageReturn(config)
                // config.indent > 1 && 
                // !cPrettyUtil.isCarriageReturn(config) && 
                // this.prtCarriageReturn(config)
            ) || '',
            this.prtSpaces(config.indent - 1, config),
            this.prtEndSquareBracket(config),
            cPrettyUtil.isDelimiter(config) && this.prtDelimiter(config) || '',
            this.prtCarriageReturn(config),
        ].join('');
    }

    private prtValue<T>(value: T, config: iPrettyConfig) {
        config.prevToken = eToken.VALUE;

        return value;
    }

    private prtSpaces(numSpaces: number, config: iPrettyConfig): string {
        config.prevToken = eToken.SPACE;

        return (new Array(2 * numSpaces + 1)).join(eToken.SPACE);
    }

    private prtDelimiter(config: iPrettyConfig) {
        config.prevToken = eToken.DELIMITER;

        return eToken.DELIMITER;
    }

    private prtCarriageReturn(config: iPrettyConfig) {
        config.prevToken = eToken.CARRIGE_RETURN;

        return eToken.CARRIGE_RETURN;
    }

    private prtStartSquareBracket(config: iPrettyConfig) {
        config.prevToken = eToken.START_SQUARE_BRACKET;

        return eToken.START_SQUARE_BRACKET;
    }

    private prtEndSquareBracket(config: iPrettyConfig) {
        config.prevToken = eToken.END_SQUARE_BRACKET;

        return eToken.END_SQUARE_BRACKET;
    }
}

export { cPrettyPrint };



