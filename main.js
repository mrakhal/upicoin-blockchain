const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp,transactions,previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //PROOF OF WORK
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block("25/08/2020","Sentimental Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully minied! ')
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null,miningRewardAddress, this.miningReward)
        ]; //reset pending transactions
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    
    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            } 
            
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let upicoin = new Blockchain();

upicoin.createTransaction(new Transaction('address1','address2', 100))
upicoin.createTransaction(new Transaction('address2','address1', 50))
// console.log('Mining Block 1 ')
// upicoin.addBlock(new Block(1,"23/08/2020",{amount: 4 }));
// console.log('Mining Block 2 ')
// upicoin.addBlock(new Block(2,"25/08/2020",{amount: 10 }));
console.log(`\n Strting the miner...`);
upicoin.minePendingTransactions('mrakhalf-address');
console.log(`\n Balance of mrakhalf is`, upicoin.getBalanceOfAddress('mrakhalf-address'));

console.log(`\n Strting the miner again...`);
upicoin.minePendingTransactions('mrakhalf-address');
console.log(`\n Balance of mrakhalf is`, upicoin.getBalanceOfAddress('mrakhalf-address'));