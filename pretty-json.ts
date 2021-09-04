import { cPrettyPrint } from "./pretty-print";

//let example1 = [1,2,3,[4,5,6,[7,8,9]],[10,11,13,14,15]];
let example1 = [1,2,3,[4,5,6,],7];

cPrettyPrint.prettyPrint(example1, 1, 0);


/*const prettyPrint = (pretty) => {

    // console.log(`${pretty.type} ${pretty.name} = ${
    //     state(pretty.variable, 0, 1, 0)
    // }`);

    [0,1,2,3,4,5].forEach((intBreak) => {
        if (intBreak === 1) {
            console.log('break:', intBreak);
            console.log(state(pretty.variable, intBreak, 0, null, null));
        }
    });
    
}


const prtArray = (ary, propertyBreak, indent, index, length) => {

    const strBeginBrackets = prtBeginBracket(propertyBreak, index, indent) || '';

    const aryLines = ary.map((current, childIndex, ary) => {

        return `${state(current, propertyBreak, indent, childIndex, ary.length)}`;

    }).join('');

    const strEndBrackets = prtEndBracket(propertyBreak, ary.length - 1, indent, length)

    return `${strBeginBrackets}${aryLines}${strEndBrackets}`;
};

const prtValue = (value, propertyBreak, indent, index, length) => {
    return [
        isSpace(propertyBreak, index) && space(indent) || '',
        `${value}`,
        isDelimiter(index, length) && delimiter() || '',
        isCarrigeReturn(propertyBreak, index) && carrigeReturn() || '',
    ].join('');
};

const prtBeginBracket = (propertyBreak, index, indent) => {
    return [
        (indent > 1 && !isCarrigeReturn(propertyBreak, index - 1) && carrigeReturn()) || '',
        space(indent - 1),
        bSquareBracket(),
        carrigeReturn(),
    ].join('');
}

const prtEndBracket = (propertyBreak, index, indent, length) => {
    console.log(propertyBreak, index, indent);
    return [
        (indent > 1 && !isCarrigeReturn(propertyBreak, index) && carrigeReturn()) || '',
        space(indent - 1),
        eSquareBracket(),
        isDelimiter(index, length) && delimiter() || '',
        carrigeReturn(),
    ].join('');
}

// private
const state = (value, propertyBreak, indent, index, length) => {
    const aryLines          = isArray(value)    && prtArray(value, propertyBreak, indent + 1, index, length) || '';
    const numLine           = isNumber(value)   && prtValue(value, propertyBreak, indent, index, length) || '';

    return `${numLine}${aryLines}`;
}

// Util

const isNumber = (val) => {
    return typeof val === 'number';
};

const isArray = (val) => {
    return Array.isArray(val);
}

const isSpace = (propertyBreak, index) => {
    if (index === 0) {
        return true;
    }

    return isCarrigeReturn(propertyBreak, index - 1);
}

const isDelimiter = (currentIndex, aryLength) => {
    return currentIndex !== (aryLength - 1);
}

const isCarrigeReturn = (propertyBreak, index) => {
    if (propertyBreak === 0) 
        return true;

    return ((index + 1) % propertyBreak) === 0;
}

// Token

const space = (numSpace) => {
    return (new Array(2 * numSpace + 1)).join('--');
}

const carrigeReturn = () => {
    return '\n';
}

const delimiter = () => {
    return ',';
}

const bSquareBracket = () => {
    return '[';
}

const eSquareBracket = () => {
    return ']';
}

// Code


//let example1 = [1,2,3,[4,5,6,[7,8,9]],[10,11,13,14,15]];
let example1 = [1,2,3,[4,5,6,],7];

prettyPrint({
    type: 'const',
    name: 'example1',
    variable: example1,
});*/

