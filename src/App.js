import './App.css';
import { useState, useEffect } from 'react'
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
  const mumsConversations = {
    "dad": [
      { "dad_1": "heya its dad" },
      { "dad_2": "how are you today?" },
      { "mum_3": "im good thanks, and you?" },
      { "dad_4": "good good" },
      { "dad_5": "have a good day" },
    ],
    "aleks": [
      { "aleks_1": "hola its aleks" },
      { "aleks_2": "did you see the weather?" },
      { "mum_3": "yes it was grand" },
      { "aleks_4": "it was snowing for me" },
      { "mum_5": "yes it was grand" },
      { "mum_6": "i wish" },
    ],
  }

  const [showMes, setShowMes] = useState(false);
  const [NotificationList, setNotificationList] = useState([]);
  const [ActiveConvo, setActiveConvo] = useState(Object.entries(mumsConversations)[0])


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



  const friends = [
    "dad",
    "aleks",
    "harry",
    "builder",
    "jerry"
  ]


  const Avatars = [];
  friends.map((name) => { return Avatars.push(avatar(name, { size: 70 })) });
  // console.log(Avatars.length)

  function CreateToast() {
    NotificationList.push(Notifications);
    setNotificationList([...NotificationList]);
  }

  function RemoveToast(index) {
    NotificationList.splice(index, 1);
    setNotificationList([...NotificationList]);
  }

  function OpenConvo(index) {
    if (index < Object.keys(mumsConversations).length) {
      setActiveConvo(Object.entries(mumsConversations)[index])
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      NotificationList.splice(NotificationList.length -1, 1);
      setNotificationList([...NotificationList]);

    }, 3000)

    return () => clearTimeout(timeout)
  }, [NotificationList])

  return (

    <>
      <Row id="features">
        <Col>
          <Button className="p-0" variant="dark" onClick={handleShow} >
            <CgMenu />
          </Button>
        </Col>
        <Col id="activeConvoName">
          {ActiveConvo[0].toUpperCase()}
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

      <ConversationBoard currentUser={currentUser} ActiveConvo={ActiveConvo} setActiveConvo={setActiveConvo} />

      <Offcanvas id="offcanvasContainer" show={showMes} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 mt-2" >
          {
            friends.map((friend, index) => {
              return (
                <Button key={index} onClick={() => { OpenConvo(index) }} className="my-1" variant="outline-info" id="friendsList">
                  <div dangerouslySetInnerHTML={{ __html: Avatars[index] }}>
                  </div>
                  <p className="m-0" id="friendsName" >
                    {friend}
                  </p>
                  <hr id="divider" />
                </Button>
              )
            })
          }
        </Offcanvas.Body>
        <p id="offcanvasFooter" > Signed in as: {currentUser} </p>
      </Offcanvas>
    </>
  );
}

export default App;