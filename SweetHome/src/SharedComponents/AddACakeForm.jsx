import React, { useContext, useRef, useState } from "react";
import { ButtonWhiteSubmit, TextDarkest, TextWhite } from "./ButtonAndText";
import NormalCard from "./NormalCard";
import { UserContext } from "../PrivateRoute/PrivateRout";
import ImgToLink from "../Utility/ImgToLink";
import { FaPlusCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AddACakeForm = ({ fireOnSubmit }) => {
  const {user} = useContext(UserContext);
  const [previewImg, setPreviewImg] = useState(null);
  const [flavours, setFlavours] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [flavour, setFlavour] = useState("");
  const [fruit, setFruit] = useState("");

  console.log(user);

  const cakeRef = useRef({
    shop_id: null,
    shop_owner_id: null,
    price: null,
    cake_Name: null,
    cake_pic: null,
    cakeDetail: null,
    minmum_weight: null,
    cake_flavour: [],
    cake_topping_frouit: [],
    deliveryWithin: null,
    total_sell: 0,
    ratings: null,
  });

  const addFlavour = () => {
    if (flavour) {
      console.log("i am being called", flavour);
      setFlavours((flavours) => [...flavours, flavour]);
      console.log(flavours);
      setFlavour("");
    } else {
      alert("empty value can not be added to the Flavour");
    }
  };

  const addFruits = () => {
    if (fruit) {
      console.log("i am being called", fruit);
      setFruits((fruits) => [...fruits, fruit]);
      console.log(fruits);
      setFruit("");
    } else {
      alert("empty value can not be added to the Fruit");
    }
  };

  const HandleInputChange = (e) => {
    // console.log(e.target);
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      cakeRef.current = {
        ...cakeRef.current,
        [name]: file,
      };

      setPreviewImg(URL.createObjectURL(file));
    } else {
      cakeRef.current = {
        ...cakeRef.current,
        [name]: value,
      };
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // console.log(cakeRef);
    cakeRef.current.cake_flavour = flavours;
    cakeRef.current.cake_topping_frouit = fruits;
    console.log("final result", cakeRef.current);

    try {
      const { displayLink, deleteLink } = await ImgToLink(
        cakeRef.current.cake_pic
      );
      if (displayLink && deleteLink) {
        cakeRef.current = {
          ...cakeRef.current,
          cake_pic: displayLink,
          delete_cake_pic: deleteLink,
          shop_id: user.shopId,
          shop_owner_id: user._id,
        };
        console.log("child form", cakeRef.current);
        await fireOnSubmit(cakeRef.current);
      }
    } catch (error) {
      console.log("error in convirting into link from img", error);
    }
  };

  return (
    <div className="">
      <div className="text-2xl font-bold italic text-center mt-5">
        <TextDarkest text={"ADD A CAKE"} />
      </div>

      <form onSubmit={HandleSubmit}>
        <NormalCard>
          <div className="text-xl md:text-3xl mx-[2%] mt-2 italic">
            <TextWhite text={"PROVIDE CAKE DETAIL"} />
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
              name="cake_pic"
              id="cake_pic"
              onChange={HandleInputChange}
              required
            />
          </div>

          <div className="w-full mt-5 text-white flex justify-center">
            <div className="w-[95%] text-sm">
              {/* Cake Name */}
              <div className="flex gap-5 w-full pb-5">
                <h2>Cake Name :</h2>
                <input
                  name="cake_Name"
                  type="text"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  required
                  onChange={HandleInputChange}
                />
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                {/* Price */}
                <div className="flex items-center gap-5 w-full pb-5">
                  <h2>Price :</h2>
                  <input
                    name="price"
                    type="number"
                    className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                    required
                    onChange={HandleInputChange}
                  />
                  <h2>TK</h2>
                </div>

                {/* Delivery Within */}
                <div className="flex items-center gap-5 w-full pb-5 mt-5">
                  <h2>Delivery In:</h2>
                  <input
                    name="deliveryWithin"
                    type="number"
                    className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                    required
                    onChange={HandleInputChange}
                  />
                  <h2>Day</h2>
                </div>
              </div>

              {/* both flavour and fruit  */}
              <div className="flex gap-10 flex-wrap justify-around  mt-5">
                {/* flavour handeling */}
                <div className="pb-5 flex flex-wrap text-white gap-5">
                  <h2>Flavour:</h2>

                  {flavours.map((eachflavour, index) => (
                    <div
                      key={index}
                      className="flex gap-2 border-b-2 rounded-b-md border-white"
                    >
                      <h2>{eachflavour}</h2>

                      <div
                        onClick={() =>
                          setFlavours(flavours.filter((_, i) => i !== index))
                        }
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-5 text-white">
                    <input
                      name="flavour"
                      type="text"
                      value={flavour}
                      placeholder="add flavour ?"
                      onChange={(e) => setFlavour(e.target.value)}
                      className="bg-transparent border-b-2 rounded-b-md border-white text-white outline-none placeholder-white"
                    />

                    <div className="" onClick={addFlavour}>
                      <FaPlusCircle />
                    </div>
                  </div>
                </div>

                {/* fruit handeling */}
                <div className="pb-5 flex flex-wrap text-white gap-5">
                  <h2>Fruit:</h2>

                  {fruits.map((eachflavour, index) => (
                    <div
                      key={index}
                      className="flex gap-2 border-b-2 rounded-b-md border-white"
                    >
                      <h2>{eachflavour}</h2>

                      <div
                        onClick={() =>
                          setFruits(flavours.filter((_, i) => i !== index))
                        }
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-5 text-white">
                    <input
                      name="fruits"
                      type="text"
                      value={fruit}
                      placeholder="add fruits ?"
                      onChange={(e) => setFruit(e.target.value)}
                      className="bg-transparent border-b-2 rounded-b-md border-white text-white outline-none placeholder-white"
                    />

                    <div className="" onClick={addFruits}>
                      <FaPlusCircle />
                    </div>
                  </div>
                </div>

                {/* Delivery Within */}
                <div className="flex gap-5 pb-5">
                  <h2>Minmum Weight:</h2>
                  <input
                    name="minmum_weight"
                    type="number"
                    className="bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                    required
                    onChange={HandleInputChange}
                    step="0.1" // Allows fractional values
                    min="0.1"
                  />
                  <h2>Pound</h2>
                </div>
              </div>

              {/* Cake Detail */}
              <div className="flex gap-5 w-full pb-5 mt-5">
                <h2>Cake Detail :</h2>
                <textarea
                  name="cakeDetail"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  required
                  onChange={HandleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="h-16 mb-5 w-[80%] mx-auto pb-5 mt-5">
            <ButtonWhiteSubmit buttonInnerText={"ADD TO CAKE LIST"} />
          </div>
        </NormalCard>
      </form>
    </div>
  );
};

export default AddACakeForm;
