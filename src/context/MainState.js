import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import MainContext from "./MainContext";
import mainReducer from "./mainReducer";
import {
  SAME_COLUMN_DROP,
  OTHER_COLUMN_DROP,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "./mainActionTypes";

const MainState = (props) => {
  const createObj = (name) => {
    const obj = {};
    const mainCols = ["q1", "q2", "q3", "q4"];

    for (let index = 0; index < 4; index++) {
      Object.assign(obj, {
        [uuid()]: {
          name: name,
          items: [],
          colOrder: `${mainCols[index]}-${
            name === "Done" ? index + 2 : index + 1
          }`,
        },
      });
    }

    return obj;
  };

  const allItems = [
    { id: uuid(), content: "first task" },
    { id: uuid(), content: "second task" },
    { id: uuid(), content: "third task" },
    { id: uuid(), content: "fourth task" },
  ];

  const initialState = {
    allItems: allItems,
    columns: {
      [uuid()]: {
        name: "Q1",
        items: allItems,
        colOrder: "q1-0",
      },
      [uuid()]: {
        name: "Q2",
        items: [],
        colOrder: "q2-0",
      },
      [uuid()]: {
        name: "Q3",
        items: [],
        colOrder: "q3-0",
      },
      [uuid()]: {
        name: "Q4",
        items: [],
        colOrder: "q4-0",
      },
      ...createObj("In Progress"),
      ...createObj("Done"),
    },
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const DragNDropState = ({ isSameColumn, data }) => {
    if (isSameColumn) {
      dispatch({ type: SAME_COLUMN_DROP, payload: data });
    } else {
      dispatch({ type: OTHER_COLUMN_DROP, payload: data });
    }
  };

  const AddItemToState = (newItem) => {
    dispatch({ type: ADD_ITEM, payload: newItem });
  };

  const updateItemFromState = (colID, currentItem) => {
    dispatch({ type: UPDATE_ITEM, payload: { colID, ...currentItem } });
  };

  const deleteItemFromState = (colID, itemID) => {
    dispatch({ type: DELETE_ITEM, payload: { colID, itemID } });
  };

  return (
    <MainContext.Provider
      value={{
        columns: state.columns,
        allItems: state.allItems,
        DragNDropState,
        AddItemToState,
        updateItemFromState,
        deleteItemFromState,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
