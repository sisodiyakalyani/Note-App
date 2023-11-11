
import "./CreateNote.css"; 

function CreateNote({
  setPopupToggle,
  popupToggle,
  groupData,
  setGroupNumber,
  groupNumber,
  setNoteOrSelected,
  noteOrSelected,
}) {
  function handleNoteSelection(index) {
    setGroupNumber(index);
    setNoteOrSelected(false);
  }

  return (
    <div className="modified-notecat-container" style={noteOrSelected ? { display: "flex" } : { display: "none" }}>
      <div className="modified-title">Pocket Notes</div>
      <button onClick={() => setPopupToggle(!popupToggle)}>+ Create Notes group</button>
      <div className="modified-group-container">
        {groupData.map((group, index) => (
          <div
            className="modified-group"
            style={groupNumber === index ? { backgroundColor: "#F7ECDC" } : {}}
            onClick={() => handleNoteSelection(index)}
            key={index}
          >
            <div className="modified-group-icon">
              <img src={group.groupColor} alt="" />
              <h3>{group.groupName.slice(0, 2).toUpperCase()}</h3>
            </div>
            <div className="modified-group-name">{group.groupName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateNote;
