// import { useState } from 'react';
import { useState, memo } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { users } from './Data'

export default memo((props) => {
    const [username, setUsername] = useState()
    const [validated, setValidated] = useState()
    const { show, setShowRightDrawer, setCurrentUser, setActiveChat } = props;

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
    //           currentUser(user.name)
    //           Convos();
    //         }
    //       })
    //   }

    function attemptLogin(e) {
        const exists = users.filter(obj => obj["username"] === username)

        if (exists.length > 0) {
            setCurrentUser(username)
            setActiveChat(0)
            show.current = false
            setValidated(true);
        } else {
            e.stopPropagation();
        }
        e.preventDefault();

    }

    return (
        <Modal show={show.showLogin} id="modal">
            <Modal.Header >
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form 
                    validated={validated} 
                    onSubmit={(e) => {
                        attemptLogin(e); 
                        show.setShowLogin(false); 
                        setShowRightDrawer(false);
                    }}>
                    <Form.Group className="mb-3" onChange={(e) => { setUsername(e.target.value) }} >
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Username" />
                    </Form.Group>
                    <div className="p-2" id="loginBTNs">
                        <Button onClick={() => { show.setShowLogin(false) }} variant="outline-dark">cancel</Button>
                        <Button type="submit" variant="primary" id >Login</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    );
});
