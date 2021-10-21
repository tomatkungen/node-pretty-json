import { tokenType } from "./pretty-print";
import { cPrettyUtil } from "./pretty-util";

export enum eToken {
    START_CURLY_SQUARE_BRACKET  = '{',
    END_CURLY_SQUARE_BRACKET    = '}',
    START_SQUARE_BRACKET        = '[',
    END_SQUARE_BRACKET          = ']',
    DELIMITER                   = ',',
    CARRIGE_RETURN              = '\n',
    SPACE                       = ' ',
    NULL                        = 'null',
    UNDEFINED                   = 'undefined',
    INDENT                      = '  ',
    SYMBOL                      = 'symbol',
    TRUE                        = 'true',
    FALSE                       = 'false',
    FUNCTION                    = 'function',
    NUMBER                      = 'number',
    STRING                      = 'string',
    KEY                         = 'key'
}

class cPrettyToken {
    private _prevToken: eToken;
    protected _debug: boolean;

    constructor() {
        this._prevToken = eToken.NULL;
        this._debug     = false;
    }

    set prevToken(token: eToken) {
        this._prevToken = token;

        if (this._debug === false)
            return;

        for(const [key, value] of Object.entries(eToken)) {
            if (value === token) {
                console.log(key);
            }
        }
    }

    get prevToken() {
        return this._prevToken;
    }

    protected prtValue(value: tokenType): string {
        return (
            this.prtNumber(value as number)     ||
            this.prtBoolean(value as boolean)   ||
            this.prtString(value as string)     ||
            this.prtUndefined(value as undefined) ||
            this.prtNull(value as null)         ||
            this.prtSymbol(value as symbol)     ||
            this.prtFunction(value as any)      ||
            ''
        );
    }

    protected prtKey(value?: string): string {
        if (!cPrettyUtil.isString(value))
         return '';

        this.prevToken = eToken.KEY;

        return `"${value}": `;
    }

    protected prtString(value: string): string {
        if (!cPrettyUtil.isString(value))
            return '';

        this.prevToken = eToken.STRING;

        return (
            [
                eToken.START_CURLY_SQUARE_BRACKET,
                eToken.END_CURLY_SQUARE_BRACKET,
                eToken.START_SQUARE_BRACKET,
                eToken.END_SQUARE_BRACKET
            ].includes(value as eToken) === true ?
            `${value}` :
            `"${value}"`
        );
    }

    protected prtFunction(fn: () => void): string {
        if (!cPrettyUtil.isFunction(fn))
            return '';

        this.prevToken = eToken.FUNCTION;

        const args = [];
        for(let i = 1; i <= Array(fn.length).length; i++) {
            args.push(`a${i}`);
        }

        return `${
            fn.name ? `function ${fn.name}` : ''
        }(${
            args.join(', ')
        }) => {...}`;
    }

    protected prtIndent(numSpaces: number): string {
        this.prevToken = eToken.INDENT;
        
        return (new Array(2 * numSpaces + 1)).join(eToken.INDENT);
    }

    protected prtSpace(): string {
        return (this.prevToken = eToken.SPACE);
    }

    protected prtDelimiter(): string {
        return (this.prevToken = eToken.DELIMITER);
    }

    protected prtBoolean(value: boolean): string {
        if (!cPrettyUtil.isBoolean(value))
            return '';

        return (
            this.prevToken = value ? eToken.TRUE : eToken.FALSE
        );
    }

    protected prtNumber(value: number): string {
        if (!cPrettyUtil.isNumber(value))
            return '';

        this.prevToken = eToken.NUMBER;
        return `${value}`;
    }

    protected prtCarriageReturn(): string {
        return (this.prevToken = eToken.CARRIGE_RETURN);
    }

    protected prtNull(value: null): string {
        if (!cPrettyUtil.isNull(value))
            return '';

        return (this.prevToken = eToken.NULL);
    }

    protected prtUndefined(value: undefined): string {
        if (!cPrettyUtil.isUndefined(value))
            return '';

        return (this.prevToken = eToken.UNDEFINED);
    }

    protected prtSymbol(value: any): string {
        if (!cPrettyUtil.isSymbol(value))
            return '';

        return (this.prevToken = eToken.SYMBOL);
    }

    protected prtStartSquareBracket(): string {
        return (this.prevToken = eToken.START_SQUARE_BRACKET);
    }

    protected prtEndSquareBracket(): string {
        return (this.prevToken = eToken.END_SQUARE_BRACKET);
    }

    protected prtStartCurlyBracket(): string {
        return (this.prevToken = eToken.START_CURLY_SQUARE_BRACKET);
    }
}

export { cPrettyToken };