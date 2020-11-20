import React, {Component, setAppState} from 'react';
import List from './List';
const USERURL = 'https://api.github.com/users/';
class UserForm extends Component {
  constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
    

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
    handleSubmit(event) {
      fetch('https://api.github.com/users/danana5/repos')
      .then((response) => response.json())
      .then((repos) => {
        setAppState({repos: repos});
      });
      event.preventDefault();
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
                Username:
                <input type="text" value={this.state.value} onChange={this.handleChange} />        
            </label>   
            <input type="submit" value="Go!"/>
          </form>
          <div className='container'>
            <h1>Repositories</h1>
          </div>
          <div className='repo-container'>
            <List/>
          </div>
        </div>
      );
    }
}

export default UserForm;