import { useState } from "react"
import { 
    InputGroup, 
    FormControl, 
    Button, 
    Badge, 
    Container, 
    Row
} from "react-bootstrap"

export default function ConversationBoard(props) {
    const [message, setMessage] = useState()

    // console.log(props.ActiveConvo)

    function sendMessage() {
        let id = props.currentUser.concat("_".concat((props.ActiveConvo[1].length + 1).toString()))
        props.ActiveConvo[1].push({
            [id]: message
        })
        props.setActiveConvo([...props.ActiveConvo])
        setMessage("")
    }

    function IsCurrentUser(messageObj) {
        let key = Object.keys(messageObj)[0]
        let user = key.split("_")
        if (user[0] === props.currentUser) {
            return "right-side"
        }
        return "left-side"
    }

    return (
        <div className="mt-5 pt-4">
            <Container fluid className="" id="messagesContainer">
                {
                    props.ActiveConvo[1].map((messageObj, index) => {
                        return (
                            <Row key={index}>
                                <Badge pill className="p-2 px-3 mb-2 shadow" bg="success" id={IsCurrentUser(messageObj)} > {messageObj[Object.keys(messageObj)[0]]} </Badge>
                            </Row>
                        )
                    }) 

                }
            </Container>

            <InputGroup className="p-2" id="messageInput" >
                <FormControl 
                    as="textarea"
                    value={message}
                    placeholder="Message ..."
                    onChange={({ target: { value } }) => { setMessage(value); }}
                />
                <Button onClick={sendMessage} variant="primary" >
                    Send
                </Button>
            </InputGroup>
        </div>
    )
}