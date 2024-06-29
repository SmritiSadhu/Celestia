import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Feedback = () => {
  const [openFeedback, setOpenFeedBack] = useState(false);

  return (
    <div className="flex justify-center items-center my-12 flex-col">
      <h2 className="text-4xl font-bold text-primary mb-8">Feedback</h2>
      <div className="w-[60%] rounded-lg p-3 shadow-neumorphic cursor-pointer text-center">
        {/* mapping of ques */}
        <div
          className=" p-3 border-b border-gray-300 my-3 flex justify-between items-center gap-3"
          onClick={() => setOpenFeedBack(!openFeedback)}
        >
          <span className="font-semibold">
            Q.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
          <button>
            <IoIosArrowDown />
          </button>
        </div>

        {openFeedback && (
          <div className="text-left">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non
              tortor posuere, blandit mauris vel, sollicitudin metus. Cras
              commodo quam sit amet malesuada vestibulum. Nulla venenatis eget
              elit vitae malesuada. Etiam eget lobortis metus, et convallis
              nibh. Morbi vel nisl eget purus condimentum porttitor ut hendrerit
              metus. In in tortor quis ante pellentesque euismod. Aenean tempus
              iaculis ultrices. Nam dapibus massa nisl, id porttitor ipsum
              sollicitudin non. Sed ac faucibus nisl, quis condimentum elit.
              Nunc non augue egestas, finibus mi quis, facilisis nisl.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
