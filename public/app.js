

function fetchAndVisualizeData(year) {
  let data = {}
  fetch("./data.json")
    .then(r => r.json())
    .then(r => {
      data.matchesPlayedPerYear = r.matchesPlayedPerYear

      fetch("./matchesWonPerTeam.json")
      .then(r => r.json())
      .then(r => {
        data.matchesWonPerTeam = r.matchesWonPerTeam

        fetch("./extraRuns.json")
        .then(r => r.json())
        .then(r => {
          data.extraRuns = r.extraRuns[year]
          // console.log("extra", data.extraRuns)

          fetch("./bowlersEconomyRate2015.json")
          .then(r => r.json())
          .then(r => {
            data.bowlersEconomyRate2015 = r.bowlersEconomyRate2015[year]
          visualizeData(data,year)
        })
        
      })
    })
 })
}
 fetchAndVisualizeData("2008");


 function visualizeData(data, year) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear, data.matchesWonPerTeam, data.extraRuns, data.bowlersEconomyRate2015, year);
  return;
 }

 function visualizeMatchesPlayedPerYear(matchesPlayedPerYear, matchesWonPerTeam, extraRuns, bowlersEconomyRate2015, year) {
  const seriesData = [];
  const seriesData2= [];
  const seriesData3 = [];
  const seriesData4 = []
  // console.log(matchesPlayedPerYear, matchesWonPerTeam, extraRuns2016, bowlersEconomyRate2015)
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  for (let team in matchesWonPerTeam) {
    seriesData2.push([team, matchesWonPerTeam[team]]);
  }

  for (let bowlingTeam in extraRuns) {
    seriesData3.push([bowlingTeam, extraRuns[bowlingTeam]])
  }

  for (let bowlers in bowlersEconomyRate2015) {
    seriesData4.push([bowlers, bowlersEconomyRate2015[bowlers]])
  }

  // console.log(seriesData, seriesData2, seriesData3, seriesData4)
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });

  Highcharts.chart("matches-won-per-team", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Won Per Team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches Won"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData2
      }
    ]
  });
  
  Highcharts.chart("extra-runs-2016", {
    chart: {
      type: "column"
    },
    title: {
      text: `Extra runs ${year}`
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra runs"
      }
    },
    series: [
      {
        name: "Bowling Team",
        data: seriesData3
      }
    ]
  });

  Highcharts.chart("bowlers-economy-rate-2015", {
    chart: {
      type: "column"
    },
    title: {
      text: `Bowlers Economy Rate ${year}`
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData4
      }
    ]
  });
 
}
clicked =() => {
  let x  = document.getElementById("year");
  if(x.value>2019||x.value<2008) {
    alert("Year out of range")
  } else{
    fetchAndVisualizeData(x.value.toString())
  }
}