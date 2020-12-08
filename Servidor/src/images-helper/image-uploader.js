const azurestorage = require('azure-storage');
const config = require ('./config');
const dotenv = require('dotenv');

dotenv.config();

const blobService = azurestorage.createBlobService();
const containerNamePosts = 'imagenes';
const containerNameMiniature = 'miniaturas';
const containerNameProfile = 'perfil';
const getStream = require ('into-stream');



async function uploadImagePost(buffer){
    const blobName = 'prueba.jpg';
    const stream = getStream(buffer);
    const streamLength = buffer.length;
    blobService.createBlockBlobFromStream(containerNamePosts, blobName, stream, streamLength, err =>{
      if(err){
        console.log(err);
        return false;
      }
    });

    return true;

}


function uploadImageMiniature(stream){

}


function uploadImageProfile(stream){

}


module.exports = {uploadImageMiniature, uploadImagePost, uploadImageProfile}