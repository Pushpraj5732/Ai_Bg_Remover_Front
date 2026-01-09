import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import image from "../assets/header_img.png";
import Step from "./Step";
import Third from "./third";
import Fourth from "./fourth";

const Home = () => {
  const { user, isLoaded } = useUser();

  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
const url=import.meta.env.VITE_BACKEND_URL;
  // ✅ called when user selects image
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !user) return;

    setFile(selectedFile);
    setLoading(true);
    setResultUrl(null);

    await removeBg(selectedFile);
  };

  // ✅ ACTUAL API CALL
  const removeBg = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("clerkUserId", user.id);

      const res = await fetch(`${url}/api/bg/remove`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const blob = await res.blob(); // ✅ IMAGE RESPONSE
      const imageUrl = URL.createObjectURL(blob);
      setResultUrl(imageUrl);
    } catch (err) {
      alert("Failed to remove background");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <>
      {/* Page 1 */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Remove the Bg from your images for free
          </h1>

          <p className="text-gray-600 mb-6">
            Upload an image and let AI remove the background instantly.
          </p>

          <label className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
            <span>{loading ? "Processing..." : "Upload Image"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>

          <p className="text-sm text-gray-500 mt-3">
            Supports JPG, PNG, WEBP
          </p>

          {/* ✅ RESULT IMAGE */}
          {resultUrl && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Result:</h2>
              <img
                src={resultUrl}
                alt="Result"
                className="w-[320px] md:w-[420px] lg:w-[480px] object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <img
            src={image}
            alt="Preview"
            className="w-[320px] md:w-[420px] lg:w-[480px] object-contain"
          />
        </div>
      </section>

      {/* Other sections */}
      <Step />
      <Third />
      <Fourth />
    </>
  );
};

export default Home;
