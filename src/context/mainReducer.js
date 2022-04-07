import {
  SAME_COLUMN_DROP,
  OTHER_COLUMN_DROP,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "./mainActionTypes";

const mainReducer = (state, action) => {
  switch (action.type) {
    case SAME_COLUMN_DROP:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.sourceId]: {
            ...action.payload.column,
            items: action.payload.copiedItems,
          },
        },
      };

    case OTHER_COLUMN_DROP:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.sourceId]: {
            ...action.payload.sourceColumn,
            items: action.payload.sourceItems,
          },
          [action.payload.destinationId]: {
            ...action.payload.destColumn,
            items: action.payload.destItems,
          },
        },
      };

    case ADD_ITEM:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.colID]: {
            ...state.columns[action.payload.colID],
            items: [
              ...state.columns[action.payload.colID].items,
              { id: action.payload.id, content: action.payload.content },
            ],
          },
        },
      };

    case UPDATE_ITEM:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.colID]: {
            ...state.columns[action.payload.colID],
            items: [...state.columns[action.payload.colID].items].map((item) =>
              item.id === action.payload.id
                ? { ...item, content: action.payload.content }
                : item
            ),
          },
        },
      };

    case DELETE_ITEM:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.colID]: {
            ...state.columns[action.payload.colID],
            items: [...state.columns[action.payload.colID].items].filter(
              (item) => item.id !== action.payload.itemID
            ),
          },
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
