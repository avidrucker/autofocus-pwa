import React from 'react';
import core from 'fp-autofocus';
import './App.css';

function App() {
	const myApp: core.IAppData = createBlankAppData();

	const listItems = <ul>{todoList.map(x => <li>{x.header}</li>)}</ul>;

  return (
    <section className="debug">
      <section>{listItems}</section>
			<section>Last done is {lastDone}</section>
    </section>
  );
}

export default App;
