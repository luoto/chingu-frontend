import Landing from "./components/Landing";
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Newsfeed from "./components/FeedPortal"
import AllProjects from './components/AllProjects';
import ProjectShowcase from "./components/ProjectShowcase"
import VoyagePortal from './components/VoyagePortal';
import VoyageApplication from './components/VoyageApplication';
import WeeklyCheckin from './components/WeeklyCheckin';
import TeamStandup from "./components/TeamStandup";
import Staff from "./components/Pages/Staff";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import FAQ from "./components/Pages/FAQ";
import CurrentPrograms from "./components/Pages/CurrentPrograms";
import Missing404Page from "./components/404/404";

/**
 * TODO:
 * Review team standups and chckins path naming pattern
 * Rename team vs chingu.io staff
 * Rename profile vs userprofile
 * CurrentPrograms??
 */

const routes = {
  landing: {
    path: "/",
    component: Landing,
  },
  login: {
    path: "/login",
    component: Login,
  },
  register: {
    path: "/register",
    component: Register,
  },
  userprofile: {
    path: "/profile",
    component: UserProfile,
  },
  profile: {
    path: "/profile/:username",
    component: UserProfile,
  },
  newsfeed: {
    path: "/newsfeed",
    component: Newsfeed,
  },
  projects: {
    path: "/projects",
    component: AllProjects,
  },
  showcase: {
    path: "/project/:project_id",
    component: ProjectShowcase,
  },
  voyages: {
    path: "/voyage",
    component: VoyagePortal,
  },
  application: {
    path: "/voyage/application/:voyage_id",
    component: VoyageApplication,
  },
  checkin: {
    path: "/team/checkin/:id",
    component: WeeklyCheckin,
  },
  standup: {
    path: "/team/:team_id/standup",
    component: TeamStandup,
  },
  staff: {
    path: "/team",
    component: Staff
  },
  privacy: {
    path: "/privacy",
    component: PrivacyPolicy,
  },
  companyfaq: {
    path: "/companyfaq",
    component: FAQ,
  },
  programfaq: {
    path: "/programfaq",
    component: FAQ,
  },
  programs: {
    path: "/current",
    component: CurrentPrograms,
  },
  notfound: {
    path: "*",
    component: Missing404Page
  }
}

export default routes