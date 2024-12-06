import { type } from '@testing-library/user-event/dist/type';
import mongoose from 'mongoose';


const UserSchema = new Schema({
  name:{
    tyep:String,
    required:true
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  password : {
    type: String,
    required : true
  },
  date:{
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('user',UserSchema);