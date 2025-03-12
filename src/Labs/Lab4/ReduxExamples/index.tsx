import React from "react";
import HelloRedux from "./HelloRedux/index.tsx";
import CounterRedux from "./CounterRedux/index.tsx";
import AddRedux from "./AddRedux/index.tsx";
import TodoList from "./todos/TodoList.tsx";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux/>
      <CounterRedux/>
      <AddRedux/>
      <TodoList/>
    </div>
  );
};
