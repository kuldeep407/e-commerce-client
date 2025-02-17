import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NewCollection() {
  const [newCollection, setNewCollection] = useState([]);

  const fetchNewCollections = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/get-new-collection`;
      const response = await axios.get(url, { withCredentials: true });

      if (response.data && Array.isArray(response.data.newCollection)) {
        setNewCollection(response.data.newCollection);
      } else {
        setNewCollection([]);
      }
    } catch (err) {
      console.log(err);
      setNewCollection([]);
    }
  };

  useEffect(() => {
    fetchNewCollections();
  }, []);

  return (
    <div className="flex flex-col w-[82%] mx-auto items-center min-h-[70vh] mt-[50px] sm:mt-[60px] md:mt-[130px] ">
      <h1 className="text-[#171717] text-xl sm:text-3xl md:text-4xl font-semibold text-center">
        NEW COLLECTIONS
      </h1>
      <hr className="w-[100px] sm:w-[150px] md:w-[200px] h-[3px] sm:h-[4px] md:h-[5px] border rounded-md bg-[#252525] mt-3" />

      {newCollection.length > 0 ? (
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
          className="mt-5 md:mt-8 flex"
        >
          {newCollection.map((item) => (
            <div
              key={item._id}
              className="w-[23%] min-w-[200px] sm:min-w-[240px] md:min-w-[300px] p-3 transition-all duration-300 hover:scale-105"
            >
              <Link to={`/product/${item.id}`}>
                <AspectRatio ratio="1" sx={{ minWidth: 150 }}>
                  <img
                      src={`${
                        import.meta.env.VITE_APP_BACKEND_URL
                      }/images/${item.image.split("/").pop()}`}
                    alt={item.name}
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-full h-auto object-cover rounded-lg"
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
      ) : (
        <p className="text-gray-500 text-lg mt-5">No new collections available.</p>
      )}
    </div>
  );
}
