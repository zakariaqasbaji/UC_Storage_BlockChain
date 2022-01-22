const { Blockchain, Block } = require('./blockchain');
const { verifyBlockChain } =require('./verification_fun');


//initialisation
var jsonFile='./UCDB.json'
var data = JSON.parse(fs.readFileSync(jsonFile).toString());
let UCChain=new Blockchain();
//console.log(JSON.stringify(archiveChain,null,4))
UCChain.chain=data["chain"].map((x) => x)
if(UCChain.chain.length== 0){
UCChain.chain.push(UCChain.createGenesisBlock())
}



//Manipulation

//UCChain.addBlock(new Block(2,Date.now(), "C:/Users/LEnovo X250/OneDrive/Bureau/blockchain UC/test.txt", '0'));
console.log("Is blockchain is Valid?",verifyBlockChain(UCChain))







//save changes in jsonFile
const FileSystem = require("fs");
 FileSystem.writeFile(jsonFile, JSON.stringify(UCChain,null,4), (error) => {
    if (error) throw error;
  });