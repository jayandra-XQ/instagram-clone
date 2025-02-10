import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  comments: [
    {
      username: { type: String, required: true }, // Store who commented
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],

}, { timestamps: true })


const Post = mongoose.model('Post', postSchema);

export default Post;