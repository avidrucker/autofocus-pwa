import React from 'react';

const TachyonsHelperMol = () =>
	<aside className="o-50 absolute right-0 bottom-0 bg-red z-1 tc pa2">
		<h2 className="f4">Tachyons Helper</h2>
		<p className="relative dn-ns">DN-NS hide when M or L</p>
		<p className="relative dn">DN = never show</p>
		<p className="relative dn-m">DN-M = hide when M</p>
		<p className="relative dn-l">DN-L = hide when L</p>

		<span className="dn dib-l">
			<span className="bg-green">desktop only</span>
		</span>

		<span className="dn dib-m">
			<span className="bg-pink">tablet only</span>
		</span>

		<span className="dn dib-ns">
			<span className="bg-orange">non-mobile</span>
		</span>

		<span className="dib dn-ns">
			<span className="bg-purple">mobile only</span>
		</span>
	</aside>;

export default TachyonsHelperMol;