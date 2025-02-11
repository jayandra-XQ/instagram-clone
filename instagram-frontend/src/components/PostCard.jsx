import socket from "@/utils/socket";
import { Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");

  //function for handle likes
  const handleLike = async () => {
    try {
      setLikes((prev) => prev + 1);
      const response = await axios.post(`http://localhost:5001/api/posts/${post._id}/like`);
      socket.emit("likePost", response.data._id);
    } catch (error) {
      console.error("Failed to like post:", error);
      setLikes((prev) => prev - 1); // Revert if failed
    }
  };


  //function for handle comments
  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = { username: "Anonymous", text: comment, createdAt: new Date() }; // Fake user for now
      setComments((prev) => [...prev, newComment]);

      const response = await axios.post(`http://localhost:5001/api/posts/${post._id}/comment`, { comment });
      socket.emit("commentPost", response.data._id, newComment);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      setComments((prev) => prev.slice(0, -1)); // Revert if failed
    }
  };


  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardMedia component="img" height="300" image={post.imageUrl} alt={post.description} />
      <CardContent>
        <Typography variant="body1">{post.description}</Typography>
        <Button onClick={handleLike}>Like ({likes})</Button>
        <TextField
          label="Add a comment"
          variant="outlined"
          size="small"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleComment();
            }
          }}
        />
        <div>
          {comments.map((c, index) => (
            <Typography key={index} variant="body2">
              <strong>{c.username}:</strong> {c.text}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard