# Build scripts

### Run Nodejs

* Terminal: ./build-nodejs
* Terminal: ./run-nodejs

### Run-index-html Browser

* Terminal: ./build-index-html
* Browser: index.html

### Run-js-lib Browser

* Terminal: ./build-js-lib
* Browser: Include in js-lib
* Browser Console: Pretty.cPrettyPrint.prettyPrint({test:'a', test: 'b'}, 2, 0)

# NodeJs Pretty Json 

Run
```
Terminal: ./run-nodejs
```

Example
```javascript
let example1 = [{a:2,b:2},'1',2,3,[4,5,6,[1,2,3,4,undefined]],7,8,[null,10, true, false], (a: string,b: string) => {return a+b}];

console.log(
    cPrettyPrint.prettyPrint(example1, 2, 0)
);
```
Result:
```
[
    {
        "a": 2, "b": 2
    },
    "1",
    2, 3,
    [
        4, 5,
        6,
        [
            1, 2,
            3, 4,
            undefined
        ]
    ],
    7,
    8,
    [
        null, 10,
        true, false
    ],
    (a1, a2) => {...}
]
```

Example truncate
```javascript
let example1 = {a:[ 1,  2],b: [3,4],c: [5, 6]};

console.log(
    cPrettyPrint.prettyPrint(example1, 2, 0, true)
);
```

Result:
```
{
    "a": [ 1, 2 ],
    "b": [ 3, 4 ],
    "c": [ 5, 6 ]
}
```