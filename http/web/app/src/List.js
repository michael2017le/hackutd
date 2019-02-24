import React, { Component } from "react";
import { getList, addToList, updateItem, deleteItem } from "./ListFunctions";
import axios from "axios";

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      desc: "",
      items: [],
      editDisable: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:5000/api/jobs").then(data => {
      data = data["data"];
      this.setState({
        _id: data["_id"],
        name: data["name"],
        desc: data["desc"]
      });
      console.log(data);
      console.log(this.state);
    });
  }

  onChange = event => {
    this.setState({
      name: event.target.value,
      editDisabled: "disabled"
    });
  };

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          name: "",
          desc: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });
  };

  onSubmit = e => {
    e.preventDefault();
    addToList(this.state.name).then(() => {
      this.getAll();
    });
    this.setState({ editDisable: false });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.name, this.state.desc, this.state.id).then(() => {
      this.getAll();
    });
    this.setState({ editDisable: false });
  };

  onEdit = (item, itemid, itemdesc, e) => {
    e.preventDefault();
    this.state({
      id: itemid,
      name: item,
      desc: itemdesc
    });
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val).then(() => {
      this.getAll();
    });
  };
  render() {
    return (
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="input1">Job Name</label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="input1"
                  value={this.state.name || ""}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="input2"
                  value={this.state.desc || ""}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.name}</td>
                <td className="text-right">
                  <button
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.name, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
