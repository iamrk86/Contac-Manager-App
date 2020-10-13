import React from "react";
import Contact from "./Contact";
import { Consumer } from "../Context";

class Contacts extends React.Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h6 className="text-light text-center mt-3 bg-dark p-2">
                ALL CONTACTS
              </h6>
              {contacts.map((contact) => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
