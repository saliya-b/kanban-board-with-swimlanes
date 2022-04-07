import React from "react";
import MainState from "./context/MainState";
import DragNDrop from "./components/DragNDrop";

function App() {
  return (
    <MainState>
      <div className="flex flex-col justify-center items-center gap-10 2xl:gap-[8vh] min-h-screen py-12 bg-gradient-to-br from-[#0b0953] to-[#b04156]">
        <h1 className="px-4 border-b-4 text-white text-2xl 2xl:text-4xl font-bold">
          Kanban Board with Swimlanes
        </h1>
        <ul className="flex flex-wrap justify-center items-start gap-y-5 2xl:gap-y-7 gap-x-1 w-[80%]">
          <DragNDrop />
        </ul>
      </div>
    </MainState>
  );
}

export default App;
