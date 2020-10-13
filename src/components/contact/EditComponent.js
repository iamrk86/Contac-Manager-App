import React from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Consumer } from "../Context";
import TextInputGroup from "../formElements/TextInputGroup";
import Contact from "./Contact";

class EditContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await Axios.get(
      `http://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onSubmitHandler = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    //check errors
    if (name === "") {
      this.setState({
        errors: {
          name: "Name is Requires!",
        },
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: { email: "Email Is Requires !" },
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: {
          phone: "Phone Number is Require",
        },
      });
      return;
    }

    const updContact = {
      name,
      email,
      phone,
    };
    const { id } = this.props.match.params;
    const res = await Axios.put(
      `http://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({
      type: "UPDATE_CONTACT",
      payload: res.data,
    });

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
    });

    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card my-3">
              <div className="card-body">
                <h4 className="text-center mt-1">Edit CONTACT</h4>
                <form onSubmit={this.onSubmitHandler.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name ..."
                    onChange={this.onChange}
                    value={name}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email ..."
                    onChange={this.onChange}
                    value={email}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone ..."
                    onChange={this.onChange}
                    value={phone}
                    error={errors.phone}
                  />
                  <button className="btn btn-light btn-block">
                    Update Contact
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
