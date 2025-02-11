'use client';
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import socket from "@/utils/socket";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";



export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();

    // Remove previous event listners to prevent duplicates
    socket.off("newPost");
    socket.off("updatePost");

    socket.on("newPost", (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
    })

    socket.on("UpdatePost", (updatePost) => {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === updatePost._id ? updatePost : post
        )
      );
    });

    return () => {
      socket.off("newPost");
      socket.off("updatePost");
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }


  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" components="h1" gutterBottom>
          Instagram Clone
        </Typography>

        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <Typography variant="body1">No posts yet. Be the first to upload!</Typography>
        )}
      </Container>
    </div>
  );
}
