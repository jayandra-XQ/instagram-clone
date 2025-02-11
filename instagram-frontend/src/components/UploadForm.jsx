import { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null); // Image preview

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a preview
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:5001/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post uploaded successfully!");
      setFile(null);
      setDescription("");
      setPreview(null); // Reset preview
    } catch (error) {
      console.error("Failed to upload post:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Upload a Post
      </Typography>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Preview:</Typography>
          <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
        </Box>
      )}

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginTop: 2 }}
      />

      <Button variant="contained" onClick={handleUpload} sx={{ marginTop: 2 }}>
        Upload
      </Button>
    </Box>
  );
}
