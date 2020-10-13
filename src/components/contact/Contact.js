import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Consumer } from "../Context";

class Contact extends React.Component {
  state = {
    onShowInfo: false,
  };
  onDeleteClick = async (id, dispatch) => {
    await Axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };
  render(props) {
    const { id, name, email, phone } = this.props.contact;
    const { onShowInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mt-3">
              <h4 className="card-title">
                {name}{" "}
                <i
                  className="fas fa-sort-down"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ onShowInfo: !this.state.onShowInfo });
                  }}
                ></i>{" "}
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  style={{ color: "red", float: "right", cursor: "pointer" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>
                <Link to={`contact/edit/${id}`}>
                  <i
                    class="fas fa-pencil-alt"
                    aria-hidden="true"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem",
                    }}
                  ></i>
                </Link>
              </h4>
              {onShowInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email : {email}</li>
                  <li className="list-group-item">Phone : {phone} </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
