const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    autorId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    description : {type: String, required: true},
    name : {type: String, required: true},
    workType : {type: String, required: true},
    tags : [{type: String, required: true}],
    URLImage: [{type: String, required: true}],
    URLThumbnail: [{type: String, required: true}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
},{
    timestamps:true
}
)

postSchema.plugin(mongoosePaginate);
const model = mongoose.model('Post', postSchema);
module.exports  = model;