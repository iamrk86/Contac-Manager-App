import React from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Consumer } from "../Context";

import TextInputGroup from "../formElements/TextInputGroup";
class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

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

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
      errors: {},
    };

    const res = await Axios.post(
      "http://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({
      type: "ADD_CONTACT",
      payload: newContact,
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
    });
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
                <h4 className="text-center mt-1">ADD NEW CONTACT</h4>
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
                    Add Contact
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

export default AddContact;
