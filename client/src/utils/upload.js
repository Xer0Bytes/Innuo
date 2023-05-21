import axios from "axios";

const upload = async (file, onProgress) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "innuo_336572");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dgcmjva7h/upload",
      data,
      {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          onProgress(progress);
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
