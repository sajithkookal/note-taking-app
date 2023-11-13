import React, { useState, useEffect } from 'react';
import './Dialog.css';

function Dialog({ isDialogOpen, setDialogOpen, setGroupList }) {
  const [inputValue, setInputValue] = useState('');
  const [colour, setColour] = useState('');

  // useEffect(() => {
  //   cc
  //   if (serializedList) {
  //     const parsedList = JSON.parse(serializedList);
  //     setGroupList(parsedList);
  //   }
  // }, []);


  const [isPurple, setPurpleClicked] = useState(false);
  const [isPink, setPinkClicked] = useState(false);
  const [isLightBlue, setLightBlueClicked] = useState(false);
  const [isOrange, setOrangeClicked] = useState(false);
  const [isBlue, setBlueClicked] = useState(false);
  const [isGrey, setGreyClicked] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const colourSelected = (selecteddDiv, colourCode) => {
    setPurpleClicked(false);
    setPinkClicked(false);
    setLightBlueClicked(false);
    setOrangeClicked(false);
    setBlueClicked(false);
    setGreyClicked(false);

    selecteddDiv(true);
    setColour(colourCode);
    console.log(colourCode);
    console.log(inputValue);
  };


  return (
    <div className="dialogBackground" onClick={()=>{
      isDialogOpen && setDialogOpen(false);
    }
      }>
      <div className="dialog-content" onClick={(e)=>{e.stopPropagation();}}>
        <p>Create New Notes group</p>
        <label id='label'>Group Name </label>
        <input type="text" id="inputField" value={inputValue} onChange={handleInputChange} placeholder="Enter your group name...." />
        <div id='chooseColor'>
          <p>Choose Colour</p>
          <div id='purple' style={{ border: isPurple ? '2px solid black' : 'none', }}
            onClick={() => { colourSelected(setPurpleClicked, 'purple') }}>
          </div>
          <div id='pink' style={{ border: isPink ? '2px solid black' : 'none', }} onClick={() => { colourSelected(setPinkClicked, 'rgb(240, 57, 164)') }}></div>
          <div id='lightBlue' style={{ border: isLightBlue ? '2px solid black' : 'none', }} onClick={() => { colourSelected(setLightBlueClicked, 'rgb(75, 183, 219)') }}></div>
          <div id='orange' style={{ border: isOrange ? '2px solid black' : 'none', }} onClick={() => { colourSelected(setOrangeClicked, 'rgb(212, 123, 51)') }}></div>
          <div id='blue' style={{ border: isBlue ? '2px solid black' : 'none', }} onClick={() => { colourSelected(setBlueClicked, 'rgb(40, 28, 174)') }}></div>
          <div id='grey' style={{ border: isGrey ? '2px solid black' : 'none', }} onClick={() => { colourSelected(setGreyClicked, 'rgb(61, 105, 151)') }}></div>
        </div>
        <button id='btnCreate' onClick={() => {
          if (inputValue.trim() !== '') {
            if (colour.trim() !== '') {
              const newItem = {
                groupName: inputValue,
                colour: colour,

              };
              console.log(newItem);
              const storageList = localStorage.getItem('myGroupList');
              console.log('12', storageList);
              if (storageList) {
                const parsedList = JSON.parse(storageList);
                const newArray = [...parsedList, newItem];
                setGroupList(newArray);
                const serializedList = JSON.stringify(newArray);
                // Save the serialized list to local storage
                localStorage.setItem('myGroupList', serializedList);
              } else {
                const newArray = [newItem];
                console.log([newArray]);
                setGroupList(newArray);
                const serializedList = JSON.stringify(newArray);
                // Save the serialized list to local storage
                localStorage.setItem('myGroupList', serializedList);
              }
              const serializedList = localStorage.getItem('myGroupList');
              console.log('ddssd');
              console.log(serializedList);

              setDialogOpen(false);
            } else {
              // Handle the case when the input is empty
              alert('Please select colour');
            }
          } else {
            // Handle the case when the input is empty
            alert('Please enter Group name.');
          }

        }}>Create</button>
      </div>
    </div>
  );
}

export default Dialog;