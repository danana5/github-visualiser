import "./App.css";
import React, { useState, useEffect } from "react";
import { Form, Card, Image, Icon } from "semantic-ui-react";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <div className="navbar">GitHub Visualiser</div>
      <div className="main">
        <div className="search">
          <Form>
            <Form.Group>
              <Form.Input placeholder="Enter Username" name="name" />
              <Form.Button content="Go!" />
            </Form.Group>
          </Form>
        </div>
        <div className="card">
          <Card>
            <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 2015</span>
              </Card.Meta>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
