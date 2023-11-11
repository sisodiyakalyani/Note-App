
import { useEffect, useState } from 'react';
import './App.css';
import CreateNote from './Pages/CreateNote'; 
import DisplayNote from './Pages/DisplayNote'; 
import color1 from "./images/color1.png";
import { colorData } from './Dummy';
// import DisplayNote from './Pages/DisplayNote';

function App() {
  const [popupToggle, setPopupToggle] = useState(false);
  const [groupData, setGroupData] = useState(JSON.parse(localStorage.getItem("groupData")) || []);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState(color1);
  const [groupNumber, setGroupNumber] = useState(null);
  const [noteOrSelected, setNoteOrSelected] = useState(true);

  let TOP_MIDDLE_TOGGLE = "top";

  function handlemiddle() {
    if (TOP_MIDDLE_TOGGLE === "create") TOP_MIDDLE_TOGGLE = "top";
    else TOP_MIDDLE_TOGGLE = "middle";
  }

  function handletop() {
    if (TOP_MIDDLE_TOGGLE === "middle") setPopupToggle(true);
    else if (TOP_MIDDLE_TOGGLE === "top") setPopupToggle(false);
    TOP_MIDDLE_TOGGLE = "top";
  }

  function setgroup() {
    const newGroupName = groupName.trim() !== "" ? groupName : "New Note";
    const newGroup = { groupName: newGroupName, groupColor, notesArray: [] };

    setGroupData([...groupData, newGroup]);
    setGroupName("");
    setGroupColor(color1);
    TOP_MIDDLE_TOGGLE = "create";
  }

  useEffect(() => {
    localStorage.setItem("groupData", JSON.stringify(groupData));
  }, [groupData]);

  return (
    <div className="main-container">
      <CreateNote
        setPopupToggle={setPopupToggle}
        popupToggle={popupToggle}
        groupData={groupData}
        setGroupNumber={setGroupNumber}
        groupNumber={groupNumber}
        noteOrSelected={noteOrSelected}
        setNoteOrSelected={setNoteOrSelected}
      />
      <DisplayNote
        groupData={groupData}
        groupNumber={groupNumber}
        setGroupData={setGroupData}
        noteOrSelected={noteOrSelected}
        setNoteOrSelected={setNoteOrSelected}
      />
      <div className='notesmodal-popup-cont' style={popupToggle ? {} : { display: "none" }} onClick={handletop}>
        <div className='notesmodal-popup' onClick={handlemiddle}>
          <h2>Create New Notes group</h2>
          <div className="groupname-cont">
            <h3>Group Name</h3>
            <input
              type="text"
              placeholder="Enter your group name..."
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </div>
          <div className="choosecol-cont">
            <h3>Choose colour</h3>
            {colorData.map((color, index) => (
              <img src={color.img} key={index} onClick={() => setGroupColor(color.img)} alt={`color-${index}`} />
            ))}
          </div>
          <button onClick={setgroup}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default App;
