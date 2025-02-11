import socket from "@/utils/socket";
import { Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");

  // Listen for socket events
  useEffect(() => {
    socket.on("updatePost", (updatedPost) => {
      if (updatedPost._id === post._id) {
        setComments(updatedPost.comments);
        setLikes(updatedPost.likes);
      }
    });

    return () => {
      socket.off("updatePost");
    };
  }, [post._id]);

  //function for handle likes
  const handleLike = async () => {
    try {
      setLikes((prev) => prev + 1);
      const response = await axios.post(`http://localhost:5002/api/posts/${post._id}/like`);
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
      const commentData = {
        username: "currentUser",
        comment: comment
      };

      const newComment = {
        username: "currentUser",
        text: comment,
        createdAt: new Date()
      };
      setComments(prev => [...prev, newComment]);

      const response = await axios.post(
        `http://localhost:5002/api/posts/${post._id}/comment`,
        commentData
      );

      // Emit socket event
      socket.emit("updatePost", {
        postId: post._id,
        comment: newComment
      });

      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      setComments(prev => prev.slice(0, -1)); // Revert if failed
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleComment();
            }
          }}
        />
        <div>
          {comments.map((c, index) => (
            <Typography key={`${c.username}-${index}`} variant="body2" sx={{ my: 1 }}>
              <strong>{c.username}:</strong> {c.text}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard