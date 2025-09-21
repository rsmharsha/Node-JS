const fs = require('fs');


function readFile(fileName) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const words = data.trim().split(/\s+/); // split by any whitespace (spaces, newlines, tabs)
    console.log(words.length);
  });
}


readFile(process.argv[2]);

