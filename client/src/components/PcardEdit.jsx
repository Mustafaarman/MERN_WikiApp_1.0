import React from "react";


function PcardEdit(props) {
	return (
		<div key={props.key}>
		<form onSubmit={props.submitFun}>
		<input type="text" onChange={props.titleFun} value={props.title} />
		<input type="text" onChange={props.contentFun} value={props.content} />
		<input type="submit" value="Submit" />
		</form></div>
		);
}

export default PcardEdit;