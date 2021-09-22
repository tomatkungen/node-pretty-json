import { cPrettyUtil } from "./pretty-util";

export enum eToken {
    START_CURLY_SQUARE_BRACKET  = '[',
    END_CURLY_SQUARE_BRACKET    = ']',
    START_SQUARE_BRACKET        = '[',
    END_SQUARE_BRACKET          = ']',
    DELIMITER                   = ',',
    CARRIGE_RETURN              = '\n',
    SPACE                       = '--',
    VALUE                       = 'value',
    NULL                        = 'null'
}

export interface iPrettyConfig {
    propertyBreak: number;
    indent: number;
    currentIndex: number;
    currentLength: number;
}

export interface iPrettyArray extends Array<{}> {};

interface iPrettyObject {
    [index: string]: tokenType;
}

export type tokenType = 
    | iPrettyArray
    | iPrettyObject
    | number
    | boolean
    | string
    | symbol
    | undefined
    | null;

class cPrettyPrint {
    private prevToken: eToken;
    
    constructor() {
        this.prevToken = eToken.NULL;
    }

    public static prettyPrint(value: iPrettyArray, propertyBreak: number, indent: number): string {
        return (new cPrettyPrint()).state(value, {
            propertyBreak,
            indent,
            currentIndex: 0,
            currentLength: 0,
        });
    }

    private state(value: tokenType, config: iPrettyConfig): string {
        // Array
        const aryLines = (
            cPrettyUtil.isArray(value) &&
            this.prtArray(
                value as iPrettyArray,
                { ...config, indent: config.indent + 1}
            )
        ) || '';

        // Object
        const objLines = (
            cPrettyUtil.isObject(value) &&
            this.prtObject(
                value as iPrettyObject,
                {...config, indent: config.indent + 1}
            )
        ) || '';
        
        // Number
        const numLine = (
            cPrettyUtil.isNumber(value) &&
            this.prtToken(value, config)
        ) || '';

        // boolean
        const bolLine = ((
            cPrettyUtil.isBoolean(value) &&
            this.prtToken(`${value as boolean}`, config)
        ) || '');

        // // String
        const strLine = ((
            cPrettyUtil.isString(value) &&
            this.prtToken(`'${value as string}'`, config)
        ) || '');
        
        // null
        const undefinedLine = ((
            cPrettyUtil.isUndefined(value) &&
            this.prtToken(`undefined`, config)
        ) || '');

        // undefined
        const nullLine = ((
            cPrettyUtil.isNull(value) &&
            this.prtToken(`null`, config)
        ) || '');

        // symbol
        const symbolLine = ((
            cPrettyUtil.isSymbol(value) &&
            this.prtToken(`symbol`, config)
        ) || '');

        return `${symbolLine}${nullLine}${undefinedLine}${strLine}${bolLine}${numLine}${aryLines}${objLines}`;
    }

    private prtObject(obj: iPrettyObject, config: iPrettyConfig): string {
        console.log('iiiiii');
        const strBeginBracketsLine = this.prtBeginBracket(config, eToken.START_CURLY_SQUARE_BRACKET);

        const objLines = '';

        const strEndBracketsLine = this.prtEndBracket(config, eToken.END_CURLY_SQUARE_BRACKET);
        
        return `${strBeginBracketsLine}${objLines}${strEndBracketsLine}`;
    }

    private prtArray(ary: iPrettyArray, config: iPrettyConfig): string {

        const strBeginBracketsLine = this.prtBeginBracket(config, eToken.START_SQUARE_BRACKET);

        const aryLines = ary.map((currentValue, index, ary) => {

            config.currentIndex = index;
            config.currentLength = ary.length;

            const aryState = this.state(
                currentValue as iPrettyArray,
                config
            );

            return `${aryState}`;
        }).join('');

        const strEndBracketsLine = this.prtEndBracket(config, eToken.END_SQUARE_BRACKET);
        
        return `${strBeginBracketsLine}${aryLines}${strEndBracketsLine}`;
    }

    private prtToken<T>(value: T, config: iPrettyConfig): string {
        return [
            cPrettyUtil.isSpace(config, this.prevToken) && this.prtSpaces(config.indent) || '',
            this.prtValue(value),
            cPrettyUtil.isDelimiter(config) && this.prtDelimiter() || '',
            (
                (
                    cPrettyUtil.isCarriageReturn(config) ||
                    !cPrettyUtil.isDelimiter(config)
                ) && this.prtCarriageReturn()
            ) || '',
        ].join('');
    }
    
    private prtBeginBracket(config: iPrettyConfig, bracket: eToken) {
        return [
            (
                this.prevToken !== eToken.CARRIGE_RETURN &&
                this.prevToken !== eToken.NULL &&
                this.prtCarriageReturn()
            ) || '',
            this.prtSpaces(config.indent - 1, ),
            bracket,
            this.prtCarriageReturn(),
        ].join('');
    }

    private prtEndBracket(config: iPrettyConfig, bracket: eToken) {
        return [
            (
                this.prevToken !== eToken.NULL &&
                this.prevToken !== eToken.CARRIGE_RETURN &&
                this.prtCarriageReturn()
            ) || '',
            this.prtSpaces(config.indent - 1),
            bracket,
            (
                cPrettyUtil.isDelimiter(config) ||
                config.indent >= 2
            ) && this.prtDelimiter() || '',
            this.prtCarriageReturn(),
        ].join('');
    }

    private prtValue<T>(value: T) {
        this.prevToken = eToken.VALUE;
        
        return value;
    }

    private prtSpaces(numSpaces: number): string {
        this.prevToken = eToken.SPACE;

        return (new Array(2 * numSpaces + 1)).join(eToken.SPACE);
    }

    private prtDelimiter() {
        this.prevToken = eToken.DELIMITER;

        return eToken.DELIMITER;
    }

    private prtCarriageReturn() {
        this.prevToken = eToken.CARRIGE_RETURN;

        return eToken.CARRIGE_RETURN;
    }

    private prtStartSquareBracket() {
        this.prevToken = eToken.START_SQUARE_BRACKET;

        return eToken.START_SQUARE_BRACKET;
    }

    private prtEndSquareBracket() {
        this.prevToken = eToken.END_SQUARE_BRACKET;

        return eToken.END_SQUARE_BRACKET;
    }
}

export { cPrettyPrint };



