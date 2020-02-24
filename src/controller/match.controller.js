let rA = 400;
let rB = 400;


let eA = 1 / ( 1 + (10 ^ ( (rB-rA) / 400)));
let eB = 1 / ( 1 + (10 ^ ( (rA-rB) / 400)));

//A won
new_rA = rA + (16 * (1 - eA));
new_rB = rB + (16 * (0 - eB));

console.log(Math.floor(new_rA));
console.log(Math.floor(new_rB));

