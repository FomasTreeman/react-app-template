import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { users, friends } from './Data';

export default function Register(props) {
    const [username, setUsername] = useState()
    const [displayName, setDisplayName] = useState()
    const { show, setShowRightDrawer, setCurrentUser, setActiveChat } = props
    
    
    // const onSubmitSignIn = () => {
    //     fetch('http://localhost:3000/signin', {
    //       method: 'post',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify({
    //         email: Email,
    //         password: Password
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(user => {
    //         if (user.id) {
    //           props.currentUser(user.name)
    //           props.Convos();
    //         }
    //       })
    //   }

    function attemptRegister(e) {
        e.preventDefault()
        users.push({ username: username, name: displayName })
        friends.push({ username: username, friends: [] })
        setActiveChat(0)
        setCurrentUser(username)
        show.current = false

    }


    return (
        <Modal show={show.showRegister} id="modal">
            <Modal.Header >
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={(e) => {attemptRegister(e); show.setShowRegister(false); setShowRightDrawer(false);}}>
                    <Form.Group className="mb-3" onChange={(e) => { setUsername(e.target.value) }} >
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" onChange={(e) => { setDisplayName(e.target.value) }}>
                        <Form.Label>Display name</Form.Label>
                        <Form.Control required type="text" placeholder="Name" />
                    </Form.Group>
                    <div className="p-2" id="loginBTNs">
                        <Button onClick={() => { show.setShowRegister(false) }} variant="outline-dark">cancel</Button>
                        <Button type="submit" variant="primary">Login</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    );
}
