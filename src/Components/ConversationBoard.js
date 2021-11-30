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
    const [ActiveConvo, setActiveConvo] = useState(props.CurrentConversation["dad"])
    // { CurrentConversation, CurrentUser } = props;

    // function IsCurrentUser() {
    //     let convoID = Object.keys(props.CurrentConversation)[0]
    //     let users = convoID.split("-")
    //     console.log(users, props.currentUser, props.CurrentConversation)
    //     if (users[0] === props.currentUser) {
    //         return "right-side"
    //     }
    //     return "left-side"
    // }

    function sendMessage() {
        ActiveConvo.push({
            "dad_5":message
        })
        setActiveConvo([...ActiveConvo])
        console.log(ActiveConvo)
    }

    function IsCurrentUser(messageObj) {
        let key = Object.keys(messageObj)[0]
        let user = key.split("_")
        if (user[0] === props.currentUser) {
            return "left-side"
        }
        return "right-side"
    }

    return (
        <div className="mt-5 pt-4">
            <Container fluid className="" id="messagesContainer">
                {
                    ActiveConvo.map((messageObj, index) => {
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