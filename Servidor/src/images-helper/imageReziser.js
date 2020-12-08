const sharp = require('sharp');
sharp.cache(false);

const smartcrop = require('smartcrop-sharp');


//usada para imagenes normales
async function resizeImageBuffer (stream){
    var buffer = '';
    await sharp(stream)
     .jpeg({ quality: 60, force: true })
     .withMetadata()
     .toBuffer()
     .then( (data) =>{
       buffer = data
     })
  
    return buffer;
}


//Usada para miniaturas y fotos de perfil
async function applySmartCrop(src, dest, width, height) {
    var buffer = '';
  
    return smartcrop.crop(src, { width: width, height: height })
      .then(function(result) {
        const crop = result.topCrop;
        return sharp(src)
          .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
          .resize(width, height)
          // .toFile(dest);
          .toBuffer()
      })
}

module.exports = {applySmartCrop, resizeImageBuffer}