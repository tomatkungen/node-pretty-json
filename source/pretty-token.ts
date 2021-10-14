import { cPrettyUtil } from "./pretty-util";

export enum eToken {
    START_CURLY_SQUARE_BRACKET  = '{',
    END_CURLY_SQUARE_BRACKET    = '}',
    START_SQUARE_BRACKET        = '[',
    END_SQUARE_BRACKET          = ']',
    DELIMITER                   = ',',
    CARRIGE_RETURN              = '\n',
    SPACE                       = ' ',
    VALUE                       = 'value',
    NULL                        = 'null',
    UNDEFINED                   = 'undefined',
    INDENT                      = '  '
}

class cPrettyToken {
    private _prevToken: eToken;

    constructor() {
        this._prevToken = eToken.NULL;
    }

    set prevToken(token: eToken) {
        this._prevToken = token;

        // for(const [key, value] of Object.entries(eToken)) {
        //     if (value === token) {
        //         console.log('key',key);
        //     }
        // }
    }

    get prevToken() {
        return this._prevToken;
    }

    protected prtIndent(numSpaces: number): string {
        this.prevToken = eToken.INDENT;
        
        return (new Array(2 * numSpaces + 1)).join(eToken.INDENT);
    }

    protected prtSpace(): string {
        return (this.prevToken = eToken.SPACE);
    }
    
    protected prtValue<T>(value: T) {
        this.prevToken = eToken.VALUE;

        return value;
    }
    
    protected prtDelimiter() {
        return (this.prevToken = eToken.DELIMITER);
    }

    protected prtCarriageReturn() {
        return (this.prevToken = eToken.CARRIGE_RETURN);
    }

    protected prtNull() {
        return (this.prevToken = eToken.NULL);
    }

    protected prtStartSquareBracket() {
        return (this.prevToken = eToken.START_SQUARE_BRACKET);
    }

    protected prtEndSquareBracket() {
        return (this.prevToken = eToken.END_SQUARE_BRACKET);
    }

    protected prtStartCurlyBracket() {
        return (this.prevToken = eToken.START_CURLY_SQUARE_BRACKET);
    }
}

export { cPrettyToken };