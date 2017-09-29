import React, {Component} from 'react';
import './Header.css';
import {Session} from 'meteor/session';
import {withRouter, Redirect,} from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
  }
  handleLogout() {
    Session.clear();
    <Redirect to = "/login" />
}

render() {
  return (
    <header style={{backgroundColor:'#ffc300'}} className="header-banner-top">
    <div style={{backgroundColor:'#ffc300'}} >
    <img style={{padding:'5px',borderRadius:'1em',height:'60px',width:'200px'}} src='/sjflex.jpg' alt="flex"/>
    </div>
    <div style={{flex:5,backgroundColor:'#ffc300'}} className="main-navigation">
        <nav className="horizontal-nav primary-wrapper" role='navigation'>
          <ul style={{marginRight:'20px'}}>
            <li className="folder">
              <label htmlFor="folder-toggle-1" className="folder-toggle-label">
                <a className="glyphicon glyphicon-cog"> Settings</a>
              </label>
              <ul>
              <li>
              <a style={styles.dropDown} href="#">Report</a>
              </li>
              <li>
              <a style={styles.dropDown} href="#">Add Product</a>
              </li>
              <li>
                { Session.get('shop')
                ? <a style={styles.dropDown} id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                : Session.get('admin')
                  ? <a style={styles.dropDown} id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                  : <a style={styles.dropDown} id="login" href="/login"></a>

              }
              </li>

              </ul>
            </li>
            <li>
              </li>
          </ul>
        </nav>
        <label htmlFor="mobile-menu-toggle" className="mobile-menu-label hidden"></label>
      </div>
      </header>
  );
}
}
export default withRouter(Header)

const styles={
  dropDown:{fontSize:'15'}
}
