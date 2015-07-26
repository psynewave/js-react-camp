var React = require('react');

var EditComponent = React.createClass({
  handleUpdate: function(event){
    event.preventDefault();

    var ContactObject = Parse.Object.extend("ContactObject");
    var query = new Parse.Query(ContactObject);
    var component = this;
    var user = component.props.user;

    query.get(user.id, {
      success: function(userRecord) {
        // The object was retrieved successfully.
        userRecord.set("nameInput", component.props.user.nameInput);
        userRecord.set("emailInput", component.props.user.nameInput);
        userRecord.save();
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
      }
    });

    this.props.user.nameInput = this.refs.name2input.value;
    this.props.user.emailInput = this.refs.email2input.value;
    this.props.switchState();
  },
  render: function(){
    return(
      <form className="card-panel hoverable deep-orange lighten-5" onSubmit={this.handleUpdate}>
        <div className="card-content">
          <input placeholder="Name" ref="name2input" defaultValue={this.props.user.nameInput} type="text" required/>
          <input placeholder="Email" ref="email2input" defaultValue={this.props.user.emailInput} type="email" required/>
        </div>
        <div className="card-action">
          <button className="btn waves-effect waves-light red darken-3" type="submit" name="action" onClick={this.handleUpdate}>
            Update
          </button>
        </div>

      </form>
    )
  }
});

module.exports = EditComponent;
