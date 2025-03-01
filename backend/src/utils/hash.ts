

export function random (number: number){   
    const random:String = "SAFJKWEkfjaslieknmds123456789"; 
    const length:number = random.length;
    let ans = "";


    for(let i = 0; i<length; i++){ 
        ans += random[Math.floor(Math.random() * number)];
    }
    return ans
}
