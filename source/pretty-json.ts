import { cPrettyPrint } from "./pretty-print";
/*
{ A: { b: 2, b: 'd'}}

{ 'a': '2'} property string and string is string
{ a: ()=> { return 't'}} support function
*/


//let example1 = [1,[1]];
//let example1 = [1,2,[10]];
//let example1 = [1,2,3,[4,5,6,[7,8,9]],[10,11,13,14,15],[1,2,3]];
//let example1 = [1,2,3,[4,5,6,[1,2,3,4,5]],7,8,[11,10, 12, 13]];
//let example1 = ['1',2,3,[4,5,6,[1,2,3,4,undefined]],7,8,[null,10, true, false]];
//let example1 = {a:2,b:2,c:{a:1,b: [1,2,true], d: true, e: undefined}};
//let example1 = [{a:2,b:2},'1',2,3,[4,5,6,[1,2,3,4,undefined]],7,8,[null,10, true, false]];
let example1 = { 'hejsan': 'hejsan', 'hejsans': 'hejsan'}

console.log(
    cPrettyPrint.prettyPrint(example1, 2, 0)
);

