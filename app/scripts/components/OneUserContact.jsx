var React = require('react');
var EditComponent = require('./EditComponent.jsx');
var ViewComponent = require('./ViewComponent.jsx');

var OneUserContact = React.createClass({
  getInitialState: function (){
    return {
      viewMode: 'read-only'
    }
  },
  removeUser: function () {
    this.props.removeUser(this.props.user);
  },
  switchState: function () {
    if(this.state.viewMode === 'read-only'){
      this.setState({
        viewMode: 'edit'
      });
    } else {
      this.setState({
        viewMode: 'read-only'
      });
    }
  },
  updateUser: function () {
    this.props.updateUser(this.props.index);
  },
  handleUpdate: function (user) {
    user.index = this.props.index;
    this.props.handleUpdate(user);
  },

  render: function() {
    var onSelected = this.props.onSelected;
    if( this.state.viewMode == 'read-only'){
      return(
        <li>
            <ViewComponent index={this.props.index} onSelected={onSelected} user={this.props.user} switchState={this.switchState} removeUser={this.removeUser} />
        </li>
      );
    } else {
      return(
        <li>
            <EditComponent user={this.props.user} switchState={this.switchState} handleUpdate={this.handleUpdate} />
        </li>
      );
    }
  }
});

module.exports = OneUserContact;
