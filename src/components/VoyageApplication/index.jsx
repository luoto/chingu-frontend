import * as React from 'react';
import newUserApplicationData from './newUserApplication.data.js';
import './VoyageApplication.css';
import '../FormCreator/FormCreator.css';
import voyageApplicationData from './VoyageApplication.data.js';
import { renderQAs } from '../FormCreator/answerCreators.js';
// import ErrorPage from '../404/404';
import Loader from '../Loader/Loader';
// import SubmitVoyageApplication from './SubmitVoyageApplication';
import { ApolloConsumer } from 'react-apollo';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const newUserPage1 = newUserApplicationData.filter((data) => { return data.page === 1 });
const newUserPage2 = newUserApplicationData.filter((data) => { return data.page === 2 });
const newUserPage3 = newUserApplicationData.filter((data) => { return data.page === 3 });
const voyageApplicationPage1 = voyageApplicationData.filter((data) => { return data.page === 1 });
const voyageApplicationPage2 = voyageApplicationData.filter((data) => { return data.page === 2 });

const newUserApplication = [newUserPage1, newUserPage2, newUserPage3, voyageApplicationPage1, voyageApplicationPage2];
const voyageApplication = [voyageApplicationPage1, voyageApplicationPage2]

const submitApplication = gql`
mutation submitVoyageForm($voyage_form: JSON!, $user_form: JSON){
  submitVoyageForm(input:{voyage_form:$voyage_form, user_form:$user_form})
}
`
class VoyageApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationTitle: 'Voyage Application',
      application: voyageApplication,
      gql: '',
      progressBar: { width: '1%' },
      currentPage: 0,
      1: new Set(), // cohort role
      4: '', // coding journey
      5: new Set(), // tech stacks
      6: '', // committed to goals
      7: '', // project showcase
      8: '', // gender (Not supported yet)
      9: '', // background
      10: '', // coding history
      11: '', //interests
      12: '', // dinner guest
      13: '', // greatest accomplishment
      100: '', // hours per week
      101: new Set(), // learning stacks
      102: '', // audio meeting
      103: '', // PM?
      104: '', // skill tier
      105: '', // free time
    }
  }

  componentDidMount() {
    // if this user has not been part of a voyage before
    // or was rejected before and not been part of a voyage
    console.log(this.props.userCohorts);
    if (this.props.userCohorts.user && this.props.userCohorts.user.cohorts.length === 0) {
      this.setState({
        application: newUserApplication,
        gql: 'SUBMIT_NEW_USER_VOYAGE_APPLICATION',
        applicationTitle: 'New User Application'
      });
    }
    let progress = (1 / this.state.application.length) * 100 + '%';
    this.setState({ progressBar: { width: progress } })
  }

  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }

  onFormChange = (e) => {
    const { name, value, type } = e.currentTarget;
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  }

  goBackAPage = (e) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage - 1 }, () => {
      let progress = this.state.currentPage === 0
        ? (1 / this.state.application.length) * 100 + '%'
        : ((this.state.currentPage - 1) / this.state.application.length) * 100 + '%'
      this.setState({ progressBar: { width: progress } })
    });
  }

  goToNextPage = (e) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      let progress = this.state.currentPage === this.state.application.length - 1
        ? '100%'
        : ((this.state.currentPage + 1) / this.state.application.length) * 100 + '%'
      this.setState({ progressBar: { width: progress } })
    });
  }

  onSubmit = (client) => {
    const user_form = {
      cohort_role: this.state[1],
      location_on_coding_journey: this.state[4],
      familiar_tech_stacks: this.state[5],
      commitment_to_goals: this.state[6],
      showcase_project_link: this.state[7],
      // gender (Not supported)
      personal_background: this.state[9],
      coding_history: this.state[10],
      personal_interest: this.state[11],
      best_dinner_guest: this.state[12],
      greatest_accomplishment: this.state[13],
    }
    const voyage_form = {
      hours_per_week: this.state[100],
      preferred_tech_stack: this.state[101],
      voice_chat_preference: this.state[102],
      pm_preference: this.state[103],
      tier_level: this.state[104],
      time_of_day_available: this.state[105],
    }

    client.mutate({
      mutation: submitApplication,
      // TODO: check/set state flag(newUserFormDone) if user did not fill out  
      variables: this.state.newUserForm ? {voyage_form} : {voyage_form, user_form}
    }).then(
      () => {/*Do something*/}
    ).catch(
      err => {console.error(err)}
    )
  }

  render() {
    if (this.props.userCohorts && this.props.userCohorts.loading) {
      return <Loader />
    }
    // if (this.props.userCohorts && this.props.userCohorts.error) {
    //     return <ErrorPage />
    // }
    return (
      <div className="voyage-application-container">
        <div className="voyage-application-title">Voyage Application</div>
        <div className="voyage-application">
          <div className="voyage-application-subtitle">
            {
              this.state.currentPage > 2 ? 'Voyage Application' : this.state.applicationTitle
            }
          </div>
          {this.state.application.length > 2 
            ? <div className="new-user-application-notice">
                <div className="new-user-application-notice-title">A Notice to Users</div>
                <div className="new-user-application-notice-description">
                Does the application seem a little long to you? <br /> Don't worry! We promise all of your 
                answers are critical to your placement in the voyage. Also, the New Users Application 
                only pops up in your initial Voyage application.
                </div>
              </div>
            : null
          }
          <div className="voyage-application-progress">
            <div className="voyage-application-progress-bar" style={this.state.progressBar} />
          </div>
          {renderQAs(this.state.application[this.state.currentPage], this.onFormChange, this.state)}
          <hr className="hline" />
          <div className="voyage-application-btn-container">
            {
              this.state.currentPage === 0
                ? null
                : <button className="voyage-appliation-btn--grey" onClick={e => this.goBackAPage(e)}>Previous</button>
            }
            {
              this.state.currentPage === this.state.application.length - 1
                ? null // <SubmitVoyageApplication state={this.state} /> // mutation component button
                : <button className="voyage-appliation-btn--green" onClick={e => this.goToNextPage(e)}>Next</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const GET_USER_DATA = gql`{
    query GetUserData {
        user {
            cohorts {
                id
            }
        }
    }
}`;

export default graphql(GET_USER_DATA, { name: 'userCohorts' })(VoyageApplication)
