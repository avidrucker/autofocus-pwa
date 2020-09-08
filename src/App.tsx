import React from 'react';
import './App.css';

function App() {
	let todoList: ITodoItem[] = [];
	let lastDone: string = "";
	[todoList, lastDone] = mainWebApp(todoList, lastDone);

	const listItems = <ul>{todoList.map(x => <li>{x.header}</li>)}</ul>;

  return (
    <section className="debug">
      <section>{listItems}</section>
			<section>Last done is {lastDone}</section>
    </section>
  );
}

export default App;
