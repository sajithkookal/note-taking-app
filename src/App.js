import logo from './logo.svg';
import Notes from './components/Notes';
import List from './components/List';
import './App.css';
import Dialog from './components/Dialog';
import React, { useState } from 'react';
import '@fontsource/roboto';

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [myGroupList, setGroupList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <div className="Appss">
       <List
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          myGroupList={myGroupList}
          setGroupList={setGroupList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem} 
          expanded={expanded}
          setExpanded={setExpanded}/>
         <Notes
          myGroupList={myGroupList}
          setGroupList={setGroupList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          expanded={expanded}
          setExpanded={setExpanded} />
      </div>

      {isDialogOpen && (
        <Dialog isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} setGroupList={setGroupList} />
      )}
    </div>

  );
}

export default App;
