var React = require('react');

var ChangeThemeButton = React.createClass({
  changeTheme: function () {
    this.props.changeTheme();
  },
  render: function () {
    return (
      <button id="ChangeThemeButton" className={this.props.buttonColor} onClick={this.changeTheme}>Change Theme</button>
    )
  }
});

module.exports = ChangeThemeButton;
