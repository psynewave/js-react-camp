var React = require('react');

var ViewComponent = React.createClass({
  handleChange: function() {
    this.props.onSelected(this.props.user);
  },
  render: function(){
    var contactId = 'contact-' + this.props.index;
    return(
      <div className="card hoverable">
          <div className="card-content">
            <p>
              <input type="checkbox" id={contactId} onChange={this.handleChange} />
              <label htmlFor={contactId}>{this.props.user.nameInput}</label>
            </p>
          </div>

          <div className="card-action">
            <a href={"mailto:" + this.props.user.emailInput}>
              <i className="material-icons">email</i>
            </a>
            <i className="userActionBtn material-icons" onClick={this.props.removeUser}>remove_circle_outline</i>
            <i className="userActionBtn material-icons" onClick={this.props.switchState}>mode_edit</i>
          </div>
      </div>
    )
  }
});

module.exports = ViewComponent;
