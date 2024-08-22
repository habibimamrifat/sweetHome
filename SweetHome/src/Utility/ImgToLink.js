import React, { useState } from "react";

const ImgToLink = async (img) => {
    const formImg = new FormData();
    formImg.append("image", img);
  
    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=b2d54e73c92355d3f31462b252156547",
        {
          method: "POST",
          body: formImg,
        }
      );
  
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
  
      const imgLink = await response.json();
  
      if (imgLink && imgLink.data) {
        return {
          displayLink: imgLink.data.display_url,
          deleteLink: imgLink.data.delete_url,
        };
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return { error: "Image upload failed" };
    }
  };
  
  export default ImgToLink;
