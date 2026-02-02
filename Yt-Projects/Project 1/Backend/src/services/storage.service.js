const {ImageKit} = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
    const result = await imageKit.files.upload({
      file: buffer.toString("base64"), //required
      fileName: "image.jpg", //required
    });

  return result;
}


module.exports = uploadFile