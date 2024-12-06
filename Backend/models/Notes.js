import { type } from '@testing-library/user-event/dist/type';
import mongoose from 'mongoose';


const NoteSchema = new Schema({
  title:{
    tyep:String,
    required:true
  },
  description:{
    type: String,
    required:true,
    unique:true
  },
  tag : {
    type: String,
    default:"General"
  },
  date:{
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('notes',NoteSchema);