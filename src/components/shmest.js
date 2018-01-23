
function test() {
    let b = 2;
    let a = {b};

    return a.b
}
let c = test();
console.log(c);
