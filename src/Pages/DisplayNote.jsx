
import "./DisplayNote.css"; 
import submitIcon from "../images/submit.png";
import leftArrowIcon from "../images/leftarrow.png";
import backgroundImg from "../images/backgroundimg.png";
import lockIcon from "../images/lock.png";
import { useEffect, useState } from "react";
import { monthArray } from "../Dummy"; 

function DisplayNote({
  groupData,
  groupNumber,
  setGroupData,
  noteOrSelected,
  setNoteOrSelected,
}) {
  const [text, setText] = useState("");

  function setNote() {
   
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let ampm = hour >= 12 ? "Pm" : "Am";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? "0" + minute : minute;
    let tempTime = hour + ":" + minute + " " + ampm;

    
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let yyyy = new Date().getFullYear();
    let tempDate = date + " " + monthArray[month] + " " + yyyy;

    
    groupData[groupNumber].notesArray.push({
      time: tempTime,
      dateMonth: tempDate,
      data: text,
    });

    setGroupData([...groupData]);

  
    setText("");
  }

  useEffect(() => {
    localStorage.setItem("groupData", JSON.stringify(groupData));
  }, [groupData[groupNumber]?.notesArray]);

  return groupNumber != null ? (
    <div className="modified-selected-note-container" style={noteOrSelected ? { display: "none" } : { display: "flex" }}>
      <div className="top">
        <img src={leftArrowIcon} alt="" onClick={() => setNoteOrSelected(true)} />
        <div className="group">
          <div className="group-icon">
            <img src={groupData[groupNumber]?.groupColor} alt="" />
            <h3>{groupData[groupNumber]?.groupName.slice(0, 2).toUpperCase()}</h3>
          </div>
          <div className="groupName">{groupData[groupNumber]?.groupName}</div>
        </div>
      </div>
      <div className="middle">
        {groupData[groupNumber].notesArray.map((note, index) => (
          <div className="note" key={index}>
            <div className="note-timing">
              <p style={{ margin: "0px" }}>{note?.time}</p>
              <p style={{ margin: "0px" }}>{note?.dateMonth}</p>
            </div>
            <div className="note-detail">{note?.data}</div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <img src={submitIcon} alt="" onClick={setNote} style={{ cursor: "pointer" }} />
        <textarea
          placeholder="Enter your text here..........."
          onChange={(e) => {
            if (e.target.value.charCodeAt(0) !== 10) setText(e.target.value);
          }}
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setNote();
            }
          }}
        />
      </div>
    </div>
  ) : (
    <div className="background-container" style={{ display: "none" }}>
      <img src={backgroundImg} alt="" />
      <h2>Pocket Notes</h2>
      <p>
        Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <div>
        <img src={lockIcon} alt="" />
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
}

export default DisplayNote;