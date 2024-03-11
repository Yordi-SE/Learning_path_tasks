const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let words: string[] = [];
type HashMap = {
    [key: string]: number;
}
const seta: Set<string> = new Set()
const hashmap: HashMap = {}
rl.question("Enter phrase with multiple words: ",(ans: string)=>{
    words = ans.split(" ");
    for (let i=0;i < words.length;i++) {
        if (words[i].toLowerCase() in hashmap){
            hashmap[words[i].toLowerCase()] = hashmap[words[i].toLowerCase()] + 1
        }
        else {
            hashmap[words[i].toLowerCase()] = 1
        }
    }
    console.log("The Word Count:")
    for (let key in words) {
        if (!seta.has(words[key].toLowerCase())){
            console.log(`${words[key]}: ${hashmap[words[key].toLowerCase()]}`)
            seta.add(words[key].toLowerCase())
        }
        
        
    }
    rl.close();
})