// fetcher takes a URL, and a local file path and downloads the resource at the URL to the
// path on my machine
const URL = process.argv[2];
const localFilePath = process.argv[3];

const request = require('request');
const fs = require('fs');
const { constants } = require('buffer');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetcher = function (URL, localFilePath) {
  request(URL, (error, response, body) => {
    if (error) {
      return console.log("error found", error);
    }
    fs.access(localFilePath, constants.F_OK, (err) => {
      if (err) {
        fs.writeFile(localFilePath, body, (err) => {
          if (err) {
            throw err;
          } console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
          rl.close();
        });
      } else rl.question("This file already exists, do you want to overwrite", (answer) => {
        if (answer === "y") {
          fs.writeFile(localFilePath, body, (err) => {
            if (err) {
              throw err;
            } console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
            rl.close();
          });
        } else rl.close();
      });
    });

  });
};

fetcher(URL, localFilePath);

// Upon completion it will print a message like:
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html