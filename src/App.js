import './App.css';
import { useCallback, useEffect, useState } from 'react'
import { friends, usersChats } from './Components/Data'
import Nav from './Components/Nav';
import Login from './Components/Login';
import Register from './Components/Register';
import Toasts from './Components/Toasts';
import ConversationBoard from './Components/ConversationBoard';
import DrawerLeft from './Components/DrawerLeft';
import DrawerRight from './Components/DrawerRight';

function App() {
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const [activeChat, setActiveChat] = useState(1);
  const [currentUser, setCurrentUser] = useState("fom_tree");
  const [usersInChat, setUsersInChat] = useState([]);

  let usersFriends = friends.find(obj => obj.username === currentUser)
  let usersFriendsNames = usersFriends.friends.map((obj) => { return obj.username })
  
  const handleRight = useCallback(() => {setShowRightDrawer(true)}, [setShowRightDrawer]);
  const handleLeft = useCallback(() => {setShowLeftDrawer(true)}, [setShowLeftDrawer]);
  console.log(usersChats.filter(obj => obj.chatId === activeChat && obj.username !== currentUser))
  useEffect(() => {
    setUsersInChat([...usersChats.filter(obj => obj.chatId === activeChat && obj.username !== currentUser)]);
  }, [setUsersInChat, activeChat, currentUser ]);


  return (
    <>
      <Nav activeChat={activeChat} handleLeft={handleLeft} handleRight={handleRight} />
      <Toasts />
      <Login show={{ showLogin, setShowLogin }} setShowRightDrawer={setShowRightDrawer} currentUser={currentUser} setCurrentUser={setCurrentUser} setActiveChat={setActiveChat} />
      <Register show={{ showRegister, setShowRegister }} setShowRightDrawer={setShowRightDrawer} currentUser={currentUser} setCurrentUser={setCurrentUser} setActiveChat={setActiveChat} />
      <ConversationBoard currentUser={currentUser} activeChat={activeChat} />
      <DrawerLeft setUsersInChat={setUsersInChat} usersFriendsNames={usersFriendsNames} currentUser={currentUser} show={{ showLeftOC: showLeftDrawer, setShowLeftOC: setShowLeftDrawer }} setActiveChat={setActiveChat} />
      <DrawerRight usersInChat={usersInChat} setUsersInChat={setUsersInChat} activeChatState={{activeChat, setActiveChat}} currentUser={currentUser} show={showRightDrawer} handleHide={() => { setShowRightDrawer(false) }} handleClicks={{ login: () => { setShowLogin(true) }, register: () => { setShowRegister(true) } }} />
    </>
  );
}

export default App;