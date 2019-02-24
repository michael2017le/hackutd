import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

class Job extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <li>
      //   {console.log("here")}
      //   {this.props.job.title} {this.props.job.description}
      // </li>
      <ListItem
        key={this.props.job.id}
        role={undefined}
        dense
        button
        // onClick={this.handleToggle(value)}
      >
        <Checkbox tabIndex={-1} disableRipple />

        <ListItemText
          primary={this.props.job.title + ": " + this.props.job.description}
        />
      </ListItem>
    );
  }
}

export default Job;
