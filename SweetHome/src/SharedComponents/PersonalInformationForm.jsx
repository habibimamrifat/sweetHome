import React, { useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import NormalCard from "./NormalCard";
import { ButtonWhiteSubmit, TextWhite } from "./ButtonAndText";
import ImgToLink from "../Utility/ImgToLink";

const PersonalInformationForm = ({ fireOnSubmit, placement }) => {
  const personalInformationRef = useRef({
    personalImg: null,
    deleteImgLink: null,
    name: null,
    email: null,
    mob: null,
    mobAlt: null,
    address: null,
    password: null,
    reInterPassword: null,
  });

  const [viewPassword, setViewpassword] = useState(false);
  const [viewReinterPassword, setViewReinterpassword] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const HandleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      personalInformationRef.current = {
        ...personalInformationRef.current,
        [name]: file,
      };
      setPreviewImg(URL.createObjectURL(file));
    } else {
      personalInformationRef.current = {
        ...personalInformationRef.current,
        [name]: value,
      };
    }
  };

  const customerPersonalInformationSubmit = async (e) => {
    e.preventDefault();
    const { password, reInterPassword, personalImg } = personalInformationRef.current;

    if (
      password?.length > 8 &&
      reInterPassword?.length > 8 &&
      password === reInterPassword
    ) {
      try {
        const { displayLink, deleteLink, error } = await ImgToLink(personalImg);

        if (error) {
          console.error("Image upload failed:", error);
          alert("Image upload failed");
          return;
        }

        personalInformationRef.current = {
          ...personalInformationRef.current,
          personalImg: displayLink,
          deleteImgLink: deleteLink,
        };

        // Call the submission function here after updating the ref
        fireOnSubmit(personalInformationRef.current);
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Image upload failed");
      }
    } else {
      alert("Password must match and must be more than 8 characters");
    }
  };

  return (
    <form
      className="w-[95%] md:w-[85%] mx-auto mt-5"
      onSubmit={customerPersonalInformationSubmit}
    >
      <NormalCard>
        <div className="text-xl md:text-3xl mx-[2%] mt-2 italic">
          <TextWhite text={"Personal Information"} />
        </div>

        <div className="mt-5 mx-[2%]">
          <div className="w-20 h-20 border-2 border-white">
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            type="file"
            name="personalImg"
            id="personalImg"
            onChange={HandleInputChange}
            required
          />
        </div>

        <div className="w-full mt-5 text-white flex justify-center">
          <div className="w-[95%] text-sm">
            <div className="flex gap-5  w-full pb-5 ">
              <h2>Name :</h2>
              <input
                name="name"
                type="text"
                className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                required
                onChange={HandleInputChange}
              />
            </div>

            <div className="flex gap-5  w-full pb-5 ">
              <h2>E-Mail :</h2>
              <input
                name="email"
                type="email"
                className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                required
                onChange={HandleInputChange}
              />
            </div>

            <div className="flex flex-col w-full md:flex-row md:gap-5">
              <div className="flex gap-5 w-full pb-5">
                <h2>Mob :</h2>
                <input
                  name="mob"
                  type="number"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  required
                  onChange={HandleInputChange}
                />
              </div>

              <div className="flex gap-5 w-full pb-5">
                <h2>Mob (alt):</h2>
                <input
                  name="mobAlt"
                  type="number"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  required
                  onChange={HandleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5  w-full pb-5 ">
              <h2>Address :</h2>
              <textarea
                name="address"
                type="Address"
                className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                required
                onChange={HandleInputChange}
              />
            </div>

            <div className="flex gap-5  w-full pb-5 relative ">
              <h2>Password :</h2>
              <input
                name="password"
                type={`${!viewPassword ? "Password" : "text"}`}
                className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                required
                onChange={HandleInputChange}
              />

              <div
                className="absolute top-1 right-2"
                onClick={() => setViewpassword(!viewPassword)}
              >
                <FaEye />
              </div>
            </div>

            <div className="flex gap-5  w-full pb-5 relative ">
              <h2>Reinter Password :</h2>
              <input
                name="reInterPassword"
                type={`${!viewReinterPassword ? "Password" : "text"}`}
                className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                required
                onChange={HandleInputChange}
              />

              <div
                className="absolute top-1 right-2"
                onClick={() => setViewReinterpassword(!viewReinterPassword)}
              >
                <FaEye />
              </div>
            </div>
          </div>
        </div>

        <div className="h-16 mb-5 w-[80%] mx-auto pb-5 mt-5">
          <ButtonWhiteSubmit
            buttonInnerText={`${
              placement === "Customer" ? "Create An Account" : "Save"
            } `}
          />
        </div>
      </NormalCard>
    </form>
  );
};

export default PersonalInformationForm;