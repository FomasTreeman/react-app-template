import {Row, Col, Button} from 'react-bootstrap'
import { CgMenu } from 'react-icons/cg';
import { GoSettings } from 'react-icons/go';
import {chats} from './Data';
import {memo} from 'react';

function Nav(props) {
    const { activeChat, handleLeft, handleRight } = props;

    function DisplayChatName() {
        if (activeChat !== 0) {
            return chats.filter(obj => obj.chatId === activeChat)[0].name.toUpperCase()
        }
        return null
    }

    return (
        <Row id="features">
            <Col>
                <Button className="p-0" variant="dark" onClick={handleLeft} >
                    <CgMenu />
                </Button>
            </Col>
            <Col id="activeConvoName">
                <DisplayChatName />
            </Col>
            <Col>
                <Button className="p-0" id="demoBTN" variant="dark" onClick={handleRight} >
                    <GoSettings />
                </Button>
            </Col>
        </Row>
    )
};
export default memo(Nav);