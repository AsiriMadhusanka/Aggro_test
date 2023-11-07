const fs = require('fs');
const readline = require('readline');

// Define the delay in seconds (10 minutes and 20 seconds)
const delaySeconds = 0 * 0 - 5;

// Input and output file names
const inputFileName = 'original_subtitle.srt';
const outputFileName = 'modified_subtitle.srt';

const readStream = fs.createReadStream(inputFileName);
const writeStream = fs.createWriteStream(outputFileName);

const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
  terminal: false
});

let lineNumber = 0;
let isSubtitleSection = false;

// Function to modify the time frames
function modifyTime(timeStr) {
  const [startTime, endTime] = timeStr.split(' --> ');
  const modifiedStartTime = modifySingleTime(startTime);
  const modifiedEndTime = modifySingleTime(endTime);
  return `${modifiedStartTime} --> ${modifiedEndTime}`;
}

function modifySingleTime(singleTime) {
  const [hh, mm, ss, ms] = singleTime.split(/[:,.]/).map(Number);
  const milliseconds = hh * 3600000 + mm * 60000 + ss * 1000 + ms + delaySeconds * 1000;
  const newHH = Math.floor(milliseconds / 3600000);
  const newMM = Math.floor((milliseconds % 3600000) / 60000);
  const newSS = Math.floor((milliseconds % 60000) / 1000);
  const newMS = milliseconds % 1000;
  return `${newHH.toString().padStart(2, '0')}:${newMM.toString().padStart(2, '0')}:${newSS.toString().padStart(2, '0')},${newMS.toString().padStart(3, '0')}`;
}

rl.on('line', (line) => {
  lineNumber++;

  if (lineNumber >= 812) {
    if (line.match(/ --> /)) {
      // Modify the time frames
      const modifiedTimeStr = modifyTime(line);
      writeStream.write(`${modifiedTimeStr}\n`);
    } else {
      // Write other lines as-is
      writeStream.write(`${line}\n`);
    }
  } else {
    // Write lines before subtitle number 812 as-is
    writeStream.write(`${line}\n`);
  }
});

rl.on('close', () => {
  console.log('Subtitle modification complete.');
});

// Close the write stream when done
writeStream.on('finish', () => {
  writeStream.end();
});
