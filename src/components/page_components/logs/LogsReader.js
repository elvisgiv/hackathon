const gex = require('@skale-labs/skale-api');
//
export async function initLogs() {
    let accounts = await gex.w3.getAccounts();
    let account = accounts[0];
    let from = [];
    //
    let contracts = [
        {'manager': ['BountyGot']},
        {'nodes': ['NodeCreated', 'WithdrawDepositFromNodeComplete', 'WithdrawDepositFromNodeInit']},
        {'schains': ['SchainCreated', 'SchainNodes', 'WithdrawFromSchain']},
        {'token': ['Mint', 'Burn', 'Transfer']},
        {'validators': ['ValidatorCreated', 'ValidatorUpgraded', 'ValidatorsArray', 'VerdictWasSent',
            'MetricsWereCalculated', 'PeriodsWereSet']},
        {'groups': ['GroupAdded', 'ExceptionSet', 'GroupDeleted', 'GroupUpgraded', 'GroupGenerated']},
    ];
    //
    for (let i = 0; i < contracts.length; i++) {
        let contr = contracts[i];
        let contractName = Object.keys(contr)[0];
        //
        let arrOfEventNames = contr[contractName];
        //
        for (let y = 0; y < arrOfEventNames.length; y++) {
            let eventName = arrOfEventNames[y];
            //
            from.push( await gex.contract(contractName).web3contract.getPastEvents(eventName, {
                    filter: {_from: account},
                    fromBlock: 0,
                    toBlock: 'latest'
                }, function (error, events) {
                    if (error) console.error(error);
                })
            );
        }

    }
    //
    return from;
}

