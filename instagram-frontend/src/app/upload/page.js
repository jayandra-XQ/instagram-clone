"use client";

import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import { Container, Typography } from "@mui/material";



const Upload = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Photo
        </Typography>

        <UploadForm />
      </Container>
    </div>
  )
}

export default Upload