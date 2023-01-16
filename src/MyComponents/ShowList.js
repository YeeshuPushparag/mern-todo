import React from "react";

function ShowList(props) {
  if (props.listName === "admins") {
    return (
      <>
        <div>
              <div>
                <h6>Name: {props.list.name}</h6>
                <h6>Created on: {props.list.date}</h6>
              </div>
        </div>
      </>
    );
  }
  if (props.listName === "users") {
    return (
      <>
        <div>
              <div>
                <h6>Name: {props.list.name}</h6>
                <h6>Email: {props.list.email}</h6>
                <h6>Created on: {props.list.date}</h6>
              </div>
        </div>
      </>
    );
  }
  if (props.listName === "notes") {
    return (
      <>
        <div>
              <div>
                <h6>Title: {props.list.title}</h6>
                <h6>Desciption: {props.list.description}</h6>
                <h6>Image: </h6>
                <img src={`http://localhost:4000/public/images/${props.list.image}`} width="100" height="100"/>
                <h6>Created on: {props.list.date}</h6>
              </div>
        </div>
      </>
    );
  } else {
    return <>Nothing to Show</>;
  }
}

export default ShowList;
