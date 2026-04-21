const { uploadImageToCloudinary } = require("../../services/uploadService/uploadService");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadImageToCloudinary(req.file.buffer);

    return res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Image upload failed",
    });
  }
};

module.exports = {
  uploadImage,
};