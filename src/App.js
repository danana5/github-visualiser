import "./App.css";
import React, { useState, useEffect } from "react";
import { Form, Card, Image, Icon, Dropdown } from "semantic-ui-react";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const options = [
    { key: 1, text: "Username", value: 1 },
    { key: 2, text: "Repository", value: 2 },
    { key: 3, text: "Organization", value: 3 },
  ];

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setUsername(login);
    setBio(bio);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div>
      <div className="navbar">GitHub Visualiser</div>
      <div className="main">
        <div className="search">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Dropdown clearable options={options} selection />
              <Form.Input
                placeholder="Enter Username"
                name="name"
                onChange={handleSearch}
              />
              <Form.Button content="Go!" />
            </Form.Group>
          </Form>
        </div>
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{username}</Card.Meta>
              <Card.Description>{bio}</Card.Description>
            </Card.Content>

            <Card.Content extra>
              <a>
                <Icon name="user" />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="puzzle" />
                {repos} Repositories
              </a>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
