import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
// import data_product from "../Assets/data";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Popular() {
  const [popularProducts, setPopularProducts] = useState([]);

  const fetchPopularProducts = async () => {
    try {
      const url = `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/get-popular-women-category-products`;
      const response = await axios.get(url, { withCredentials: true });

      console.log(response.data);

      if (response.data && Array.isArray(response.data.popularInWomen)) {
        setPopularProducts(response.data.popularInWomen);
      } else {
        setPopularProducts([]);
      }
    } catch (err) {
      console.log(err);
      setPopularProducts([]);
    }
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return (
    <div className="flex flex-col w-[82%] mx-auto items-center min-h-[70vh] sm:mt-[160px] md:mt-[80px] lg:mt-[80px] ">
      <h1 className="text-[#171717] text-xl sm:text-3xl md:text-4xl font-semibold text-center">
        POPULAR IN WOMEN
      </h1>
      <hr className="w-[100px] sm:w-[150px] md:w-[200px] h-[3px] sm:h-[4px] md:h-[5px] border rounded-md bg-[#252525] mt-3" />

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          width: "100%",
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
        className="mt-4 md:mt-7"
      >
        {popularProducts.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[320px]  mx-auto p-3 transition-all duration-300 hover:scale-105"
          >
            <Link to={`/product/${item.id}`}>
              <AspectRatio ratio="1" sx={{ minWidth: 150 }}>
                <img
                  src={`${
                    import.meta.env.VITE_APP_BACKEND_URL
                  }/images/${item.image.split("/").pop()}`}
                  alt={item.name}
                  onClick={() => window.scrollTo(0, 0)}
                  className="w-full max-w-[300px] h-auto object-cover rounded-lg"
                />
              </AspectRatio>
            </Link>

            <p className="mx-2 mt-2 font-medium text-gray-800 text-base sm:text-base md:text-base">
              {item.name}
            </p>

            <div className="flex gap-4 mt-1 items-center">
              <div className="text-[#374151] pl-2 font-bold text-lg sm:text-xl md:text-base">
                ${item.new_price}
              </div>
              <div className="text-[#8c8c8c] text-lg sm:text-xl md:text-base font-semibold line-through">
                ${item.old_price}
              </div>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
}
