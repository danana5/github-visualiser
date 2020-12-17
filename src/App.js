import "./App.css";
import React, { useState, useEffect } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Treemap,
} from "recharts";
import { Form, Card, Image, Icon } from "semantic-ui-react";

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
  const [fullRepos, setFullRepos] = useState("");

  let languages = new Map();
  let langArray = [];

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
const headers = {
  "Authorization": "Token " + "tokenGoesHere"
}
const options = {
  "method": "GET",
  "headers": headers
} 
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
    fetch(`https://api.github.com/users/${userInput}`,{options})
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError("User Not Found :(");
        } else {
          setData(data);
          fetch(`${data.repos_url}`)
            .then((res) => res.json())
            .then((reposArr) => {
              setFullRepos(reposArr);
              console.log(reposArr);
              console.log(typeof reposArr)
              for(let i = 0; i < reposArr.length;i++){
                console.log(languages);
                if(reposArr[i].language != null){
                  if(languages.has(reposArr[i].languages)){
                    let temp = languages.get(reposArr[i].language) + reposArr[i].size;
                    languages.delete(reposArr[i].language);
                    languages.set(reposArr[i].language, temp);
                  }
                  else{
                    languages.set(reposArr[i].language, reposArr[i].size);
                  }
                }
              }
              langArray = Array.from(languages, ([language, size]) => ({ language, size }));
              console.log(langArray);
            });

          setError(null);
        }
      });
  };

  return (
    <div>
      <div className="navbar">GitHub Visualiser</div>
      <div className="main">
        <div className="search">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder="Enter Username"
                name="name"
                onChange={handleSearch}
              />
              <Form.Button content="Go!" />
            </Form.Group>
          </Form>
        </div>
        {error ? (
          <h1>{error}</h1>
        ) : (
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
        )}
        <div className="charts">
          <div className="barChart">
            <BarChart width={800} height={250} data={fullRepos}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="size" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="radarChart">
          <RadarChart outerRadius={90} width={730} height={250} data={}>
            <PolarGrid />
            <PolarAngleAxis dataKey="language"/>
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Size" dataKey="size" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
