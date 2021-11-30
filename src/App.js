import './App.css';
import { useState } from 'react'
import {
  Button,
  Row,
  Col,
  Offcanvas,
  ToastContainer
} from 'react-bootstrap'
import { CgMenu } from 'react-icons/cg';
import avatar from 'animal-avatar-generator'
import Notifications from './Components/Notification';
import ConversationBoard from './Components/ConversationBoard';

function App() {
  const [showMes, setShowMes] = useState(false);
  const [NotificationList, setNotificationList] = useState([]);
  const [ActiveConvo, setActiveConvo] = useState("dad")
  const handleClose = () => setShowMes(false);
  const handleShow = () => setShowMes(true);

  // NotificationList.push(Notifications(NotificationList))
  // console.log(NotificationList)
  let currentUser = "mum"; 

  // const database = {
  //   "userIDs": {
  //     "001": {
  //       "name": "Aleks",
  //       "email": "aleks@gmail.com",
  //       "password": "ABCD",
  //       "activeConvos": [
  //         "002",
  //         "003"
  //       ]
  //     },
  //     "002": {
  //       "name": "Mum",
  //       "email": "mum@gmail.com",
  //       "password": "1234",
  //       "activeConvos": [
  //         "002"
  //       ]
  //     },
  //     "003": {
  //       "name": "Dad",
  //       "email": "dad@gmail.com",
  //       "password": "ABC123",
  //       "activeConvos": []
  //     }
  //   }
  // }

  const CurrentConversation = {
    "dad": [
      {"dad_1": "heya"},
      {"dad_2": "how are you today?"},
      {"mum_3": "im good thanks, and you?"},
      {"dad_4": "good good"}   
    ]
  }

  const friends = [
    "dad",
    "mum",
    "aleks",
    "harry",
    "builder",
    "jerry"
  ]  

  const Avatars = [];
  friends.map((name) => {return Avatars.push(avatar(name, { size: 70 }))});
  // console.log(Avatars.length)

  function CreateToast() {
    let notifID = NotificationList.length
    NotificationList.push(Notifications);
    setNotificationList([...NotificationList]);
    console.log("create", NotificationList)
    let timeOut = setTimeout(() => { TimedRemoveToast() }, 6000)
    function TimedRemoveToast() {
      RemoveToast(notifID, timeOut)
    }
  }

  function RemoveToast(index, timeOut) {
    NotificationList.splice(index, 1);
    setNotificationList([...NotificationList]);
    console.log("remove", NotificationList)
    if (typeof timeOut != 'undefined') {
      clearTimeout(timeOut);
    }
  }

  return (
    <>
      <Row id="features">
        <Col>
          <Button className="p-0" variant="dark" onClick={handleShow} >
            <CgMenu/>
          </Button>
        </Col>
        <Col id="activeConvoName">
          {ActiveConvo.toUpperCase()}
        </Col>
        <Col>
          <Button variant="danger" id="demoBTN" onClick={CreateToast}>
            demo notif
          </Button>
        </Col>
      </Row>
      <ToastContainer id="toastContainer" position="bottom-end">
        {
          NotificationList.map((toast, index) => {
            return toast(RemoveToast, index)
          })
        }
      </ToastContainer>

      <ConversationBoard CurrentConversation={CurrentConversation} currentUser={currentUser}/>

      <Offcanvas id="offcanvasContainer" show={showMes} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 mt-2" >
          {
            friends.map((friend, index) => {
              return (
                <Button className="my-1" variant="outline-info" id="friendsList">
                  <div dangerouslySetInnerHTML={{__html: Avatars[index]}}>
                  </div>
                  <p className="m-0" id="friendsName" key={index}>
                    {friend}
                  </p>
                  <hr id="divider"/>
                </Button>
              )
            })
          }
        </Offcanvas.Body>        
        <p id="offcanvasFooter" > Signed in as: { currentUser } </p>
      </Offcanvas>
    </>
  );
}

export default App;