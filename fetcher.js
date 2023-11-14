// fetcher takes a URL, and a local file path and downloads the resource at the URL to the
// path on my machine
const URL = process.argv[2];
const localFilePath = process.argv[3];

const request = require('request');
const fs = require('fs');

const fetcher = function(URL, localFilePath) {
  request(URL, (error, response, body) => {
    fs.writeFile(localFilePath, body, (err) => {
      if (err) {
        throw err;
      } console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
    });
  });
};

fetcher(URL, localFilePath);

// Upon completion it will print a message like:
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html