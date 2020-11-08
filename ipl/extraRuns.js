function extraRuns(matches, deliveries) {
    const result = {};
    for (let match of matches) {
        for (let delivery of deliveries) {
            if(match.id === delivery.match_id) {
                if(result[match.season]=== undefined) {
                    result[match.season] ={}
                }   
                if(result[match.season][delivery.bowling_team]) {
                    result[match.season][delivery.bowling_team] += parseInt(delivery.extra_runs);
                } else {
                    result[match.season][delivery.bowling_team] = parseInt(delivery.extra_runs);
                }
            }
        }
    }
    return result;
  
}
module.exports = extraRuns