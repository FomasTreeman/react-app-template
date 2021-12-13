import { useState, useContext, forwardRef, Children } from "react";
import avatar from "animal-avatar-generator";
import { Offcanvas, Button, Form, Dropdown } from "react-bootstrap";
import { GlobalContext } from "../GlobalContext";
import { chats, friends, usersChats } from "./Data";
import Notification from './Notification';

export default function DrawerRight(props) {
  const { usersInChat, setUsersInChat, activeChatState, currentUser, show, handleHide, handleClicks } = props;
  const { activeChat, setActiveChat } = activeChatState;
  const [toasts, setToasts] = useContext(GlobalContext);
  const [value, setValue] = useState('');

  let usersFriends = friends.find(obj => obj.username === currentUser).friends.map(obj => { return obj.username });

  console.log(usersInChat)
  const Avatars = [];
  usersInChat.map(obj => { return Avatars.push(avatar(obj.username, { size: 70 })) });

  function createToast() {
    toasts.push(Notification);
    setToasts([...toasts]);
  }

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <Button
      className="m-4"
      variant="info"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  ));

  const CustomMenu = forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {Children.toArray(children).filter(
              (child) => {
                return !value || child.props.children[1].toLowerCase().startsWith(value);
              }
            )}
          </ul>
        </div>
      );
    },
  );

  function addToChat(e, username) {
    e.preventDefault();
    console.log(usersInChat.filter(obj => obj.username === username));
    if (usersInChat.filter(obj => obj.username === username).length === 0) {
      usersChats.push({ chatId: activeChat, username: username });
      setUsersInChat([...usersInChat, { chatId: activeChat, username: username }]);
    }
  }

  function friendRemoveFromChat(e, username) {
    e.preventDefault();
    console.log(username)
    usersChats.forEach((obj, index) => { if (obj.username === username && obj.chatId === activeChat) { usersChats.splice(index, 1) } })
    usersInChat.splice(usersInChat.findIndex(obj => obj.username === username), 1);
    setUsersInChat([...usersInChat]);
  }

  function deleteChat() {
    chats.splice(chats.findIndex(obj => obj.chatId === activeChat), 1);
    usersChats.filter(obj => obj.chatId !== activeChat);
    console.log(usersChats);
    setActiveChat(0);
  }

  var isDisabled;
  let usernamesInChat = usersInChat.map(obj => Object.entries(obj)[1][1]);

  return (
    <Offcanvas id="offcanvasContainer" placement="end" show={show} onHide={handleHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Settings</Offcanvas.Title>
        <Button className="m-0" variant="danger" onClick={createToast}>
          demo notif
        </Button>
      </Offcanvas.Header>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Add friend to chat
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {
            usersFriends.map((username, index) => {
              usernamesInChat.includes(username) ? isDisabled = true : isDisabled = false
              return <Dropdown.Item disabled={isDisabled} key={index} eventKey={index + 1} onClick={(e) => { addToChat(e, username) }}> {username} </Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
      <Offcanvas.Body className="p-0" >
        {
          usersInChat ? usersInChat.map((obj, index) => {
            return (
              <Button as='div' key={index} className="my-1" variant="outline-warning" id="friendsList">
                <div dangerouslySetInnerHTML={{ __html: Avatars[index] }}>
                </div>
                <p className="m-0" id="friendsName" >
                  {obj.username}
                </p>
                <Button className="" variant="danger" onClick={(e) => friendRemoveFromChat(e, obj.username)}>
                  -
                </Button>
              </Button>
            )
          }) : null
        }
        <Button className="mx-3 mt-3" variant="secondary" onClick={deleteChat}>
          Delete Chat
        </Button>
        <div id="loginReg">
          <Button className="m-4" variant="info" onClick={handleClicks.register}>
            Register
          </Button>
          <Button className="m-4" onClick={handleClicks.login}>
            Login
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}