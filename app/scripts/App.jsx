Parse.initialize("ahD3e6Psxd8aLPLNwv6jb30cPDOZlqKRVgbsNpsi", "F73cixO5RJBs11FLcBi0EyQaNkaOJPMUZc5VX5fC");

require('../styles/main.css');

var React = require('react');
var ReactDOM = require('react-dom');
var InputForm = require('./components/InputForm.jsx');
var ListOfContacts = require('./components/ListOfContacts.jsx');
var ChangeThemeButton = require('./components/ChangeThemeButton.jsx');
var classNames = require( 'classnames' );

var App = React.createClass({
  getInitialState: function () {
    return {
      users: [],
      theme: classNames('light'),
      formColor: classNames('card-panel', 'white', 'lighten-5'),
      buttonColor: classNames('btn', 'waves-effect', 'waves-light', 'blue')
    };
  },
  getRemoteUsers: function () {
    var ContactObject = Parse.Object.extend("ContactObject");
    var query = new Parse.Query(ContactObject);
    var component = this;

    query.find({
      success: function(results) {
          component.setState({
            users: results.map(function(o){
              var user = o.attributes;
                  user.id = o.id;
              return user;
            })
          });
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },
  componentWillMount: function () {
    this.getRemoteUsers();
    if( localStorage.getItem('theme') === 'dark' ){
      this.setState({
        theme: classNames('dark'),
        formColor: classNames('card-panel', 'grey', 'lighten-5'),
        buttonColor: classNames('btn', 'waves-effect', 'waves-light', 'black')
      });
    }
  },
  addContact: function (user) {

    var ContactObject = Parse.Object.extend("ContactObject");
    var contactObject = new ContactObject();
    var component = this;

    contactObject.set("nameInput", user.nameInput);
    contactObject.set("emailInput", user.emailInput);

    contactObject.save(null, {
      success: function(contactObject) {
        // Execute any logic that should take place after the object is saved.
        // console.log('New object created with objectId: ' + contactObject.id);
        user.id = contactObject.id;
        component.setState({
          users: component.state.users.concat(user)
        });
      },
      error: function(contactObject, error) {
        console.error('Failed to create new object, with error code: ' + error.message);
      }
    });


  },
  removeUser: function (user, condition) {

    var ContactObject = Parse.Object.extend("ContactObject");
    var query = new Parse.Query(ContactObject);
    var component = this;

    if ( condition === 'multi-delete' ){
       var length = user.length - 1;
       user.map(function(u,i){
         query.get(u.id, {
           success: function(userRecord) {
             // The object was retrieved successfully.
             userRecord.destroy({
                success: function(status) {
                  if( length === i ){
                    component.getRemoteUsers();
                  }
                },
                error: function(personName, error) {
                  console.error(error);
                }
              });
           },
           error: function(object, error) {
             // The object was not retrieved successfully.
             // error is a Parse.Error with an error code and description.
           }
         });
       });

    } else {
      query.get(user.id, {
        success: function(userRecord) {
          // The object was retrieved successfully.
          userRecord.destroy({
             success: function(status) {
               component.getRemoteUsers();
             },
             error: function(personName, error) {
               console.error(error);
             }
           });
        },
        error: function(object, error) {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and description.
        }
      });
    }
  },
  changeTheme: function () {
    if( localStorage.getItem('theme') === 'dark' ){
      $('body').removeClass('dark').addClass('light');
      localStorage.removeItem('theme');
      this.setState({
        theme: classNames('light'),
        formColor: classNames('card-panel', 'white', 'lighten-5'),
        buttonColor: classNames('btn', 'waves-effect', 'waves-purple', 'blue')
      });
    } else {
      $('body').addClass('dark').removeClass('light');
      localStorage.setItem('theme', 'dark');
      this.setState({
        theme: classNames('dark'),
        formColor: classNames('card-panel', 'grey', 'lighten-5'),
        buttonColor: classNames('btn', 'waves-effect', 'waves-red', 'black')
      });
    }
  },
  render: function () {
    return (
      <div id="holder" className={this.state.theme}>
        <div className="container">
          <h3>React Contact Manager</h3>
          <InputForm formColor={this.state.formColor} addContact={this.addContact} />
          <ListOfContacts selectedUsers={this.state.selectedUsers} users={this.state.users} removeUser={this.removeUser} />
          <ChangeThemeButton buttonColor={this.state.buttonColor} changeTheme={this.changeTheme}/>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
