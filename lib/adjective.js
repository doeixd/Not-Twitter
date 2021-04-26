import fs from 'fs'
import path from 'path'
const randomLineNum = Math.floor(Math.random() * (1347 - 1) + 1);

export default async function randomAdj(file = path.join(process.cwd(), '/lib/adj.txt'), line_no = randomLineNum,){
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file, {
        flags: 'r',
        encoding: 'utf-8',
        fd: null,
        mode: '0666',
        bufferSize: 64 * 1024
    });

    let fileData = '';
    let line;
    stream.on('data', (data) => {
      fileData += data;
      const lines = fileData.split('\n');

      if(lines.length >= +line_no){
        stream.destroy();
        line = lines[+line_no];
        resolve(line[0].toUpperCase() + line.slice(1))
      }
      else
          fileData = Array(lines.length).join('\n');
    });
    stream.on('error', (err) =>reject(err));
  })
};
