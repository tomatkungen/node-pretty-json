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
Terminal: ./run
```

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
