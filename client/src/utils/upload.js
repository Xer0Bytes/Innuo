import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "innuo_336572");

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      data,
      {
        onUploadProgress: (ProgressEvent) => {
          //track your progress here
          console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      }
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
