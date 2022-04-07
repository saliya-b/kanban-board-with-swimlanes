const useCustom = (DragNDropState) => {
  const onDragEnd = (e, cols) => {
    if (!e.destination) return;

    const { source, destination } = e;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = cols[source.droppableId];
      const destColumn = cols[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      DragNDropState({
        isSameColumn: false,
        data: {
          sourceColumn,
          destColumn,
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceItems,
          destItems,
        },
      });
    } else {
      const column = cols[source.droppableId];
      const copiedItems = [...column.items];

      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      DragNDropState({
        isSameColumn: true,
        data: { sourceId: source.droppableId, column, copiedItems },
      });
    }
  };

  const getOrder = (colOrder) => {
    let orderClass = "";

    switch (colOrder) {
      case "q1-0":
        orderClass = "order-1";
        break;

      case "q1-1":
        orderClass = "order-2 md:order-3 lg:order-4";
        break;

      case "q1-2":
        orderClass = "order-3 md:order-5 lg:order-7";
        break;

      case "q2-0":
        orderClass = "order-4 md:order-2";
        break;

      case "q2-2":
        orderClass = "order-5 md:order-4 lg:order-5";
        break;

      case "q2-3":
        orderClass = "order-6 md:order-6 lg:order-8";
        break;

      case "q3-0":
        orderClass = "order-7 lg:order-3";
        break;

      case "q3-3":
        orderClass = "order-8 md:order-9 lg:order-6";
        break;

      case "q3-4":
        orderClass = "order-9 md:order-11 lg:order-9";
        break;

      case "q4-0":
        orderClass = "order-10 md:order-8 lg:order-10 lg:mr-[calc(100%_-_33%)]";
        break;

      case "q4-4":
        orderClass = "order-11 md:order-10 lg:mr-[calc(100%_-_33%)]";
        break;

      case "q4-5":
        orderClass = "order-12 lg:mr-[calc(100%_-_33%)]";
        break;

      default:
        break;
    }

    return orderClass;
  };

  return { onDragEnd, getOrder };
};

export default useCustom;
