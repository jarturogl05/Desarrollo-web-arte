

const {resizeImageBuffer, applySmartCrop} = require('../images-helper/imageReziser');
const {uploadImageMiniature, uploadImagePost, uploadImageProfile} = require('../images-helper/image-uploader')


const createPost = async(req, res) =>{
    var bufferResize = await resizeImageBuffer(req.file.buffer);
   // var bufferMiniature = await applySmartCrop(bufferResize, '', 512, 512);
    var result = await uploadImagePost(bufferResize);
    console.log(result);
    if(result){
        res.status(200).send('Archivo subido exitosamente...')
    }
}

module.exports = {createPost}