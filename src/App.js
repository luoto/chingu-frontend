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
import routes from "./routes.cfg"

export default () => (
  <div className="App">
    <Header />
    <Switch>
      <Route 
        exact 
        path={routes.landing.path} 
        component={routes.landing.component} />
      <Route
        exact 
        path={routes.login.path}
        component={routes.login.component} />
      <Private
        exact 
        path={routes.register.path}
        render={props => 
          routes.register({version: null, ...props}) // set custom 'chingu_application' version here
        }/>
      <Private 
        exact 
        path={routes.userprofile.path} 
        component={routes.userprofile.component} />
      <Route
        exact 
        path={routes.profile.path}
        component={routes.profile.component} />
      <Private 
        exact 
        path={routes.voyages.path} 
        component={routes.voyages.component} />
      <Private
        exact 
        path={routes.application.path}
        render={props => (
          routes.application.component({
            voyageVersion: null, // set custom 'voyage_application' version here
            newUserVersion: null,
            ...props
          })
        )}/>
      <Private 
        exact 
        path={routes.newsfeed.path}
        component={routes.newsfeed.component} />
      <Private 
        exact 
        path={routes.checkin.path} 
        component={routes.checkin.component} />
      <Route 
        exact 
        path={routes.projects.path} 
        component={routes.projects.component} />
      <Private
        exact 
        path={routes.standup.path}
        render={props => (
          routes.standup.component({
            standupVersion: null,
            ...props
          })
        )} />
      <Route 
        exact 
        path={routes.programs.path} 
        component={routes.programs.component} />
      <Route 
        exact 
        path={routes.staff.path} 
        component={routes.staff.component} />
      <Route 
        exact 
        path={routes.privacy.path} 
        component={routes.privacy.component} />
      <Route 
        exact 
        path={routes.companyfaq.path} 
        render={() => routes.companyfaq({
          headerText: "Company FAQs",
          data: companyFAQ
        })} />
      <Route 
        exact 
        path="/programfaq" 
        render={() => routes.programfaq({
          headerText: "Program FAQa",
          data: programFAQ
        })} />
      <Route 
        exact 
        path={routes.showcase.path}
        component={routes.showcase.component} />
      <Route 
        exact 
        path={routes.notfound.path}
        component={routes.notfound.component} />
    </Switch>
    <Footer />
  </div>
)

