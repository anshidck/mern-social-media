import React from "react";
import { BsPersonAdd } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { likePosts } from "../features/post/postSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)

  const likePost = async (postId) => {
    dispatch(likePosts(postId));
  };
  return (
    <div className="bg-black text-white p-4 rounded-md flex flex-col gap-2">
      <div className=" flex justify-between items-center ">
        <div className="flex gap-3">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={post.userPicturePath}
            alt="john"
          />
          <div>
            <p className="text-xl font-bold">
              {post.firstName} {post.lastName}
            </p>
          </div>
        </div>
        <BsPersonAdd />
      </div>
      <p>{post.description}</p>
      <img className="rounded-md" src={post.picturePath} alt="john" />
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button onClick={() => likePost(post._id)}>
            <AiOutlineHeart size={23} />
          </button>
          <button>
            <BiComment size={23} />
          </button>
        </div>
        <p>share</p>
      </div>
    </div>
  );
}

export default Post;
