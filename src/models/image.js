import {Schema,model} from 'mongoose';

const schema_imagen = new Schema({
    title : {type : String},
    description : {type :String},
    filename : {type : String},
    path : {type : String},
    mimetype : {type : String},
    size : {type : Number},
    created_at : {type : Date, default : Date.now()}
})

export default model('Image',schema_imagen);