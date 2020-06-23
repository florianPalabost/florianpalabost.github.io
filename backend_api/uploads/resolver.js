const fs = require('fs');

const storeFS = ({ stream, filename }) => {
  const uploadDir = __dirname + '/projects';
  const path = `${uploadDir}/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path }))
  );
};

const uploadImage = async args => {
  try {
    const { filename, mimetype, createReadStream } = await args.file.file;
    console.log(filename);

    const stream = createReadStream();
    const pathObj = await storeFS({ stream, filename });
    const fileLocation = pathObj.path;
    return { name: filename };
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  uploadImage
};
