// components/ClipdropUpload.jsx
import React, { useState } from "react";

const ClipdropUpload = () => {
  const [image, setImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const clipdropKey = import.meta.env.VITE_CLIPDROP_KEY;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    if (!clipdropKey) {
      alert("Clipdrop API key missing");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image_file", image);

      const res = await fetch(
        "https://clipdrop-api.co/remove-background/v1",
        {
          method: "POST",
          headers: {
            "x-api-key": clipdropKey,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Clipdrop API error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      console.error(err);
      alert("Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clipdrop-upload">
      <input type="file" onChange={handleFileChange} accept="image/*" />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded mt-2"
      >
        {loading ? "Processing..." : "Remove Background"}
      </button>

      {resultUrl && (
        <div className="mt-4">
          <h2>Result:</h2>
          <img src={resultUrl} alt="Result" className="max-w-sm" />
        </div>
      )}
    </div>
  );
};

export default ClipdropUpload;