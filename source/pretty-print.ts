import { cPrettyToken, eToken } from "./pretty-token";
import { cPrettyUtil } from "./pretty-util";

export interface iPrettyConfig {
    indexBreak: number;
    indent: number;
    currentIndex: number;
    currentLength: number;
}

export interface iPrettyArray extends Array<{}> {};

interface iPrettyObject {
    [index: string]: tokenType;
}

export type tokenType = 
    | iPrettyObject
    | iPrettyArray
    | number
    | boolean
    | string
    | symbol
    | undefined
    | null;

class cPrettyPrint extends cPrettyToken {    
    constructor() {
        super();
    }

    public static prettyPrint(value: tokenType, indexBreak: number, indent: number): string {
        return (new cPrettyPrint()).state(value, {
            indexBreak,
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
            this.prtToken(`"${value as string}"`, config)
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
        const strBeginBracketsLine = this.prtBeginBracket(config, eToken.START_CURLY_SQUARE_BRACKET);

        const objLines = Object.keys(obj).map((key: string, index) => {

            config.currentIndex = index;
            config.currentLength = Object.keys(obj).length;

            if (
                cPrettyUtil.isArray(obj[key]) ||
                cPrettyUtil.isObject(obj[key]) ||
                cPrettyUtil.isSymbol(obj[key])
            ) {
                const objState = this.state(
                    obj[key],
                    config,
                );

                return `${objState}`;
            }

            return this.prtToken(`"${key}": ${String(obj[key])}`, config);
        }).join('');

        const strEndBracketsLine = this.prtEndBracket(config, eToken.END_CURLY_SQUARE_BRACKET);
        
        return `${strBeginBracketsLine}${objLines}${strEndBracketsLine}`;
    }

    private prtArray(ary: iPrettyArray, config: iPrettyConfig): string {

        const strBeginBracketsLine = this.prtBeginBracket(config, eToken.START_SQUARE_BRACKET);

        const aryLines = ary.map((currentValue, index, ary) => {

            config.currentIndex = index;
            config.currentLength = ary.length;

            const aryState = this.state(
                currentValue,
                config
            );

            return `${aryState}`;
        }).join('');

        const strEndBracketsLine = this.prtEndBracket(config, eToken.END_SQUARE_BRACKET);
        
        return `${strBeginBracketsLine}${aryLines}${strEndBracketsLine}`;
    }

    private prtToken<T>(value: T, config: iPrettyConfig): string {

        return [
            cPrettyUtil.isIndent(config, super.prevToken) && super.prtIndent(config.indent) || '',
            super.prtValue(value),
            cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
            (
                (
                    cPrettyUtil.isCarriageReturn(config) ||
                    !cPrettyUtil.isDelimiter(config)
                ) && super.prtCarriageReturn()
            ) || '',
        ].join('');        
    }
    
    private prtBeginBracket(config: iPrettyConfig, bracket: eToken) {
        return [
            (
                super.prevToken !== eToken.CARRIGE_RETURN &&
                super.prevToken !== eToken.NULL &&
                super.prtCarriageReturn()
            ) || '',
            this.prtIndent(config.indent - 1),
            bracket,
            super.prtCarriageReturn(),
        ].join('');
    }

    private prtEndBracket(config: iPrettyConfig, bracket: eToken) {
        return [
            (
                super.prevToken !== eToken.NULL &&
                super.prevToken !== eToken.CARRIGE_RETURN &&
                super.prtCarriageReturn()
            ) || '',
            this.prtIndent(config.indent - 1),
            bracket,
            (
                cPrettyUtil.isDelimiter(config) ||
                config.indent >= 2
            ) && super.prtDelimiter() || '',
            super.prtCarriageReturn(),
        ].join('');
    }
}

export { cPrettyPrint };



