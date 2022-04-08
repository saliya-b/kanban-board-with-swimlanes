import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import MainContext from "../context/MainContext";
import PropTypes from "prop-types";
import AddOrEdit from "./AddOrEdit";

const DraggableContent = ({
  item,
  index,
  colID,
  isUpdate,
  setIsUpdate,
  isAdd,
}) => {
  const { columns, updateItemFromState, deleteItemFromState } =
    useContext(MainContext);

  const [currentItem, setCurrentItem] = useState({});

  const getUpdateItem = (e) => {
    if (!isAdd && !isUpdate) {
      const itemID =
        e.target.parentElement.id.split("--")[1] ||
        e.target.ownerSVGElement.parentElement.id.split("--")[1];

      const getCurrentItem = columns[colID].items.filter(
        (item) => item.id === itemID
      )[0];

      setCurrentItem(getCurrentItem);
      setIsUpdate(true);
    }
  };

  const updateCurrentItem = (e) => {
    setCurrentItem((previous) => ({ ...previous, content: e.target.value }));
  };

  const completeUpdate = (e) => {
    if (currentItem.content !== "") {
      updateItemFromState(colID, currentItem);
      setIsUpdate(false);
    } else {
      alert("This field is required! Enter something");
    }
  };

  const cancelUpdate = (e) => {
    setCurrentItem({});
    setIsUpdate(false);
  };

  const deleteItem = (e) => {
    // eslint-disable-next-line no-restricted-globals
    const isOk = confirm("Are you sure?");
    if (isOk) {
      const itemID =
        e.target.parentElement.id.split("--")[1] ||
        e.target.ownerSVGElement.parentElement.id.split("--")[1];

      deleteItemFromState(colID, itemID);
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided1, snapshot) => (
        <div
          ref={provided1.innerRef}
          style={{ ...provided1.dragHandleProps.style }}
          className={`${
            snapshot.isDragging ? "bg-blue-400" : "bg-blue-500"
          }`.concat(" p-4 mb-2 select-none text-white")}
          {...provided1.draggableProps}
          {...provided1.dragHandleProps}
        >
          <div>{item.content}</div>
          {isUpdate && item.id === currentItem.id && (
            <AddOrEdit
              value={currentItem.content}
              changeHandler={updateCurrentItem}
              okHandler={completeUpdate}
              cancelHandler={cancelUpdate}
            />
          )}
          <div id={`item--${item.id}`} className="flex justify-end gap-1">
            <BiEdit
              size={25}
              fill="#000"
              className="cursor-pointer"
              onClick={getUpdateItem}
            />
            <MdDeleteForever
              size={25}
              fill="#811536"
              className="cursor-pointer"
              onClick={deleteItem}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

DraggableContent.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  colID: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  setIsUpdate: PropTypes.func.isRequired,
  isAdd: PropTypes.bool.isRequired,
};

export default DraggableContent;
