import './App.css';
import { Container, Row, Col } from 'bootstrap-4-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  return (
    <Router>
      <div>
        <Container>
            <Row>
              <Col>
                <Link className="text-success" to="/">reset</Link>
              </Col>
              <Col>
                <Link className="text-info" to="/Yay">click me</Link>
              </Col>
              <Col>
                <Link className="text-warning" to="/Nay">dont click me</Link> 
              </Col>
            </Row>
        </Container>
        <Switch>
          <Route path="/Yay">
            <Yay />
          </Route>
          <Route path="/Nay">
            <Nay />
          </Route>
          <Route path="/">
             <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>boring homepage</h2>;
}

function Yay() {
  return <h2>you clicked me yay</h2>;
}

function Nay() {
  return <h2>shouldnt have clicked me</h2>;
}

export default App;