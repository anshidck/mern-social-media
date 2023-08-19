import { FaRegImage } from "react-icons/fa";
import { AiOutlinePaperClip, AiFillAudio } from "react-icons/ai";
import { PiAirplayLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { createPost } from "../features/post/postSlice";

function Upload() {
  const [picLoading, setPicLoading] = useState(false);
  const [pic, setPic] = useState("");
  const [des, setDes] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ userId: user._id, description: des, picturePath: pic }));
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mern-media");
      data.append("cloud_name", "dpopecban");
      fetch("https://api.cloudinary.com/v1_1/dpopecban/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full bg-black text-white p-4 flex flex-col gap-4 rounded-md px-6"
    >
      <div className="flex gap-4">
        {user && (
          <img
            className="w-[50px] rounded-full h-[50px]"
            src={user.picturePath}
            alt="john"
          />
        )}
        <input
          id="des"
          name="des"
          value={des}
          onChange={(e) => setDes(e.target.value)}
          className="p-2 rounded-full w-full text-black"
          type="text"
          placeholder="what's on your mind...."
        />
      </div>
      <div className="border-b-2 border-gray-500"></div>
      <input
        id="picturePath"
        name="picturePath"
        type="file"
        className=""
        onChange={(e) => postDetails(e.target.files[0])}
      />
      <div className="border-b-2 border-gray-500"></div>
      <div className="flex justify-between">
        <p className="flex gap-2 items-center">
          <FaRegImage /> image
        </p>
        <p className="flex gap-2 items-center">
          <PiAirplayLight /> clip
        </p>
        <p className="flex gap-2 items-center">
          <AiOutlinePaperClip /> attachment
        </p>
        <p className="flex gap-2 items-center">
          <AiFillAudio /> audio
        </p>
        {picLoading ? (
          "Loding...."
        ) : (
          <button type="submit" className="bg-blue-600 p-1 rounded-full px-2">
            POST
          </button>
        )}
      </div>
    </form>
  );
}

export default Upload;
