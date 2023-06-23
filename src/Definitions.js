import React from "react";

const Definitions = ({ word, meanings }) => {
  return (
    <div>
      {word === "" ? (
        <span>Start by typing a word</span>
      ) : (
        meanings.map((mean) => console.log(mean))
      )}
    </div>
  );
};

export default Definitions;
