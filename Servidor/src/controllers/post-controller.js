const Post = require('../mongo/models/post');
const Users = require('../mongo/models/user.js');
const tokenService = require('./token-service');


const {resizeImageBuffer, applySmartCrop} = require('../images-helper/imageReziser');
const {uploadImageMiniature, uploadImagePost, uploadImageProfile, createImageName} = require('../images-helper/image-uploader')
const URLBlob = 'https://imageswebart.blob.core.windows.net/'

const createPost = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(403).send("Access Forbidden");
  } else {
    const { description, name, workType, tags } = req.body;
    try {
      const tokenCode = req.headers.authorization;
      const token = tokenCode.split(" ")[1];
      const tokenResult = await tokenService.decodeToken(token);
      if (tokenResult.message === "Token expired") {
        res.status(500).send({ status: "ERROR", message: "error" });
      } else {
        const username = tokenResult;
        const user = await Users.find({ username: username });
        const autorId = user[0]._id;

        const newtags = tags.replace(/\s/g, "").split(",");
        const blobImageName = createImageName(name);
        const blobThumbnailName = "thumbnail" + createImageName(name);
        const URLImage = URLBlob + "imagenes/" + blobImageName;
        const URLThumbnail = URLBlob + "miniaturas/" + blobThumbnailName;

        await Post.create({
          autorId,
          name,
          description,
          workType,
          tags: newtags,
          URLImage,
          URLThumbnail,
        });

        var bufferResize = await resizeImageBuffer(req.file.buffer);
        var bufferThumbnail = await applySmartCrop(bufferResize, "", 512, 512);
        await uploadImagePost(bufferResize, blobImageName);
        await uploadImageMiniature(bufferThumbnail, blobThumbnailName);
        res.status(200).send({ message: "Registered Post" });
      }
    } catch (e) {
      res.status(500).send({ status: "ERROR", message: "error" });
    }
  }
};

const getPost = async (req, res) =>{
    const postId = req.params.id;
    try{
      const post = await Post.findById(postId);
      res.status(200).send({status:'OK', post});
    }catch (e) {
      res.status(500).send({ status: "ERROR", message: "error" });
    }

    
}

const getPostsByAutor = async (req, res) => {
    const ID = req.params.autorID;
    const numberPage = req.params.page;
    try{
      const posts = await Post.paginate({autorId : ID},{select:'URLThumbnail', limit:6, page:numberPage, sort:{_id: -1, createdAt: -1}});
      res.status(200).send(posts);

    } catch (e) {
      res.status(500).send({ status: "ERROR", message: "error" });
    }
}

const getPostsByAutorName = async (req, res) => {
  const name = req.params.autorName;
  const numberPage = req.params.page;
  try {
    const user = await Users.findOne({ username: name });
    const posts = await Post.paginate(
      { autorId: user._id },
      {
        select: "URLThumbnail",
        limit: 6,
        page: numberPage,
        sort: { _id: -1, createdAt: -1 },
      }
    );
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send({ status: "ERROR", message: "error" });
  }
};


const getPostsList = async(req, res) =>{
    const numberPage = req.params.page
    try{
      const posts = await Post.paginate({},{ select:'URLThumbnail',  limit:6, page:numberPage, sort:{_id: -1, createdAt: -1}  });
      res.status(200).send(posts);
    }catch (e) {
      res.status(500).send({ status: "ERROR", message: "error" });
    }

}


const UploadProfile = async(req, res) =>{
    var bufferMiniature = await applySmartCrop(req.file.buffer, '', 512, 512);
    var result = await uploadImageProfile(bufferMiniature);
    console.log(result);
    if(result){
        res.status(200).send('Archivo subido exitosamente...')
    }
}

module.exports = {createPost, UploadProfile, getPost, getPostsList, getPostsByAutor,getPostsByAutorName }