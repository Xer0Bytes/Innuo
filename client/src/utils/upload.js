import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "innuo");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dlu0wvh6a/innuo", data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;