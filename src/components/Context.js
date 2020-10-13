import React from "react";
import Axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((contact) =>
          contact.id !== action.payload.id
            ? (contact = action.payload)
            : contact
        ),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        ),
      };
    default:
      return state;
  }
};

export class Provider extends React.Component {
  state = {
    contacts: [],
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  async componentDidMount() {
    const res = await Axios.get("http://jsonplaceholder.typicode.com/users");
    this.setState({
      contacts: res.data,
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
