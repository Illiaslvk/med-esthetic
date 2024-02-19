import React, { Component } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { request } from "../Pages/api/axios_helper"

import "./AuthContent.css"

export default class AuthContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    request("GET", "/messages", {})
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.setAuthToken(null)
        } else {
          console.error("Error during API request:", error.message)
          this.setState({ data: [] })
        }
      })
  }

  setAuthToken = (token) => {
    Cookies.set("auth_token", token)
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : null
    this.loadData()
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Backend response</h5>
              <p className="card-text">Content:</p>
              <ul>
                {this.state.data &&
                  this.state.data.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
