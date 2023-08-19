import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";


function Registerr() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picturePath: "",
  });

  const [pic, setPic] = useState('');
  const [picLoading, setPicLoading] = useState(false);

  const { firstName, lastName, email, password, location, occupation, picturePath} =
    formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, navigate, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      firstName,
      lastName,
      email,
      password,
      location,
      occupation,
      picturePath: pic
    };
    dispatch(register( userdata ));
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
      data.append("upload_preset", "chat-app");
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
    <div>
      <section className="bg-white w-[70%] h-[530px] mx-auto my-12 flex flex-col items-center p-6">
        <h1 className="text-4xl sm:text-5xl font-bold py-3">Register Form</h1>
        <p className="font-semibold">Please create a Account</p>
        <form
          onSubmit={onSubmit}
          className="w-full py-6 flex flex-col justify-between"
        >
          <div className="py-2">
            <input
              type="text"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="First Name"
            />
          </div>
          <div className="py-2">
            <input
              type="text"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={onChange}
              placeholder="Last Name"
            />
          </div>
          <div className="py-2">
            <input
              type="email"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
          </div>
          <div className="py-2">
            <input
              type="password"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="py-2">
            <input
              type="text"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="location"
              name="location"
              value={location}
              onChange={onChange}
              placeholder="Location"
            />
          </div>
          <div className="py-2">
            <input
              type="text"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="occupation"
              name="occupation"
              value={occupation}
              onChange={onChange}
              placeholder="Occupation"
            />
          </div>
          <div className="py-2">
            <input
              id="picturePath"
              name="pic"
              value={picturePath}
              type="file"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              onChange={(e) => postDetails(e.target.files[0])}
              placeholder="Occupation"
            />
          </div>
          <div className="py-2">
            { picLoading ? ('Loading.....') : (
                <button
                className="w-full text-center py-3 bg-black text-white rounded"
                type="submit"
              >
                Submit
              </button>
            ) }
          </div>
        </form>
      </section>
    </div>
  );
}

export default Registerr;
