"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(number) {
    const random = "SAFJKWEkfjaslieknmds123456789";
    const length = random.length;
    let ans = "";
    for (let i = 0; i < length; i++) {
        ans += random[Math.floor(Math.random() * number)];
    }
    return ans;
}
