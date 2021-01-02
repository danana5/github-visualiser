import "./App.css";
import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Treemap,
} from "recharts";
import { Form, Card, Image, Icon, Button } from "semantic-ui-react";

function App() {
  const [fullName, setName] = useState("");
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [fullRepos, setFullRepos] = useState("");
  const [langArray, setLanguages] = useState("");
  const [popLang, setPopLang] = useState("");
  const [statURL, setStats] = useState("");
  const [userCommits, setUserCommits] = useState("");
  const [finalCommits, setFinalCommits] = useState("");
  const [finalMonth, setFinalMonth] = useState("");
  const [finalHour, setFinalHour] = useState("");
  const [popMonth, setMonth] = useState("");
  const [popHour, setHour] = useState("");

  let languages = new Map();
  let commits = new Map();
  let map = new Map();
  let commArr = [];
  let totalCommits = [];
  let totalMonths = [];
  let totalHours = [];

  useEffect(() => {
    fetch("https://api.github.com/users/example", { headers })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const headers = {
    Authorization: `Bearer token`,
  };
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
    setName("");
    setFullRepos("");
    setFollowers("");
    setLanguages("");
    setRepos("");
    setMonth("");
    setHour("");
    setUserCommits("");
    setFinalCommits("");
    setPopLang("");
    setBio("");

    fetch(`https://api.github.com/users/${userInput}`, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError("User Not Found :(");
          errorSearch();
        } else {
          setData(data);
          fetch(`${data.repos_url}`, { headers })
            .then((res) => res.json())
            .then((reposArr) => {
              getStats(userInput);
              getCommits(reposArr, data.name);
              getLanguages(reposArr);
            });
          setError(null);
        }
      });
  };

  const errorSearch = () => {
    setLanguages([]);
    setFullRepos([]);
  };

  const getStats = (input) => {
    setStats(
      "https://github-readme-stats.vercel.app/api?username=" +
        userInput +
        "&theme=radical"
    );
  };

  const getCommits = (reposArr, userName) => {
    for (let i = 0; i < reposArr.length; i++) {
      fetch(
        `https://api.github.com/repos/${reposArr[i].full_name}/commits?per_page=100`,
        {
          headers,
        }
      )
        .then((res) => res.json())
        .then((commArr) => {
          commits.set(reposArr[i].name, commArr.length);
          setFullRepos(
            Array.from(commits, ([name, commits]) => ({
              name,
              commits,
            }))
          );
          for (const x of commArr) {
            if (
              x.commit.committer.name == userName ||
              x.commit.committer.name == "GitHub"
            ) {
              let date = x.commit.committer.date.split("");
              let monthNum = date[5] + date[6];
              let hour = date[11] + date[12];
              let month = "";
              switch (monthNum) {
                case "01":
                  month = "January";
                  break;
                case "02":
                  month = "February";
                  break;
                case "03":
                  month = "March";
                  break;
                case "04":
                  month = "April";
                  break;
                case "05":
                  month = "May";
                  break;
                case "06":
                  month = "June";
                  break;
                case "07":
                  month = "July";
                  break;
                case "08":
                  month = "August";
                  break;
                case "09":
                  month = "September";
                  break;
                case "10":
                  month = "October";
                  break;
                case "11":
                  month = "November";
                  break;
                case "12":
                  month = "December";
                  break;
              }
              totalCommits.push(month + " " + hour);
              totalMonths.push(month);
              totalHours.push(hour);
            }
          }
        });
    }
    setFinalHour(totalHours);
    setFinalMonth(totalMonths);
    setUserCommits(totalCommits);
    finCommits(userCommits);
  };

  const finCommits = (users) => {
    for (let i = 0; i < users.length; i++) {
      let key = users[i];
      if (map.has(key)) {
        let temp = map.get(key);
        map.set(key, temp + 1);
      } else {
        map.set(key, 1);
      }
    }
    for (const [key, value] of map) {
      let splitted = key.split(" ");
      commArr.push({
        Month: splitted[0],
        Hour: parseInt(splitted[1]),
        Amount: value,
      });
    }
    setFinalCommits(commArr);
  };

  //function which will find the languages and total of bites for that languages
  const getLanguages = (reposArr) => {
    for (let i = 0; i < reposArr.length; i++) {
      fetch(`${reposArr[i].languages_url}`, { headers })
        .then((res) => res.json())
        .then((lang) => {
          if (lang != null) {
            for (const [key, value] of Object.entries(lang)) {
              if (languages.has(key)) {
                let num = languages.get(key);
                languages.set(key, value + num);
              } else {
                languages.set(key, value);
              }
            }
            setLanguages(
              Array.from(languages, ([name, size]) => ({
                name,
                size,
              }))
            );
          }
        });
    }
  };

  const mostUsedLanguage = (langArr) => {
    let temp = 0;
    let popLang = "";
    for (let i = 0; i < langArr.length; i++) {
      if (temp < langArr[i].size) {
        temp = langArr[i].size;
        popLang = langArr[i].name;
      }
    }
    setPopLang(popLang);
  };
  const mostActiveMonth = (arr) => {
    let monthMap = new Map();
    let resValue = 0;
    let res = "";

    for (let i = 0; i < arr.length; i++) {
      if (monthMap.has(arr[i])) {
        let temp = monthMap.get(arr[i]);
        monthMap.set(arr[i], temp + 1);
      } else {
        monthMap.set(arr[i], 1);
      }
    }
    for (const [key, value] of monthMap) {
      if (value > resValue) {
        resValue = value;
        res = key;
      }
    }
    setMonth(res);
  };

  const mostActiveHour = (arr) => {
    let hourMap = new Map();
    let resValue = 0;
    let res = "";

    for (let i = 0; i < arr.length; i++) {
      if (hourMap.has(arr[i])) {
        let temp = hourMap.get(arr[i]);
        hourMap.set(arr[i], temp + 1);
      } else {
        hourMap.set(arr[i], 1);
      }
    }
    for (const [key, value] of hourMap) {
      if (value > resValue) {
        resValue = value;
        res = key;
      }
    }
    setHour(res);
  };

  const handleAnalysis = () => {
    if (popLang == "") {
      mostUsedLanguage(langArray);
      mostActiveMonth(finalMonth);
      mostActiveHour(finalHour);
      finCommits(userCommits);
    }
  };

  return (
    <div>
      <div className="headerBar">
        <h2>GitHub Visualiser</h2>
        <p>By Daniel Grace</p>
      </div>
      <div className="main">
        <div className="search">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder="Enter Username"
                name="name"
                onChange={handleSearch}
              />
              <Form.Button content="Go!" color="teal" />
            </Form.Group>
          </Form>
        </div>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <div className="profile">
            <div className="card">
              <Card>
                <Image src={avatar} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{fullName}</Card.Header>
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
            <div className="stats">
              <img src={statURL} />
            </div>
            <div className="charts">
              <div>
                <div>
                  <h1>Repositories (Max Commits 100)</h1>
                </div>
                <div className="barChart">
                  <BarChart width={800} height={250} data={fullRepos}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commits" fill="#e13d81" />
                  </BarChart>
                </div>
              </div>
              <div>
                <div>
                  <h1>Languages</h1>
                </div>
                <div className="treeChart">
                  <Treemap
                    width={730}
                    height={250}
                    data={langArray}
                    dataKey="size"
                    ratio={4 / 3}
                    stroke="#fff"
                    fill="#e13d81"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1>Analysis</h1>
            </div>
            <div className="calculate">
              <div>
                <Button
                  onClick={handleAnalysis}
                  content="Update"
                  color="teal"
                />
              </div>
            </div>
            <div className="charts2">
              <div className="scatterChart">
                <ScatterChart
                  width={790}
                  height={400}
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Month" name="Month" />
                  <YAxis dataKey="Hour" name="Hour" unit=":00" />
                  <ZAxis dataKey="Amount" range={[64, 144]} name="Amount" />
                  <Tooltip cursor={{ strokeDasharray: "3 " }} />
                  <Scatter name="Commits" data={finalCommits} fill="#e13d81" />
                </ScatterChart>
              </div>
              <div className="analytics">
                <h3>Most Used Language: {popLang}</h3>
                <h3>Most Active Month: {popMonth}</h3>
                <h3>Most Active Hour of the Day: {popHour}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
