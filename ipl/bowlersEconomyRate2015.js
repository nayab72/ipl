function bowlersEconomyRate2015 (matches, deliveries) {
    let totalRun = {};
    let totalBall = {};
    for (let match of matches) {
        const match_Id = match.id;
        
            for (let del of deliveries) {
                const del_Id = del.match_id;
                if (match_Id === del_Id) {
                  if (totalRun[match.season] === undefined) {
                      totalRun[match.season] = {}
                      totalBall[match.season] = {}
                  }
                  if (totalRun[match.season][del.bowler]) {
                      totalRun[match.season][del.bowler]  += parseInt(del.total_runs)
                      totalBall[match.season][del.bowler] += 1
                  } else {
                      totalRun[match.season][del.bowler] = parseInt(del.total_runs)
                      totalBall[match.season][del.bowler] = 1
                  }
                }
            }
         
    }
    let ecoYears = Object.keys(totalRun)
    
    const economyByYears = {};
     
    for (let i = 0; i < ecoYears.length; i++) {
        let bowlersName = Object.keys(totalRun[ecoYears[i]])
        let years = {}
       /// years[ecoYears[i]] = []
        let ecoByYear = []
        for (let j = 0; j < bowlersName.length; j++) {
            let eco = totalRun[ecoYears[i]][bowlersName[j]]*6/totalBall[ecoYears[i]][bowlersName[j]];
            ecoByYear.push({name: bowlersName[j], economy: eco});
        }
        economyByYears[ecoYears[i]] = ecoByYear
        // economy.push(years) 
    }
    // console.log(economyByYears)
    // economy.sort((a,b) => b.economy-a.economy)
    // // console.log(economy)
    for(let i = 0;i<ecoYears.length; i++) {
        economyByYears[ecoYears[i]].sort((a,b)=> a.economy-b.economy)
    }
    // console.log(economecyByYears['2008'])
     
    const topTenEconomicalBowler = {};
    for(let j=0;j<ecoYears.length;j++) {
        topTenEconomicalBowler[ecoYears[j]] = {}
        for (let i=0; i<10; i++) {
            topTenEconomicalBowler[ecoYears[j]][economyByYears[ecoYears[j]][i].name]= economyByYears[ecoYears[j]][i].economy
            // console.log(economyByYears[ecoYears[j]][i].economy )        
        }
    }
    // console.log(topTenEconomicalBowler)
    // console.log(topTenEconomicalBowler['2008']);
    
    return  topTenEconomicalBowler;
    
}
module.exports = bowlersEconomyRate2015





