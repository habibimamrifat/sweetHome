import React, { useContext, useRef, useState } from "react";
import { ButtonWhiteSubmit, TextDarkest, TextWhite } from "./ButtonAndText";
import NormalCard from "./NormalCard";
import { UserContext } from "../PrivateRoute/PrivateRout";
import ImgToLink from "../Utility/ImgToLink";
import { FaPlusCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const UpdateACakeForm = ({ fireOnSubmit, cakeData }) => {
  const { user } = useContext(UserContext);
  
  const [previewImg, setPreviewImg] = useState(cakeData?.cake_pic);
  const [flavours, setFlavours] = useState(cakeData?.cake_flavour || []);
  const [fruits, setFruits] = useState(cakeData?.cake_topping_frouit || []);
  const [flavour, setFlavour] = useState("");
  const [fruit, setFruit] = useState("");
  const [imgChanged, setImgChanged] = useState(false);

  // State for cake data fields
  const [cakeName, setCakeName] = useState(cakeData?.cake_Name || "");
  const [price, setPrice] = useState(cakeData?.price || "");
  const [deliveryWithin, setDeliveryWithin] = useState(cakeData?.deliveryWithin || "");
  const [minWeight, setMinWeight] = useState(cakeData?.minmum_weight || "");
  const [cakeDetail, setCakeDetail] = useState(cakeData?.cakeDetail || "");

  const cakeRef = useRef({
    shop_id: cakeData?.shop_id,
    shop_owner_id: cakeData?.shop_owner_id,
    price: cakeData?.price,
    cake_Name: cakeData?.cake_Name,
    cake_pic: cakeData?.cake_pic,
    cakeDetail: cakeData?.cakeDetail,
    minmum_weight: cakeData?.minmum_weight,
    cake_flavour: cakeData?.cake_flavour,
    cake_topping_frouit: cakeData?.cake_topping_frouit,
    deliveryWithin: cakeData?.deliveryWithin,
    total_sell: cakeData?.total_sell,
    ratings: cakeData?.ratings,
  });

  const addFlavour = () => {
    if (flavour) {
      setFlavours((prevFlavours) => [...prevFlavours, flavour]);
      setFlavour("");
    } else {
      alert("empty value can not be added to the Flavour");
    }
  };

  const addFruits = () => {
    if (fruit) {
      setFruits((prevFruits) => [...prevFruits, fruit]);
      setFruit("");
    } else {
      alert("empty value can not be added to the Fruit");
    }
  };

  const HandleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      cakeRef.current = { ...cakeRef.current, [name]: file };
      setPreviewImg(URL.createObjectURL(file));
      setImgChanged(true);
    } else {
      switch (name) {
        case "cake_Name":
          setCakeName(value);
          break;
        case "price":
          setPrice(value);
          break;
        case "deliveryWithin":
          setDeliveryWithin(value);
          break;
        case "minmum_weight":
          setMinWeight(value);
          break;
        case "cakeDetail":
          setCakeDetail(value);
          break;
        default:
          break;
      }
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    cakeRef.current = {
      ...cakeRef.current,
      cake_flavour: flavours,
      cake_topping_frouit: fruits,
      cake_Name: cakeName,
      price: price,
      deliveryWithin: deliveryWithin,
      minmum_weight: minWeight,
      cakeDetail: cakeDetail,
    };

    try {
      if (imgChanged) {
        const { displayLink, deleteLink } = await ImgToLink(cakeRef.current.cake_pic);
        if (displayLink && deleteLink) {
          cakeRef.current = {
            ...cakeRef.current,
            cake_pic: displayLink,
            delete_cake_pic: deleteLink,
          };
        }
      }
    } catch (error) {
      console.error("error in convirting into link from img", error);
    } finally {
      await fireOnSubmit(cakeRef.current);
    }
  };

  return (
    <div className="h-full w-full overflow-scroll pb-[200px]">
      <div className="text-2xl font-bold italic text-center mt-5">
        <TextDarkest text={"Update A CAKE"} />
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
                  value={cakeName}
                  onChange={HandleInputChange}
                />
              </div>

              {/* Price */}
              <div className="flex items-center gap-5 w-full pb-5">
                <h2>Price :</h2>
                <input
                  name="price"
                  type="number"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  value={price}
                  onChange={HandleInputChange}
                />
                <h2>TK</h2>
              </div>

              {/* Delivery Within */}
              <div className="flex items-center gap-5 w-full pb-5">
                <h2>Delivery In:</h2>
                <input
                  name="deliveryWithin"
                  type="number"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  value={deliveryWithin}
                  onChange={HandleInputChange}
                />
                <h2>Day</h2>
              </div>

              {/* Flavours */}
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

              {/* Fruits */}
              <div className="pb-5 flex flex-wrap text-white gap-5">
                <h2>Fruit:</h2>

                {fruits.map((eachfruit, index) => (
                  <div
                    key={index}
                    className="flex gap-2 border-b-2 rounded-b-md border-white"
                  >
                    <h2>{eachfruit}</h2>

                    <div
                      onClick={() =>
                        setFruits(fruits.filter((_, i) => i !== index))
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

              {/* Minimum Weight */}
              <div className="flex gap-5 pb-5">
                <h2>Minmum Weight:</h2>
                <input
                  name="minmum_weight"
                  type="number"
                  className="bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  value={minWeight}
                  onChange={HandleInputChange}
                  step="0.1"
                  min="0.1"
                />
                <h2>Pound</h2>
              </div>

              {/* Cake Detail */}
              <div className="flex gap-5 w-full pb-5">
                <h2>Cake Detail :</h2>
                <textarea
                  name="cakeDetail"
                  className="flex-1 bg-transparent border-b-2 rounded-b-md border-white text-white outline-none ps-3"
                  value={cakeDetail}
                  onChange={HandleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="h-16 mb-5 w-[80%] mx-auto pb-5 mt-5">
            <ButtonWhiteSubmit buttonInnerText={"Update Cake"} />
          </div>
        </NormalCard>
      </form>
    </div>
  );
};

export default UpdateACakeForm;
