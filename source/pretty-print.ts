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
    private _deepBlock: number;
    private _trunk: boolean;

    constructor(trunk?: boolean) {
        super();

        this._deepBlock = 5;
        this._trunk = !!trunk;
    }

    public static prettyPrint(
        value: tokenType,
        indexBreak: number,
        indent: number,
        trunk?: boolean
    ): string {
        return (new cPrettyPrint(trunk)).state(
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
            deep <= this._deepBlock &&
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
                deep > this._deepBlock && eToken.DEEP_BLOCK || eToken.EMPTY,
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
            deep <= this._deepBlock &&
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
                deep > this._deepBlock && eToken.DEEP_BLOCK || eToken.EMPTY,
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

        if (this._trunk) {
            return [
                cPrettyUtil.isPrevCarriageReturn(super.prevToken) && super.prtIndent(config.indent) || '',
                `${super.prtKey(config.key)}${super.prtValue(value)}`,
                cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
                cPrettyUtil.isDelimiter(config) && super.prtSpace() || '',
            ].join('');
        }

        return [
            super._debug && 't-' || '',
            cPrettyUtil.isPrevCarriageReturn(super.prevToken) && super.prtIndent(config.indent) || '',
            `${super.prtKey(config.key)}${super.prtValue(value)}`,
            cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
            !cPrettyUtil.isIndexBreak(config) &&
            cPrettyUtil.isDelimiter(config) && super.prtSpace() || '',
            cPrettyUtil.isIndexBreak(config) && super.prtCarriageReturn() || '',
            super._debug && '-t' || '',
        ].join('');

    }
    
    private prtBeginBracket(config: iPrettyConfig, bracket: eToken): string {

        if (this._trunk) {
            return [
                (
                    cPrettyUtil.isNotPrevCarriageReturn(super.prevToken)
                    && super.prtCarriageReturn()
                ) || '',
                super.prtIndent(config.indent - 1),
                `${super.prtKey(config.key)}${super.prtValue(bracket)}`,
                super.prtSpace()
            ].join('');
        }

        return [
            super._debug && 'b-' || '',
            (
                cPrettyUtil.isNotPrevCarriageReturn(this.prevToken)
                && super.prtCarriageReturn()
            ) ||'',
            super.prtIndent(config.indent - 1),
            `${super.prtKey(config.key)}${super.prtValue(bracket)}`,
            super.prtCarriageReturn(),
            super._debug && '-b' || '',
        ].join('');

    }

    private prtEndBracket(config: iPrettyConfig, bracket: eToken) {

        if (this._trunk) {
            return [
                (
                    cPrettyUtil.isPrevCarriageReturn(this.prevToken) &&
                    super.prtIndent(config.indent - 1)
                ) || '',
                (
                    cPrettyUtil.isNotPrevCarriageReturn(this.prevToken) &&
                    !cPrettyUtil.isPrevIndent(this.prevToken) &&
                    super.prtSpace()
                ) || '',
                super.prtValue(bracket),
                cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
                super.prtCarriageReturn(),
            ].join('');
        }

        return [
            super._debug && 'e-' || '',
            (
                cPrettyUtil.isNotPrevCarriageReturn(this.prevToken)
                && super.prtCarriageReturn()
            ) || '',
            super.prtIndent(config.indent - 1),
            super.prtValue(bracket),
            cPrettyUtil.isDelimiter(config) && super.prtDelimiter() || '',
            super.prtCarriageReturn(),
            super._debug && '-e' || '',
        ].join('');

    }
}

export { cPrettyPrint };
