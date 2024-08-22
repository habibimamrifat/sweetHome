import React, { useRef, useState } from "react";
import NormalCard from "./NormalCard";
import { ButtonWhiteSubmit, TextWhite } from "./ButtonAndText";
import ImgToLink from "../Utility/ImgToLink";

const ShopInformationForm = ({ fireOnSubmit }) => {
  const shopInformationRef = useRef({
    bannerimg: null,
    logoimg: null,
    name: "",
    email: "",
    mob: "",
    mobAlt: "",
    address: "",
  });

  const [BannerImg, setBannerImg] = useState(null);
  const [LogoImg, setLogoImg] = useState(null);

  const HandleInputChange = (e) => {
    const { files, value, name } = e.target;

    if (files) {
      const file = files[0];
      shopInformationRef.current = {
        ...shopInformationRef.current,
        [name]: file,
      };

      if (name === "bannerimg") {
        setBannerImg(URL.createObjectURL(file));
      } else if (name === "logoimg") {
        setLogoImg(URL.createObjectURL(file));
      }
    } else {
      shopInformationRef.current = {
        ...shopInformationRef.current,
        [name]: value,
      };
    }
  };

  const bakerShopInformationSubmit = async (e) => {
    e.preventDefault();
    const { mob, mobAlt, bannerimg, logoimg } = shopInformationRef.current;

    if (mob.toString().length === 11 && mobAlt.toString().length === 11) {
      try {
        const [bannerResult, logoResult] = await Promise.all([
          ImgToLink(bannerimg),
          ImgToLink(logoimg),
        ]);

        if (bannerResult.error || logoResult.error) {
          console.error(
            "Image upload failed:",
            bannerResult.error || logoResult.error
          );
          alert("Image upload failed");
          return;
        }

        const { displayLink: BannerImgLink, deleteLink: deleteBannerImgLink } =
          bannerResult;
        const { displayLink: LogoImgLink, deleteLink: deleteLogoImgLink } =
          logoResult;

        shopInformationRef.current = {
          ...shopInformationRef.current,
          bannerimg: BannerImgLink,
          deleteBannerImg: deleteBannerImgLink,
          logoimg: LogoImgLink,
          deleteLogoImg: deleteLogoImgLink,
        };

        // Call the submission function here after updating the ref
        fireOnSubmit(shopInformationRef.current);
      } catch (error) {
        console.error("Error uploading images:", error);
        alert("Image upload failed");
      }
    } else {
      alert("Mobile number must be of 11 digits");
    }
  };

  return (
    <form
      className="w-[95%] md:w-[85%] mx-auto mt-5"
      onSubmit={bakerShopInformationSubmit}
    >
      <NormalCard>
        <div className="text-xl md:text-3xl mx-[2%] mt-2 italic">
          <TextWhite text={"Shop Information"} />
        </div>

        <div className="flex justify-around">
          {/* this is the img section  */}
          <div className="mt-5 mx-[2%]">
            <div className="w-20 h-20 border-2 border-white">
              {BannerImg ? (
                <img
                  src={BannerImg}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <h1>Select Banner Img</h1>
              )}
            </div>
            <input
              type="file"
              name="bannerimg"
              id="bannerimg"
              onChange={HandleInputChange}
            />
          </div>
          {/* this is the img section  */}

          {/* this is the img section  */}
          <div className="mt-5 mx-[2%]">
            <div className="w-20 h-20 border-2 border-white">
              {LogoImg ? (
                <img
                  src={LogoImg}
                  alt="logoimg"
                  className="w-full h-full object-cover"
                />
              ) : (
                <h1>Select logo Img</h1>
              )}
            </div>
            <input
              type="file"
              name="logoimg"
              id="logoimg"
              onChange={HandleInputChange}
            />
          </div>
          {/* this is the img section  */}
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
          </div>
        </div>

        <div className="h-16 mb-5 w-[80%] mx-auto pb-5 mt-5">
          <ButtonWhiteSubmit buttonInnerText={"Create An Account"} />
        </div>
      </NormalCard>
    </form>
  );
};

export default ShopInformationForm;
