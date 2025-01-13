import React, { useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext } from "../../store/FirebaseContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { db, user } = useContext(FirebaseContext);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !name || !category || !price) {
      alert("all fields are required");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(image);

      if (!imageUrl) {
        alert("image upload failed");
        setLoading(false);
        return;
      }
      const productData = {
        name,
        category,
        price,
        imageUrl,
        userId: user?.uid || "guest",
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "products"), productData);
      alert("product uploaded successfully");
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.log(error);
      alert("product upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="Category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="Price"
          />
          <br />
          <br />
          <label htmlFor="image">Product Image</label>
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
          />
          <br />
          <br />
          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />
          <button type="submit" className="uploadBtn" disabled={loading}>
            {loading ? "Uploading..." : "Upload and Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
