import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing";
import Staff from "./components/Pages/Staff";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import FAQ from "./components/Pages/FAQ";
import companyFAQ from "./static-api-elements/companyFAQ";
import programFAQ from "./static-api-elements/programFAQ";
import CurrentPrograms from "./components/Pages/CurrentPrograms";
import UserProfile from './components/UserProfile';
import Missing404Page from './components/404/404';
import Header from './components/Header/Header';
import WeeklyCheckin from './components/WeeklyCheckin';
import VoyagePortal from './components/VoyagePortal';
import VoyageApplication from './components/VoyageApplication';
import Register from './components/Register';
import Login from './components/Login';
import FeedPortal from "./components/FeedPortal"
import Private from "./components/utilities/PrivateRoute"
import AllProjects from './components/AllProjects';
import TeamStandup from "./components/TeamStandup";
import ProjectShowcase from "./components/ProjectShowcase"
import rt from "./routes.cfg"

export default () => (
  <div className="App">
    <Header />
    <Switch>
      <Route 
        exact 
        path={rt.landing.path} 
        component={rt.landing.component} />
      <Route
        exact 
        path={rt.login.path}
        render={
          ({ location: { search } }) => 
            rt.login.component({ queryString: search })
        }/>
      <Private
        exact 
        path={rt.register.path}
        render={
          () => rt.register({version: null}) // set custom 'chingu_application' version here
        }/>
      <Private 
        exact 
        path={rt.userprofile.path} 
        // TODO: refactor - editable should not be here
        render={() => 
          rt.userprofile.component({ editable: true })} />
      <Route
        exact 
        path={rt.profile.path}
        render={
          ({ match: { params: { username } } }) => (
            rt.profile.component({username, editable: false})
          )}/>
      <Private 
        exact 
        path={rt.voyages.path} 
        component={rt.voyages.component} />
      <Private
        exact 
        path="/voyage/application/:voyage_id"
        render={
          ({ match: { params: { voyage_id } } }) => (
            rt.application.component({
              voyage_id,
              voyageVersion: null, // set custom 'voyage_application' version here
              newUserVersion: null,
            })
          )}/>
      <Private 
        exact 
        path={rt.newsfeed.path}
        component={rt.newsfeed.component} />
      <Private 
        exact 
        path={rt.checkin.path} 
        component={rt.checkin.component} />
      <Route 
        exact 
        path={rt.projects.path} 
        component={rt.projects.component} />
      <Private
        exact 
        path={rt.standup.path}
        render={
        ({ match: { params: { team_id } } }) => (
          rt.standup.component({
            team_id,
            standupVersion: null
          })
        )} />
      <Route 
        exact 
        path={rt.programs.path} 
        component={rt.programs.component} />
      <Route 
        exact 
        path={rt.staff.path} 
        component={rt.staff.component} />
      <Route 
        exact 
        path={rt.privacy.path} 
        component={rt.privacy.component} />
      <Route 
        exact 
        path={rt.companyfaq.path} 
        render={() => rt.companyfaq({
          headerText: "Company FAQs",
          data: companyFAQ
        })} />
      <Route 
        exact 
        path="/programfaq" 
        render={() => rt.programfaq({
          headerText: "Program FAQa",
          data: programFAQ
        })} />
      <Route 
        exact 
        path={rt.showcase.path}
        render={
        ({ match: { params: { projectId } } }) => 
        rt.showcase.component({ projectId })} />
      <Route 
        exact 
        path={rt.notfound.path}
        component={rt.notfound.component} />
    </Switch>
    <Footer />
  </div>
)

