function extraRuns2016(matches, deliveries) {
    const result = {};
    for (let match of matches) {
        while(match.season === "2016") {
            const match_Id = match.id;
            for (let delivery of deliveries) {
                const del_Id = delivery.match_id;
                if(match_Id == del_Id ) {
                    if(result[delivery.bowling_team]) {
                        result[delivery.bowling_team] += parseInt(delivery.extra_runs);
                    } else {
                        result[delivery.bowling_team] = parseInt(delivery.extra_runs);
                    }
                    
                }
       
            }
            break;
        }
    }
    
    return result;
  
}
module.exports = extraRuns2016