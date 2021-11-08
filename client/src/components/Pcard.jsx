import React from "react";
import "./pcard.css";

function Pcard(props) {
	return (
		<div key={props.key} id="myapp">
       <button onClick={() => { props.deleteItem(props.id); }}>Delete This</button>
        <p id="one">{props.title}</p>
        <p id="two">{props.content}</p>
        <p id="three">{props.id}</p>
        </div>
		);
}


export default Pcard;