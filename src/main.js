const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('c99dede2c50f9671e2d01777c10dabb46defbde423efbec9667aee40d5e4a6c8')
const myWalletAddress = myKey.getPublic('hex')

let upicoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress,'public key goes here', 10);
tx1.signTransaction(myKey);
upicoin.addTransaction(tx1);

// upicoin.createTransaction(new Transaction('address1','address2', 100))
// upicoin.createTransaction(new Transaction('address2','address1', 50))
// console.log('Mining Block 1 ')
// upicoin.addBlock(new Block(1,"23/08/2020",{amount: 4 }));
// console.log('Mining Block 2 ')
// upicoin.addBlock(new Block(2,"25/08/2020",{amount: 10 }));

// console.log(`\n Strting the miner...`);
// upicoin.minePendingTransactions('mrakhalf-address');
// console.log(`\n Balance of mrakhalf is`, upicoin.getBalanceOfAddress('mrakhalf-address'));

console.log(`\n Strting the miner...`);
upicoin.minePendingTransactions(myWalletAddress);
console.log(`\n Balance of mrakhalf is`, upicoin.getBalanceOfAddress(myWalletAddress));

upicoin.chain[1].transactions[0].amount = 1;

console.log(`Is Chain valid?`, upicoin.isChainValid());


// console.log(`\n Strting the miner again...`);
// upicoin.minePendingTransactions('mrakhalf-address');
// console.log(`\n Balance of mrakhalf is`, upicoin.getBalanceOfAddress('mrakhalf-address'));