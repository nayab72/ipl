function bowlersEconomyRate2015 (matches, deliveries) {
    let totalRun = {};
    let totalBall = {};
    for (let match of matches) {
        // console.log("hello")
        const match_Id = match.id;
        while (match.season === "2015") {
            for (let del of deliveries) {
                const del_Id = del.match_id;
                if (match_Id === del_Id) {
                   if (totalRun[del.bowler]) {
                    totalRun[del.bowler] += parseInt(del.total_runs);
                    totalBall[del.bowler] += 1;
                   } else {
                    totalRun[del.bowler] = parseInt(del.total_runs);
                    totalBall[del.bowler] = 1;
                   }
                }
            }
            break;
        }
    }
    let bowlerNames = Object.keys(totalRun)
    const economy = [];
     
    for (let i = 0; i < bowlerNames.length; i++) {
        let eco = totalRun[bowlerNames[i]]/totalBall[bowlerNames[i]];
        economy.push({name: bowlerNames[i], economy: eco}); 
    }
    economy.sort((a,b) => b.economy-a.economy)
    // console.log(economy)
     
    const topTenEconomicalBowler = {};
    for (let i=0; i<10; i++) {
        
            topTenEconomicalBowler[economy[i].name] = economy[i].economy

    }
    console.log(topTenEconomicalBowler);
    return  topTenEconomicalBowler;
    
}
module.exports = bowlersEconomyRate2015