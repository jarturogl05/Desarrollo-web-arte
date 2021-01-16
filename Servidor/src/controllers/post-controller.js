const Post = require('../mongo/models/post');

const {resizeImageBuffer, applySmartCrop} = require('../images-helper/imageReziser');
const {uploadImageMiniature, uploadImagePost, uploadImageProfile, createImageName} = require('../images-helper/image-uploader')
const URLBlob = 'https://imageswebart.blob.core.windows.net/'

const createPost = async(req, res) =>{
    const{autorId, date, name, workType, tags} = req.body;
    const blobImageName = createImageName(name);
    const blobThumbnailName = 'thumbnail' + createImageName(name);
    const URLImage = URLBlob + 'imagenes/' + blobImageName;
    const URLThumbnail = URLBlob + 'miniaturas/' + blobThumbnailName;

    try{
        await Post.create({
            autorId,
            date,
            name,
            workType,
            tags,
            URLImage,
            URLThumbnail,
        })

        var bufferResize = await resizeImageBuffer(req.file.buffer);
        var bufferThumbnail = await applySmartCrop(bufferResize, '', 512, 512);
        await uploadImagePost(bufferResize, blobImageName);
        await uploadImageMiniature(bufferThumbnail, blobThumbnailName)
        res.status(200).send({message: 'Registered Post'})
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}

const getPost = async (req, res) =>{
    const postId = req.params.post
    
    console.log(postId);
}


const getPostsList = async(req, res) =>{
    const numberPage = req.params.page
    const posts = await Post.paginate({},{limit:12, page:numberPage});
    res.status(200).send(posts);

}


const UploadProfile = async(req, res) =>{
    //var bufferResize = await resizeImageBuffer(req.file.buffer);
    var bufferMiniature = await applySmartCrop(req.file.buffer, '', 512, 512);
    var result = await uploadImageProfile(bufferMiniature);
    console.log(result);
    if(result){
        res.status(200).send('Archivo subido exitosamente...')
    }
}



module.exports = {createPost, UploadProfile, getPost, getPostsList}