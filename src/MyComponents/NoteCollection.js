import { useState, React } from "react";
import ShowList from "./ShowList";

function Collections(props) {
  const [showList, setShowList] = useState(false);
  const [list, setAllList] = useState({});
  const showlist = (e) => {
    setAllList(e)
    setShowList(true)
  };
  
    return (
      <>
         <h4>Notes</h4>
        <div>
          {props.list.map((element, e) => {
            return (
              <h5
                key={e}
                onClick={() => {
                  showlist(element);
                }}
              >
                {element.title}
              </h5>
            );
          })}
        </div>
        {!showList?<div></div>:
          <ShowList list={list} listName="notes" />
        }
      </>
    );
  }

 
 


export default Collections;
