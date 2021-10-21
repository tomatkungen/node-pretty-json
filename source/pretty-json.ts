import { cPrettyPrint } from "./pretty-print";

// let example1 = {};
//  let example1 = [1,2];
//  let example1 = [1,2,3,4,5];
// let example1 = [1,[1]];
// let example1 = [1,2,[10]];
// let example1 = [1,2, () => {return 1}, function apa() {return 2}, (a: number, b: number) => (a+b), function test(a: number,b: string,c: boolean) {}]
// let example1 = [[1,2,3,4],[4,5,6,7]];
// let example1 = [[1,2,3,4],3,4,5,[4,5,6,7]];
// let example1 = [1,2,3,[4,5,6,[7,8,9]],[10,11,13,14,15],[1,2,3]];
// let example1 = [1,2,3,[4,5,6,[1,2,3,4,5]],7,8,[11,10, 12, 13]];
// let example1 = ['1',2,3,[4,5,6,[1,2,3,4,undefined]],7,8,[null,10, true, false]];
// let example1 = {a:1 , b:2, c:3, d: 2,e:[1,2,3], f: 2, h: { a: 1, b:2 ,c:3}}
// let example1 = {a:2,b:2,c:{a:1,b: [1,2,true], d: true, e: undefined}};
// let example1 = [{a:2,b:2},'1',2,3,[4,5,6,[1,2,3,4,undefined]],7,8,[null,10, true, false], (a: string,b: string) => {return a+b}];
// let example1 = { 'hejsan': 'hejsan', 'hejsans': 'hejsan'}
//  let example1 = [1, [2, [3, [4,[5,[6]]]]]];
let example1 = {a:1,b:{c:2,d:{e:3,f:{g:4,h:{i:5,j:{k:6,l:{}}}}}}}
console.log(
    cPrettyPrint.prettyPrint(example1, 2, 0)
);

/*
    [1,2,3,4,5,6] {a:1, b:2, c: [1,2,3, [1,2,3], [1,2,2] ]}=>

    INDEXBREAK 2, INDENT 1
    [
        1,2,
        2,3,
        5,6
    ]

    {
        a: 1, b: 2,
        c:
        [
            1, 2,
            3,
            [
                1, 2,
                3
            ],
            [
                1, 2,
                2,
            ]
        ]
    }

    INDEXBREAK 0, INDENT 0
    [
        1, 2, 3, 4
    ]

    {
        a: 1, b: 2, c:
        [
            1, 2, 3,
            [
                1, 2, 3
            ],
            [
                1, 2, 3
            ]
        ]
    }

    noBreakArray
    [ 1, 2, 3, 4 ]

    { // return [ noReturn , noReturn ] return ,
        a: 1, b: 2, c:
        [ 1, 2, 3,
            [ 1, 2, 3],
            [ 1, 2, 3]
        ]
    }
*/

