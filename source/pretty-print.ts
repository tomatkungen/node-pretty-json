import { cPrettyToken, eToken } from "./pretty-token";
import { cPrettyUtil } from "./pretty-util";

export interface iPrettyConfig {
    indexBreak: number;
    indent: number;
    currentIndex: number;
    currentLength: number;
    key?: string;
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
        return (new cPrettyPrint()).state(
            value,
            {
                indexBreak,
                indent,
                currentIndex: 0,
                currentLength: 1,
            },
            0
        );
    }

    private state(value: tokenType, config: iPrettyConfig, deep: number): string {

        // Array
        const aryLines = (
            cPrettyUtil.isArray(value) &&
            this.prtArray(
                value as iPrettyArray,
                {
                    ...config,
                    indent: config.indent + 1,
                },
                deep + 1
            )
        ) || '';

        // Object
        const objLines = (
            cPrettyUtil.isObject(value) &&
            this.prtObject(
                value as iPrettyObject,
                {
                    ...config,
                    indent: config.indent + 1,
                },
                deep + 1
            )
        ) || '';

        // Number, Boolean, String, Undefine, Null, Symbol, Function
        const tknLine =
        (
            cPrettyUtil.isToken(value) &&
            this.prtToken(value, config)
        ) || '';
        
        return `${tknLine}${aryLines}${objLines}`;
    }

    private prtObject(obj: iPrettyObject, config: iPrettyConfig, deep: number): string {

        const strBeginBracketsLine = this.prtBeginBracket(
            config,
            eToken.START_CURLY_SQUARE_BRACKET
        );

        const objLines = (
            deep <= 5 &&
            Object.keys(obj).map((key: string, index, current) => {

                const objState = this.state(
                    obj[key],
                    {
                        ...config,
                        currentIndex: index,
                        currentLength: current.length,
                        key,
                    },
                    deep
                );

                return `${objState}`;
            }).join('') ||
            this.prtToken(
                deep > 5 && eToken.DEEP_BLOCK || eToken.EMPTY,
                {
                    ...config,
                    currentIndex: 0,
                    currentLength: 1,
                    key: undefined
                }
            )
        );

        const strEndBracketsLine = this.prtEndBracket(
            config,
            eToken.END_CURLY_SQUARE_BRACKET
        );
        
        return `${strBeginBracketsLine}${objLines}${strEndBracketsLine}`;
    }

    private prtArray(ary: iPrettyArray, config: iPrettyConfig, deep: number): string {

        const strBeginBracketsLine = this.prtBeginBracket(
            config,
            eToken.START_SQUARE_BRACKET
        );

        const aryLines = (
            deep <= 5 &&
            ary.map((currentValue, index, current) => {
                const aryState = this.state(
                    currentValue,
                    {
                        ...config,
                        currentIndex: index,
                        currentLength: current.length,
                        key: undefined,
                    },
                    deep
                );

                return `${aryState}`;
            }).join('') ||
            this.prtToken(
                deep > 5 && eToken.DEEP_BLOCK || eToken.EMPTY,
                {
                    ...config,
                    currentIndex: 0,
                    currentLength: 1,
                    key: undefined
                }
            )
        );

        const strEndBracketsLine = this.prtEndBracket(
            config,
            eToken.END_SQUARE_BRACKET
        );

        return `${strBeginBracketsLine}${aryLines}${strEndBracketsLine}`;
    }

    private prtToken(value: tokenType, config: iPrettyConfig): string {

        return [
            super._debug && 't-' || '',
            cPrettyUtil.isIndent(config, super.prevToken) && super.prtIndent(config.indent) || '',
            `${super.prtKey(config.key)}${super.prtValue(value)}`,
            cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
            !cPrettyUtil.isTokenCarrigeReturn(config) &&
            cPrettyUtil.isDelimiter(config) && super.prtSpace() || '',
            cPrettyUtil.isTokenCarrigeReturn(config) && super.prtCarriageReturn() || '',
            super._debug && '-t' || '',
        ].join('');
    }
    
    private prtBeginBracket(config: iPrettyConfig, bracket: eToken) {

        return [
            super._debug && 'b-' || '',
            (
                cPrettyUtil.isStartBracketCarriageReturn(this.prevToken)
                && super.prtCarriageReturn()
            ) ||'',
            super.prtIndent(config.indent - 1),
            `${super.prtKey(config.key)}${super.prtValue(bracket)}`,
            super.prtCarriageReturn(),
            super._debug && '-b' || '',
        ].join('');
    }

    private prtEndBracket(config: iPrettyConfig, bracket: eToken) {

        return [
            super._debug && 'e-' || '',
            (
                cPrettyUtil.isStartBracketCarriageReturn(this.prevToken)
                && super.prtCarriageReturn()
            ) ||'',
            super.prtIndent(config.indent - 1),
            super.prtValue(bracket),
            cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
            super.prtCarriageReturn(),
            super._debug && '-e' || '',
        ].join('');
    }
}

export { cPrettyPrint };
