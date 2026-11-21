import mongoose from 'mongoose';

//Haremos el esquema. Es decir, qué campos tiene cada mensaje y de que tipo son

const messageSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true}, 
    email: {type: String, required: true, trim: true, lowercase: true},
    subject: {type: String, trim: true, default: ''},
    message: {type: String, required: true, trim: true},
    read: {type: Boolean, default: false},
},
    {timestamps: true}
);

//Mongo guarda estos documentos en la colección "messages"

export const Message = mongoose.model('Message', messageSchema);