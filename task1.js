readline = require("readline");
Array = []
number_of_character = 0
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function containsOnlyAlphabets(str) {
    return /^[a-zA-Z]+$/.test(str);
  }
  function doesNotContainDigits(str) {
    return !/\d/.test(str);
  }
function containsOnlySpaceAndAlphabets(str) {
    return /^[a-zA-Z\s]+$/.test(str);
  }
  function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
  }
function ask_name_of_lang(input,name,idx) {
    const num_of_lang = input;
    rl.setPrompt(`Please Enter Name of the ${idx}st Language: `);
    rl.prompt();
    rl.on("line",inp => {
        if (!doesNotContainDigits(inp) || inp === ""){
            console.log("Please Enter Correct Name of Programming Language!")
            if (idx === 1){
                rl.setPrompt(`Please Enter Name of the ${idx}st Language: `)
                rl.prompt();
            }
            else if (idx === 2){
                rl.setPrompt(`Please Enter Name of the ${idx}nd Language: `)
                rl.prompt();
            }
            else if (idx === 3){
                rl.setPrompt(`Please Enter Name of the ${idx}rd Language: `)
                rl.prompt();
            }
            else{
                rl.setPrompt(`Please Enter Name of the ${idx}th Language: `)
                rl.prompt();
            }
            }

        else {
            idx++;
            Array.push(inp)
            number_of_character = number_of_character + inp.length;
            if (idx > num_of_lang){
                console.log(`Name: ${name}`)
                console.log(`list of favorite programming languages:`)
                for (i=0;i < Array.length;i++){
                    console.log(`Your favorite language is: ${Array[i]}`)
                }
                console.log(`The Total Character Count of The Langauges Name: ${number_of_character}`)
                rl.close();
            }
            else if (idx === 2){
                rl.setPrompt(`Please Enter Name of the ${idx}nd Language: `)
                rl.prompt();
            }
            else if (idx === 3){
                rl.setPrompt(`Please Enter Name of the ${idx}rd Language: `)
                rl.prompt();
            }
            else{
                rl.setPrompt(`Please Enter Name of the ${idx}th Language: `)
                rl.prompt();
            }
        }
        
    })

}
function ask_favorite(name){
    rl.question(`Hello ${name}, how many favorite programming languages they have? `,(input)=>{
        if (!containsOnlyDigits(input)){
            console.log("please Enter an Appropriate Number!")
            ask_favorite(name)
        }
        else{

            ask_name_of_lang(input,name,1);
        }
    });
}
function prompt_user(){
    rl.question("Please Enter Your Name: ",(name) => {
        if (name === "" || containsOnlySpaceAndAlphabets(name) === false){
            console.log("Please Enter Your Legal Name!")
            prompt_user();
        }
        else {
            ask_favorite(name);
        }
    })
}
prompt_user();
