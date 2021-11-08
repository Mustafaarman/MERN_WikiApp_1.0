import React from "react";


function Addpost(props) {
	return (
	  <form onSubmit={props.submitFun}>
        <label>
          Title:
          <input onChange={props.inputFun} type="text" name="title" value={props.title} placeholder="title" />
        </label>
        <label>
          Body:
          <input onChange={props.inputFun} type="text" name="content" value={props.content} placeholder="content" />
        </label>
        <input type="submit" value="Submit" />
      </form>
		);
}


export default Addpost;