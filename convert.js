const execa = require('execa');
const util = require('electron-util');

// node-ffmpeg-installer
// Installs ffmpeg based on the environment/OS.
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

// Fix binary path.
// https://git.io/vpSrn
const ffmpegPath = util.fixPathForAsarUnpack(ffmpeg.path);

const convert = (args, outputPath) => {
  return new Promise((resolve, reject) => {
    // Add output path to args.
    args.push(outputPath);

    // Spawn ffmpeg child process using execa.
    const converter = execa(ffmpegPath, args);

    // Log progress from ffmpeg.
    converter.stderr.setEncoding('utf8');
    converter.stderr.on('data', data => {
      console.log(data);
    });

    // Reject promise on ffmpeg error.
    converter.on('error', reject);
    converter.catch(reject);

    // Once ffmpeg is done, check for errors and
    // resolve with output path.
    converter.on('exit', code => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(new Error(`ffmpeg exited with code: ${code}`));
      }
    });
  });
};

module.exports = convert;
