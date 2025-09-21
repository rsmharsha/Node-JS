const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('1.0.0');

// Count lines command
program.command('count_lines')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      } else {
        const lines = data.trim().split(/\r?\n/).length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

// Count words command
program.command('count_words')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      } else {
        const words = data.trim().split(/\s+/).length;
        console.log(`There are ${words} words in ${file}`);
      }
    });
  });

program.parse();
