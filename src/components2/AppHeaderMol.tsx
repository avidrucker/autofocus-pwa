import React from 'react';
import EmojiAtom from './EmojiAtom';

// TODO: add drop down menu which uses
//   emoji enhanced options such as
//   toggle show completed <EmojiAtom symbol="👁️" />

// more useful emoji: <EmojiAtom symbol="👂" />
// information: <EmojiAtom symbol="ℹ️" />
// accessibility: ♿
// gear / settings: ⚙️
// hamburgur icon: ☰

// TODO: consider how to make this app entirely
//    accessibile to the visually impaired
// TODO: consider how to make this app entirely
//    accessibile to the physically impaired
const AppHeaderMol = () =>
	<header className="w-100 pa3 bg-blue white flex items-center justify-between">
		<span className="pa2 ph3 f3">
			<EmojiAtom symbol="ℹ️" label="about" />
			{/* <span className="f6"> About</span> */}
		</span>
		<h1 className="ma0 pv0 ph2">AutoFocus</h1>
		<span className="b pa2 ph3 f3">
			<EmojiAtom symbol="☰" label="menu" />
			{/*<span className="f6"> Menu</span>*/}
		</span>
	</header>

export default AppHeaderMol;
