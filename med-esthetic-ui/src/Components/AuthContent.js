import React, { Component } from "react";
import { request } from "../Pages/api/axios_helper";
import "./AuthContent.css";

export default class AuthContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    request("GET", "/messages", {})
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error("Error during API request:", error.message);
        this.setState({ data: [] });
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="row">
        <div className="col-4">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Backend response</h5>
              <p className="card-text">Content:</p>
              <ul>
                {data.map((line, index) => <li key={index}>{line}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
