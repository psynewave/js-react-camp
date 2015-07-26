var React = require('react');
var OneUserContact = require('./OneUserContact.jsx');

var ListOfContacts = React.createClass({
  getInitialState: function () {
    return ({
      selectedUsers: []
    });
  },
  removeSelected: function (event) {
    event.preventDefault();
    this.props.removeUser(this.state.selectedUsers, 'multi-delete');
  },
  onSelected: function (user) {
    var userIndex = this.state.selectedUsers.indexOf(user);
    var selectedUsers = this.state.selectedUsers;

    if( userIndex >= 0 ){
      this.state.selectedUsers = selectedUsers.filter(function(obj) {
          return (obj.id !== user.id);
      });
    } else {
      this.state.selectedUsers.push(user);
    }
  },
  render: function () {
    var removeUser = this.props.removeUser;
    var onSelected = this.onSelected;

    var userList = this.props.users.map(function (user, i){
      return <OneUserContact user={user} key={i} index={i} onSelected={onSelected} removeUser={removeUser} />
    });
    return (
      <div>
        <div className="row">
          <div className="col s11">
            <p>&nbsp;</p>
          </div>
          <div className="col s1">
              <a className="btn-floating btn-mini waves-effect waves-light red" onClick={this.removeSelected}><i className="material-icons">remove</i></a>
          </div>
        </div>
        <ul className="list-unstyled">
          {userList}
        </ul>
      </div>
    )
  }
});

module.exports = ListOfContacts;
