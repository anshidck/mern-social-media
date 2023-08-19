import React from "react";
import { BsPersonAdd } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { togglefriend } from "../features/user/userSlice";


function Friend({ friend }) {
    const dispatch = useDispatch();
    const patchFriend = async (friendId) => {
      try {
        await dispatch(togglefriend({friendId}));
      } catch (error) {
        console.log("Toggle Friend Error:", error);
      }
    };
    
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <img
          className="w-[50px] rounded-full"
          src={friend.picturePath}
          alt="john"
        />
        <div>
          <p className="text-xl font-bold">
            {friend.firstName} {friend.lastName}
          </p>
          <p className="text-sm">{friend.email}</p>
        </div>
      </div>
      <button onClick={() => patchFriend(friend._id)}><BsPersonAdd/></button>
    </div>
  );
}

export default Friend;
