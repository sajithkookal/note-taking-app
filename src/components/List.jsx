import React, { useState, useEffect } from "react";
import './List.css';
import { PiPlusBold } from 'react-icons/pi';


const List = ({ isDialogOpen, setDialogOpen,myGroupList, setGroupList,selectedItem,setSelectedItem,expanded,setExpanded }) => {
    console.log('expanded');
    console.log(expanded);
    useEffect(() => {
        const serializedList = localStorage.getItem('myGroupList');
        if (serializedList) {
            const parsedList = JSON.parse(serializedList);
            setGroupList(parsedList);
        }
    }, []);

    const handleClick = (index) => {
        // Update the selected item when clicked
        setSelectedItem(index);
        setExpanded(true);
    };
    return (
        <div className={`listMain ${expanded ? 'expanded' : ''}`}>
            <div id="pocketNotes">
                Pocket Notes
            </div>
            <div id="createNotes" onClick={() => {
                setDialogOpen(true);
            }}>
                <p id="paraCreatenotes">
                    <PiPlusBold />
                    Create Notes groups
                </p>
            </div>
            <div id='listDiv'>
                <ul>
                    {myGroupList.map((item, index) => (

                        <li key={index} onClick={() => handleClick(index)}>
                            <div id="singleItem" style={{
                                cursor: 'pointer',
                                backgroundColor: selectedItem === index ? '#F7ECDC' : 'white',
                            }}>
                                <div id="roundDiv" style={{ backgroundColor: item.colour }}>
                                    <p className="text-inside"> {item.groupName.substring(0, 2).toUpperCase()}</p>
                                </div>
                                <div id="textDiv">
                                    {item.groupName}
                                </div>
                            </div>


                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}
export default List;