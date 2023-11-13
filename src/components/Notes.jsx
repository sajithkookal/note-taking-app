import React, { useState, useEffect } from "react";
import './Notes.css';
import { IoSend } from 'react-icons/io5';
import {IoArrowBackOutline} from 'react-icons/io5';
import '@fontsource/roboto';
import moment from "moment";

const Notes = ({ myGroupList, setGroupList, selectedItem, setSelectedItem,expanded,setExpanded }) => {
    console.log(selectedItem);
    const [noteText, setNoteText] = useState('');
    const [myNoteList, setNoteList] = useState([]);

    useEffect(() => {
        const serializedList = localStorage.getItem('myGroupList');
        if (serializedList) {
            const parsedList = JSON.parse(serializedList);
            setGroupList(parsedList);
        }
        const serializedNoteList = localStorage.getItem('myNoteList');
        if (serializedNoteList) {
            const parsedNoteList = JSON.parse(serializedNoteList);
            setNoteList(parsedNoteList);
        }
    }, []);
    const handleInputChangeNote = (event) => {
        setNoteText(event.target.value);
    };
    const addNotes = () => {
        if (noteText.trim() !== '') {
            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            const currentDate = new Date();
           const formattedDate= moment(currentDate).format('D MMMM YYYY');
            console.log(formattedTime);
            console.log(formattedDate);
            const newNote = {
                id: selectedItem,
                time: formattedTime,
                date: formattedDate,
                note: noteText
            };
            const serializedNoteList = localStorage.getItem('myNoteList');
            if (serializedNoteList) {
                const parsedNoteList = JSON.parse(serializedNoteList);
                const newArray = [...parsedNoteList, newNote];
                setNoteList(newArray);
                console.log(newArray);
                const serializedList = JSON.stringify(newArray);
                // Save the serialized list to local storage
                localStorage.setItem('myNoteList', serializedList);
            } else {
                const newArray = [newNote];
                setNoteList(newArray);
                console.log(newArray);
                const serializedList = JSON.stringify(newArray);
                // Save the serialized list to local storage
                localStorage.setItem('myNoteList', serializedList);
            }
            setNoteText('');
        }
    }
    console.log(selectedItem);
    return (
        <div className={`notesMain ${expanded ? 'expanded' : ''}`}>
            {selectedItem != null ? (<div id="notePage" >
                <div id="noteHeading">
                    <IoArrowBackOutline id="backArrow" onClick={()=>{setExpanded(false);}}/>
                    <div id="roundDiv" style={{ backgroundColor: myGroupList[selectedItem].colour }}>
                        <p className="text-inside"> {myGroupList[selectedItem].groupName.substring(0, 2).toUpperCase()}</p>
                    </div>
                    <div id="textDiv">
                        {myGroupList[selectedItem].groupName}
                    </div>
                </div>
                <div id="middleDiv">
                    <ul>
                        {myNoteList.map((item, index) => (

                            selectedItem == item.id ? (<li key={index} >
                                <div id="notesDetails">
                                    <div id="dateAndTime">
                                        <div>{item.time}</div>
                                        <div>{item.date}</div>
                                    </div>
                                    <p id="noteDiscription">{item.note}</p>
                                </div>
                            </li>) : null
                        ))}
                    </ul>
                </div>
                <div id="bottomDiv">
                    <div id="subBottomDiv">
                        <textarea rows="4" type="text" id="inputFieldNote" value={noteText} onChange={handleInputChangeNote} placeholder="Enter your text here........" >
                        </textarea>
                        <IoSend onClick={addNotes} />
                    </div>

                </div>
            </div>) : null}

        </div>
    )
}
export default Notes;