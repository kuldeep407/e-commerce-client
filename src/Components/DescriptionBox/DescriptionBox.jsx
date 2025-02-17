import React from "react";

export default function DescriptionBox() {
  return (
    <div className="w-[80%] mx-auto mt-[30px] bg-white rounded-lg">
      <div className="flex border-b mb-6">
        <div className="flex-1 text-center py-4 cursor-pointer font-semibold text-gray-700">
          Description
        </div>
        <div className="flex-1 text-center py-4 cursor-pointer  hover:text-gray-700 transition-colors duration-200">
          Reviews (122)
        </div>
      </div>

      <div className="text-gray-700 text-base leading-relaxed">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum saepe
          animi veritatis eius repellendus beatae quod maiores, natus, quia nulla
          excepturi eum hic harum sint deserunt numquam temporibus et, error
          explicabo ab similique nihil voluptatem delectus. Culpa enim temporibus
          optio quia cupiditate minima, sequi corrupti inventore similique iure
          eos consequuntur natus voluptatibus eius, earum et molestiae eveniet,
          adipisci officiis totam autem ea magnam! Corporis facere ab expedita
          atque porro ex pariatur esse quae tenetur fugiat reiciendis quo nihil
          blanditiis quod earum possimus, illum laudantium iure mollitia? Tempore
          facilis asperiores a omnis, quae ratione doloremque.
        </p>
      </div>
    </div>
  );
}
