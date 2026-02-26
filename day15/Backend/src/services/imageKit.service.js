const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});



async function uplodeImage(image) {
    const file = await client.files.upload({
        file: await toFile(Buffer.from(image), "file"),
        fileName: "testImage",
        folder: 'insta-clone-post'
    });
    // console.log(file)
    return file;
}

module.exports = uplodeImage;