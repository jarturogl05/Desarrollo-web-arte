const azurestorage = require('azure-storage');
const config = require ('./config');
const dotenv = require('dotenv');

dotenv.config();

const blobService = azurestorage.createBlobService();
const containerNamePosts = 'imagenes';
const containerNameMiniature = 'miniaturas';
const containerNameProfile = 'perfil';
const getStream = require ('into-stream');



async function uploadImagePost(buffer, name){
    const blobName = name;
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


async function uploadImageMiniature(buffer, name){

  const blobName = name;
  const stream = getStream(buffer);
  const streamLength = buffer.length;
  blobService.createBlockBlobFromStream(containerNameMiniature, blobName, stream, streamLength, err =>{
    if(err){
      console.log(err);
      return false;
    }
  });

  return true;
}


async function uploadImageProfile(buffer, name){

  const blobName = name;
  const stream = getStream(buffer);
  const streamLength = buffer.length;
  blobService.createBlockBlobFromStream(containerNameProfile, blobName, stream, streamLength, err =>{
    if(err){
      console.log(err);
      return false;
    }
  });

  return true;
}


function createImageName(originalName){
  const identifier = Math.random().toString().replace(/0\./,'');
  return identifier + originalName + '.jpg'
}

module.exports = {uploadImageMiniature, uploadImagePost, uploadImageProfile, createImageName}