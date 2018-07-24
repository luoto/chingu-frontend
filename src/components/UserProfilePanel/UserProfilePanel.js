import React from "react";
import { Query } from 'react-apollo';
import CURRENT_USER_QUERY from '../../queries/currentUserQuery';
/**
 * TODO:
 * 2. factor out html components
 * 3. convert class to function
 **/

class UserProfile extends React.Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          
          return (
            <div className="user-profile-container-personal">
              <header className="user">
                <div className="photobox">
                  <img
                    className="user-photo"
                    src={data.user.avatar}
                    alt="userprofile"
                  />
                  <p>{data.user.username}</p>
                  <p>{data.user.country}</p>
                </div>
                <ul className="positions">
                  <li className="position">
                    <span>
                      <i className="fas fa-check" />
                    </span>Designer
                  </li>
                  <li className="position">
                    <span>
                      <i className="fas fa-check" />
                    </span>Programmer
                  </li>
                </ul>
              </header>
              <div className="user-background">
                <h1>background</h1>
                <p>{data.user.background}</p>
              </div>
              <div className="user-coding-history">
                <h1>coding history</h1>
                <p>{data.user.coding_history}</p>
              </div>
              <div className="user-interests">
                <h1>interests</h1>
                <p>{data.user.interests}</p>
              </div>
              <div className="user-links">
                <h1>links</h1>
                <ul>
                  <li>
                    <a href="">
                      <i className="fab fa-facebook fa-3x" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fab fa-google fa-3x" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="user-skills">
                <h1>skills</h1>
                <ul>
                  <li>React</li>
                  <li>JavaScript</li>
                  <li>Adobe XD</li>
                  <li>HTML/CSS</li>
                </ul>
              </div>
            </div>
          )
        }}
      </Query>
    );
  }
}

export default UserProfile;
