const fileSytem = require("fs")

let mainfile = process.argv[2]
// text file
// whnenever there are changes.. we read the content of the file
// create a new file for the added word/words in the text file

function createFile(name){
    fileSytem.writeFile(`${name}.txt`, " jhjsd random text" , "utf-8", (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('file created');
        }
    } )

}

// original content
let originalContent = fileSytem.readFileSync(mainfile, "utf-8")
originalContent.split(" ").forEach(word=>createFile(word))

fileSytem.watch(mainfile, (eventType, filename)=>{
    console.log(eventType);
    if(eventType == "change"){
        // read new content
        // compare new vs old -- get new words
        //create a file for each new word
        let newContent = fileSytem.readFileSync(mainfile, "utf-8")
        const newWords = getNewWords(originalContent, newContent)
        newWords.forEach(word=>createFile(word))
    }
})

function getNewWords(string1, string2) {
    const words1 = string1.toLowerCase().split(' ');
    const words2 = string2.toLowerCase().split(' ');
    const uniqueWords = new Set(words1);
    const newWords = words2.filter(word => !uniqueWords.has(word));
    return newWords;
  }
  
  