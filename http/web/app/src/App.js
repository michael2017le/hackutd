import React, { Component } from "react";
import "./App.css";
import Job from "./Job";
import axios from "axios";
import List from "@material-ui/core/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/jobs").then(response => {
      this.setState({ jobs: response.data });
    });
  }

  render() {
    const jobsLi = this.state.jobs.map(x => {
      return <Job job={x} key={x._id} />;
    });
    return (
      <div className="parentElement">
        <div className="childElement">
          <List>{jobsLi}</List>
        </div>
      </div>
    );
  }
}

export default App;
