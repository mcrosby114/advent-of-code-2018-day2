/**
 * For each Advent of Code input page, run this code to get an JSON-encoded array of strings:
 * JSON.stringify(document.querySelector('body > pre').innerHTML.trim().split('\n'))
 *
 * Then upload as JSON in the format: { "values": ["...", "..."] }
 */

export const apiMap = {
  "1-1": "https://api.myjson.com/bins/163eqm",
  "1-2": "https://api.myjson.com/bins/163eqm",
  "2-1": "https://api.myjson.com/bins/18qdpy",
  "2-2": "https://api.myjson.com/bins/18qdpy",
  "3-1": "https://api.myjson.com/bins/6rnk6",
  "3-2": "",
  "4-1": "",
  "4-2": "",
  "5-1": "",
  "5-2": "",
  "6-1": "",
  "6-2": "",
  "7-1": "",
  "7-2": "",
  "8-1": "",
  "8-2": "",
  "9-1": "",
  "9-2": "",
  "10-1": "",
  "10-2": "",
  "11-1": "",
  "11-2": "",
  "12-1": "",
  "12-2": "",
  "13-1": "",
  "13-2": "",
  "14-1": "",
  "14-2": "",
  "15-1": "",
  "15-2": "",
  "16-1": "",
  "16-2": "",
  "17-1": "",
  "17-2": "",
  "18-1": "",
  "18-2": "",
  "19-1": "",
  "19-2": "",
  "20-1": "",
  "20-2": "",
  "21-1": "",
  "21-2": "",
  "22-1": "",
  "22-2": "",
  "23-1": "",
  "23-2": "",
  "24-1": "",
  "24-2": "",
  "25-1": "",
  "25-2": ""
};

export const fetchPuzzleInput = index =>
  fetch(apiMap[index])
    .then(response => response.json())
    .then(json => json.values);
