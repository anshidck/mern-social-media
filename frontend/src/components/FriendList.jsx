import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/user/userSlice";
import Friend from "./Friend";

function FriendList({ userId }) {
  const { users, isError, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(userId));
    if(isError) {
      console.log(message)
    }
  }, [dispatch, userId, isError, message]);
  return (
    <div className="w-full flex flex-col bg-black text-white rounded p-3 px-6 gap-4">
      <h1>Friend List</h1>
      {users &&
        users.map(
          (user) =>
            user && (
              <Friend friend={user} key={user._id}/>
            )
        )}
    </div>
  );
}

export default FriendList;
