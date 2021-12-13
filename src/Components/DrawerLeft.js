import { Offcanvas, Button, Form, Modal } from "react-bootstrap"
import avatar from "animal-avatar-generator";
import { usersChats, chats } from './Data'
import { useRef, useState } from "react";

export default function DrawerLeft(props) {
  const { usersFriendsNames, currentUser, show, setActiveChat } = props;
  const [showModal, setShowModal] = useState(false);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  const [friendsList, setFriendsList] = useState(usersFriendsNames);
  const friendSearchValue = useRef('');
  const chatSearchValue = useRef('');
  const item = useRef('');

  const Avatars = [];
  friendsList.map((name) => { return Avatars.push(avatar(name, { size: 70 })) });

  let friendsButtons = friendsList.map((friend, index) => {
    return (
      <Button key={index} className="my-1" variant="outline-warning" id="friendsList" onClick={(e) => { item.current = e.target.innerText; setShowModal(true); }}>
        <div dangerouslySetInnerHTML={{ __html: Avatars[index] }}>
        </div>
        <p className="m-0" id="friendsName" >
          {friend}
        </p>
      </Button>
    )
  });

  let currentUsersChats = usersChats.filter(obj => obj.username === currentUser).map(obj => { return obj.chatId });
  currentUsersChats = chats.filter(obj => currentUsersChats.includes(obj.chatId))

  var friendSearchForm, chatSearchForm

  if (showFriendSearch === true) {
    friendSearchForm = <Form.Control ref={friendSearchValue} type="text" placeholder="Username ..." />
  }
  if (showChatSearch === true) {
    chatSearchForm = <Form.Control ref={chatSearchValue} type="text" placeholder="Chat name ..." />
  }


  function createChat(e) {
    if (showChatSearch === true) {
      if (chatSearchValue.current.value === '') {
        setShowChatSearch(false)
      } else {
        const id = chats.length + 1;
        chats.push({ chatId: id, name: chatSearchValue.current.value });
        usersChats.push({ chatId: id, username: currentUser });
        setActiveChat(id);
        show.setShowLeftOC(false);
        setShowChatSearch(false);
      }
    } else {
      setShowChatSearch(true);
    }
    e.preventDefault();
  }

  function addFriend(e) {
    if (showFriendSearch === true) {
      const input = friendSearchValue.current.value;
      // if (users.find(obj => obj.username === input)) {
      //   const indexCurrentUser = friends.findIndex(obj => obj.username === currentUser)
      //   friends[indexCurrentUser].friends.push({ username: input });
      // }
      friendsList.push(input);
      setShowFriendSearch(false);
    } else {
      setShowFriendSearch(true);
    }
    e.preventDefault();
  }

  const handleClose = () => setShowModal(false);

  function removeFriend(e) {
    // let userIndex = friends.findIndex(obj => obj.username === currentUser)
    // let friendsIndex = friends.find(obj => obj.username === currentUser).friends.findIndex(obj => obj.username === item.current)
    // friends[userIndex].friends.splice(friendsIndex, 1)
    console.log(friendsList)
    let friendsIndex = friendsList.findIndex(name => name === item.current);
    console.log(friendsIndex, item.current)
    friendsList.splice(friendsIndex, 1);
    setFriendsList([...friendsList]);
    console.log(friendsList)
    e.preventDefault();
    handleClose();
  }

  function ModalRemove(showModal) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Remove friend</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p3">
          {item.current}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={removeFriend}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      {ModalRemove(showModal)}
      <Offcanvas id="offcanvasContainer" show={show.showLeftOC} onHide={() => { show.setShowLeftOC(false) }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chats</Offcanvas.Title>
          <Form id="form" onSubmit={(e) => createChat(e)}>
            {chatSearchForm}
            <Button type="submit" variant="success">
              +
            </Button>
          </Form>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 mt-2" >
          {
            currentUsersChats.map((chat, index) => {
              return (
                <Button key={index} onClick={(e) => { e.preventDefault(); setActiveChat(chat.chatId); show.setShowLeftOC(false); }} className="my-1" variant="outline-warning" id="friendsList">
                  <p className="m-0" id="friendsName" >
                    {chat.name}
                  </p>
                </Button>
              )
            })
          }
        </Offcanvas.Body>
        <Offcanvas.Header >
          <Offcanvas.Title>Friends</Offcanvas.Title>
          <Form id="form" onSubmit={(e) => addFriend(e)}>
            {friendSearchForm}
            <Button type="submit" variant="success" >
              +
            </Button>
          </Form>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 mt-2" >
          {friendsButtons}
        </Offcanvas.Body>
        <p id="offcanvasFooter" > Signed in as: {currentUser} </p>
      </Offcanvas>
    </>
  )
};