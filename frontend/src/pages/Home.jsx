import SideProfile from "../components/SideProfile";
import Advertisment from "../components/Advertisment";
import FriendList from "../components/FriendList";
import Upload from "../components/Upload";
import Post from "../components/Post";
import { getPosts } from "../features/post/postSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { posts, isError, message } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getPosts())

  },[ dispatch, isError, message, user, navigate ])
  return (
    <div className="p-9 w-full">
      <div className="flex w-full gap-3">
        <SideProfile />
        <div className="w-[50%] flex flex-col gap-3">
          <Upload/>
          { posts && posts.map((post, index) => (
            <Post key={post._id || index } post={post}/>
          )) }
        </div>
        <div className="flex flex-col gap-2 w-[30%]">
          <Advertisment/>
          <FriendList userId={ user._id }/>
        </div>
      </div>
    </div>
  );
}

export default Home;
