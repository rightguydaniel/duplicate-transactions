const transactions = [
  {
    id: 3,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:34:30.000Z',
  },
  {
    id: 1,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:33:00.000Z',
  },
  {
    id: 6,
    sourceAccount: 'A',
    targetAccount: 'C',
    amount: 250,
    category: 'other',
    time: '2018-03-02T10:33:05.000Z',
  },
  {
    id: 4,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:36:00.000Z',
  },
  {
    id: 2,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:33:50.000Z',
  },
  {
    id: 5,
    sourceAccount: 'A',
    targetAccount: 'C',
    amount: 250,
    category: 'other',
    time: '2018-03-02T10:33:00.000Z',
  },
];


function findDuplicateTransactions(transactions) {
  //clone the original transaction list
  let trxn = [...transactions]
  //sort the list by time in ascending order
  trxn.sort((a, b) => new Date(a.time) - new Date(b.time))
  //initialize all arrays needed
  let allTrxn = [];
  let groupedTrxn = []
  let dupTrxn = []
  let tmpTrxn = []
  //loop through transaction list

  if(typeof transactions !== "object"){
    throw new Error("Input must be an object")
  }

  if(transactions.length === 0){
    return []
  }
  
  while(trxn.length > 0){
    if(trxn.length>1){ 
      groupedTrxn.push(trxn[0])
      trxn.shift()

      //adding similar transactions to a group and moving duplicates to a tmp array
      while(trxn.length > 0){
        let timeDiff = ((new Date(trxn[0].time).getTime()) - (new Date(groupedTrxn[groupedTrxn.length - 1].time).getTime()))/1000
        // console.log(timeDiff)
        if(trxn[0].sourceAccount === groupedTrxn.at(-1).sourceAccount && trxn[0].targetAccount === groupedTrxn.at(-1).targetAccount && trxn[0].amount === groupedTrxn.at(-1).amount && trxn[0].category === groupedTrxn.at(-1).category && timeDiff < 60 ){
          groupedTrxn.push(trxn[0]);
          trxn.shift();
        }else{
          tmpTrxn.push(trxn[0]);
          trxn.shift();
        }
      }
      allTrxn.push(groupedTrxn);//push group of similar transactions into all transaction group
      groupedTrxn = []; //empty the group for next round
      trxn = tmpTrxn; //move transactions from tmp array to transaction list for next iteration
      tmpTrxn = []; //empty the tmp array
    }else{ //if transaction list is only one create an array for it and push to all transactions
      groupedTrxn.push(trxn[0]);
      trxn.shift();
      allTrxn.push(groupedTrxn);
    }
  }
  //move all duplicate transactions to a separate group 
  for(let i = 0; i < allTrxn.length; i++){
    if(allTrxn[i].length > 1){
      dupTrxn.push(allTrxn[i])
    }
  }
  // console.log(dupTrxn)
  //return and array of arrays of all duplicate transactions 
  return dupTrxn
}
findDuplicateTransactions(transactions)

export default findDuplicateTransactions;