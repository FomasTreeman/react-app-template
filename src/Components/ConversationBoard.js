import { useEffect, useState, useRef } from "react"
import {
    InputGroup,
    FormControl,
    Button,
    Badge,
    Container,
    Row
} from "react-bootstrap";
import { messages } from './Data';

export default function ConversationBoard(props) {
    const [message, setMessage] = useState();
    const { currentUser, activeChat } = props;

    let formControlRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (formControlRef.current) formControlRef.current.focus();
        }, 500)
    }, [activeChat]);

    let chatMessages = messages.filter(obj => obj.chatId === activeChat)

    function sendMessage() {
        let newMessageObj = {
            messageId: chatMessages.length + 1,
            username: currentUser,
            chatId: activeChat,
            message: message
        }
        messages.push(newMessageObj)
        setMessage("")
        formControlRef.current.focus();
    }

    function IsCurrentUser(messageObj) {
        if (messageObj.username === currentUser) {
            return "right-side"
        }
        return "left-side"
    }

    const eventHandler = ({ target: { value } }) => {
        setMessage(value);
    };


    if (activeChat !== 0) {
        return (
            <div className="mt-5 pt-4">
                <Container fluid className="" id="messagesContainer">
                    {
                        chatMessages.map((messageObj, index) => {
                            return (
                                <Row key={index}>
                                    <p className="mb-0 mt-2" id="recipient" > {messageObj.username} </p>
                                    <Badge pill className="p-2 px-3 mb-2 shadow" bg="success" id={IsCurrentUser(messageObj)} > {messageObj.message} </Badge>
                                </Row>
                            )
                        })

                    }
                </Container>

                <InputGroup className="p-2" id="messageInput" >
                    <FormControl
                        ref={formControlRef}
                        as="textarea"
                        value={message}
                        placeholder="Message ..."
                        onChange={eventHandler}
                    />
                    <Button onClick={sendMessage} variant="primary" >
                        Send
                    </Button>
                </InputGroup>
            </div>
        )
    } else {
        return <h1 id="no_chat"> Hello {currentUser} </h1>
    }
};

