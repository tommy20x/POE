const request = require('request');
const fs = require("fs");
const moment = require("moment");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getPublicStashTabs = function(id, callback) {
  console.log("read: id=", id);
  
  const host = "https://api.pathofexile.com/public-stash-tabs";
  const url = id ? `${host}?id=${id}` : host;

  request(url, { json: true }, (err, res, body) => {
    if (err) { 
      console.log("error:", err);
    }
    else {
      callback(id, body);
    }
  });
}

const read_callback = function(id, data) {
  if (!data) {
    console.log("invalid data")
    return
  }

  const { next_change_id, stashes } = data;
  console.log("callback: ", next_change_id, stashes.length);
  if (!stashes || stashes.length <= 0) {
    console.log("empty data")
    sleep(10).then(() => getPublicStashTabs(id, read_callback))
    return;
  }

  const time = moment().format('YYYY-MM-DD hh:mm:ss');
  const filename = id ? `./data/${time}_${id}.json` : `./data/${time}_000.json`;
  const json = JSON.stringify(data)
  fs.writeFile(filename, json, err => {
    if (err) {
      console.log('Error writing file', err)
    }
    else {
      console.log('sleep...')
      sleep(2).then(() => getPublicStashTabs(next_change_id, read_callback))
    }
  })
}

const startId = "1332775105-1338270987-1292949766-1443595517-1389651068";
getPublicStashTabs(startId, read_callback);

