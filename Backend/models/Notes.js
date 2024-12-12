import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String, // Fixed typo
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model('Notes', NoteSchema);
export default Notes;