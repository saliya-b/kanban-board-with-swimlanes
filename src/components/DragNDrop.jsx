import React, { useState, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableContent from "./DraggableContent";
import MainContext from "../context/MainContext";
import { v4 as uuid } from "uuid";
import AddOrEdit from "./AddOrEdit";
import useCustom from "../hooks/useCustom";

const DragNDrop = () => {
  const { columns, DragNDropState, AddItemToState } = useContext(MainContext);
  const { onDragEnd, getOrder } = useCustom(DragNDropState);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newItem, setNewItem] = useState({ content: "" });

  const createNewItem = (e) => {
    setNewItem((previous) => ({
      ...previous,
      id: uuid(),
      content: e.target.value,
    }));
  };

  const completeAddItem = () => {
    if (newItem.id !== undefined || newItem.content !== "") {
      AddItemToState(newItem);
      setIsAdd(false);
      setNewItem({ content: "" });
    } else {
      alert("This field is required! Enter something");
    }
  };

  const cancelAddItem = () => {
    setIsAdd(false);
    setNewItem({ content: "" });
  };

  const addItem = (e) => {
    if (!isUpdate && !isAdd) {
      setIsAdd(true);
      setNewItem((previous) => ({ ...previous, colID: e.target.id }));
    }
  };

  return (
    <DragDropContext onDragEnd={(e) => onDragEnd(e, columns)}>
      {Object.entries(columns).map(([id, column]) => (
        <li
          className={"flex flex-col w-full md:min-w-[250px] md:w-[48%] lg:w-[33%] xl:w-[24%] ".concat(
            `${getOrder(column.colOrder)} xl:order-none xl:mr-auto`
          )}
          key={id}
        >
          <h2 className="bg-green-600 w-full text-center text-white text-xl p-1">
            {column.name}
          </h2>
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  snapshot.isDraggingOver ? "bg-gray-500" : "bg-gray-300"
                }`
                  .concat(" px-1 py-2 ")
                  .concat(
                    `${
                      ["In Progress", "Done"].includes(column.name)
                        ? "min-h-[100px]"
                        : "min-h-[200px] md:min-h-[450px]"
                    }`
                  )}
              >
                {column.items.map((item, index) => (
                  <DraggableContent
                    key={item.id}
                    item={item}
                    index={index}
                    colID={id}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    isAdd={isAdd}
                  />
                ))}
                {provided.placeholder}
                {isAdd && !isUpdate && id === newItem.colID && (
                  <div className="p-4 mb-2 select-none bg-blue-500 text-white">
                    <AddOrEdit
                      value={newItem.content}
                      changeHandler={createNewItem}
                      okHandler={completeAddItem}
                      cancelHandler={cancelAddItem}
                    />
                  </div>
                )}
                <div>
                  <button
                    id={id}
                    className="w-full p-4 text-center bg-gray-600 text-white"
                    onClick={addItem}
                  >
                    + Add New
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </li>
      ))}
    </DragDropContext>
  );
};

export default DragNDrop;
