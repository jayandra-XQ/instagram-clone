import Post from "../models/Post.js";
import { getIO } from "../utils/socket.js";

//create a new post
export const createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { description = "" } = req.body; //default empty if not provided
    const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

    const newPost = new Post({ description, imageUrl });
    await newPost.save();

    // Emit a Socket.io event to all clients
    const io = getIO();
    io.emit("newPost", newPost); // Notify clients about the new post

    res.status(201).json(newPost);

  } catch (error) {
    console.log("Error creating Post:", error)
    res.status(500).json({ error: "Failed to create post" });
  }
}


//get all post
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.log("Error getting Posts:", error);
    res.status(500).json({ error: "Failed to get posts" });
  }
}


//like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.likes += 1;
    await post.save();

    // Emit a Socket.io event to all clients
    const io = getIO();
    io.emit("updatePost", post); // Notify clients about the updated post

    res.status(200).json(post);
  } catch (error) {
    console.log("Error liking Post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
}


// comment on a post
export const commentPost = async (req, res) => {
  try {
    const { username, comment } = req.body;  // Get username from request
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    // Store comment as an object
    post.comments.push({ username, text: comment, createdAt: new Date() });
    await post.save();

    // Emit a Socket.io event to all clients
    const io = getIO();
    io.emit("updatePost", post); // Notify clients about the updated post

    res.status(200).json(post);

  } catch (error) {
    console.log("Error commenting on Post:", error);
    res.status(500).json({ error: "Failed to comment on post" });
  }
}
