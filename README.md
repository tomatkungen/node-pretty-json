## NodeJs Pretty Json 

Example
```javascript
let example1 = [{a:2,b:2},'1',2,3,[4,5,6,[1,2,3,4,undefined]],7,8,[null,10, true, false]];

console.log(
    cPrettyPrint.prettyPrint(example1, 2, 0)
);
```
Result:
```
[
    {
        a: 2,b: 2
    },
    '1',
    2,3,
    [
        4,5,
        6,
        [
            1,2,
            3,4,
            undefined
        ],
    ],
    7,
    8,
    [
        null,10,
        true,false
    ],
]
```
