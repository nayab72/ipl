const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerTeam = require("./ipl/matchesWonPerTeam");
const extraRuns = require("./ipl/extraRuns");
const bowlersEconomyRate2015 = require("./ipl/bowlersEconomyRate2015");

const Deleiveries_FILE_PATH = "./csv_data/deliveries.csv";
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const JSON_OUTPUT_FILE_PATH_MATCHES_WON = "./public/matchesWonPerTeam.json";
const JSON_OUTPUT_FILE_PATH_EXTRA_RUNS_2016 = "./public/extraRuns.json";
const JSON_OUTPUT_FILE_PATH_BOWLERS_ECONOMY_RATE_2015 = "./public/bowlersEconomyRate2015.json";

function main() {
  let data ={}
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let result = matchesPlayedPerYear(matches);
      saveMatchesPlayedPerYear(result);
      let result2 = matchesWonPerTeam(matches)
      saveMatchesWonPerTeam(result2)
      data.matches = matches

      csv()
      .fromFile(Deleiveries_FILE_PATH)
      .then(deliveries => {
        let result3 = extraRuns(matches, deliveries)
        saveExtraRuns(result3)
        let result4 = bowlersEconomyRate2015(matches, deliveries)
        saveBowlersEconomyRate2015(result4)
        
      })
    })
}

function saveMatchesPlayedPerYear(result) {
  const jsonData = {
    matchesPlayedPerYear: result
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

function saveMatchesWonPerTeam(result) {
  const jsonData = {
    matchesWonPerTeam: result
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH_MATCHES_WON, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

function  saveExtraRuns(result) {
  const jsonData = {
    extraRuns: result
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH_EXTRA_RUNS_2016, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

function saveBowlersEconomyRate2015(result) {
  const jsonData = {
    bowlersEconomyRate2015: result
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH_BOWLERS_ECONOMY_RATE_2015, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}



main();
