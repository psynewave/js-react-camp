var React = require('react');

var InputForm = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();
    this.props.addContact({nameInput: this.refs.name2addContact.value, emailInput: this.refs.name2email.value});
    this.refs.userForm.reset();
  },
  render: function() {
    var formColor = this.props.formColor;
    return(
      <form className={formColor} onSubmit={this.handleSubmit} ref="userForm">
        <input placeholder="Name" ref="name2addContact" type="text" required/>
        <input placeholder="Email" ref="name2email" type="email" required/>
        <button className="waves-effect waves-light btn-large">Add Contact</button>
      </form>
    )
  }
});

module.exports = InputForm;
