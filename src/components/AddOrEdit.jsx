import React from "react";
import PropTypes from "prop-types";

const AddOrEdit = ({ value, changeHandler, okHandler, cancelHandler }) => {
  return (
    <div className="my-2">
      <input
        type="text"
        className="w-full p-1 text-black"
        value={value}
        onChange={changeHandler}
      />
      <button className="w-full my-2 py-1 bg-gray-600" onClick={okHandler}>
        Ok
      </button>
      <button className="w-full py-1 bg-gray-600" onClick={cancelHandler}>
        Cancel
      </button>
    </div>
  );
};

AddOrEdit.propTypes = {
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  okHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

export default AddOrEdit;
