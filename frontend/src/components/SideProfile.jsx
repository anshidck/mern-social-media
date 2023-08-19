import { BsPersonAdd, BsFillPencilFill } from "react-icons/bs";
import { IoMdBriefcase } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";

function SideProfile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-[30%] h-[420px] flex flex-col bg-black text-white rounded p-3 px-6 gap-4">
      <div className="flex justify-between items-center">
        {user && (
          <div className="flex gap-3">
            <img
              className="w-[50px] rounded-full h-[50px]"
              src={user.picturePath}
              alt="john"
            />
            <div>
              <p className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm">{user.friends.length} friend</p>
            </div>
          </div>
        )}
        <BsPersonAdd />
      </div>
      <div className="border-b-2 border-gray-500"></div>
      {user && (
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2">
            <MdLocationOn size={23} /> {user.location}
          </p>
          <p className="flex items-center gap-2">
            <IoMdBriefcase size={23} /> {user.occupation}
          </p>
        </div>
      )}
      <div className="border-b-2 border-gray-500"></div>
      {user && (
        <div className="flex flex-col gap-2">
          <p className="flex justify-between text-sm">
            who's viewed your profile <span>{user.viewedProfile}</span>
          </p>
          <p className="flex justify-between text-sm">
            impressions of your post <span>{user.impressions}</span>
          </p>
        </div>
      )}
      <div className="border-b-2 border-gray-500"></div>
      <h3>Social Profiles</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaTwitter size={23} />
            <p className="flex flex-col">
              Twitter <span className="text-xs">Social Network</span>
            </p>
          </div>
          <BsFillPencilFill />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLinkedin size={23} />
            <p className="flex flex-col">
              Linkedin <span className="text-xs">Network Platform</span>
            </p>
          </div>
          <BsFillPencilFill />
        </div>
      </div>
    </div>
  );
}

export default SideProfile;
