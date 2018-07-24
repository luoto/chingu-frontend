import _ from "lodash";
import * as React from 'react';
import { Link } from "react-router-dom";
import Client from '../../Client';
import { gql } from 'apollo-boost';
import LandingBarWithIcons from "./LandingBarWithIcons";
import LandingTestimonial from "./LandingTestimonial";
import LandingProjects from './LandingProjects';
import landingItems from "../../static-api-elements/landingItems";
import Register from '../Register';
import Login from "../Login";
class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(
      localStorage.getItem("token")
      && (
        window.location.pathname.includes('login') ||
        window.location.pathname.includes('register')
      )
    ) { 
      window.location.replace('/');
    }
  }

  renderProcessBar() {
    return _.map(landingItems.process, ({
      title,
      image,
      description
    }) => {
      return ( <
        LandingBarWithIcons key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
          description
        }
        />
      );
    })
  }

  renderWhatMakesChinguUniqueBar() {
    return _.map(landingItems.whatMakesChingUnique, ({
      title,
      image,
      description
    }) => {
      return ( <
        LandingBarWithIcons key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
          description
        }
        />
      );
    })
  }

  renderProgramOverview() {
    return _.map(landingItems.programOverview, ({
      title,
      image,
      description
    }) => {
      return ( <
        LandingBarWithIcons key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
          description
        }
        />
      );
    })
  }

  renderTestimonialBar() {
    return _.map(landingItems.testimonials, ({
      username,
      image,
      testimonial
    }) => {
      return ( <
        LandingTestimonial key = {
          username
        }
        username = {
          username
        }
        image = {
          image
        }
        testimonial = {
          testimonial
        }
        />
      );
    })
  }

  renderProjectsBar() {
    return _.map(landingItems.projects, ({
      title,
      image,
      description,
      tier,
      techStack
    }) => {
      return ( <
        LandingProjects key = {
          title
        }
        title = {
          title
        }
        image = {
          image
        }
        description = {
          description
        }
        tier = {
          tier
        }
        techStack = {
          techStack
        }
        />
      );
    })
  }

  renderEntranceBtn(class_name) {
    return (
      localStorage.getItem('token')
        ? <Link to="/profile">
            <button className={class_name}>Profile</button>
          </Link>
        : <Link to = "/login" >
            <button className={class_name}>Apply</button> 
          </Link >
    );
  }

  render() {
    return ( 
    <div className = "landing" >
      {  
        window.location.pathname.includes('login')
          ? <Login />
          : (window.location.pathname.includes('register') ? <Register /> : null)
      }
      <div className = "landing-top" >
        <div className = "tagline-box" >
        <div className = "tagline" > Learn how to be a team developer<br /> & boost your portfolio. </div> 
        <div className = "tagline--subtext" > Gain real project experience with team opportunities </div> 
        { this.renderEntranceBtn('big-green-btn') } 
      </div> 
        <img className = "landing-img" src = {require('../../assets/landingImage.png')} alt = "landingImage" />
      </div> 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > What Makes Chingu Unique </div> 
        <div className = "cohorts-bar-items" > {this.renderWhatMakesChinguUniqueBar()} </div> 
      </div > 
      <div className = "landing-bar" >
        <div className = "landing-bar-title" > Chingu Process </div> 
        <div className = "landing-bar-items" > { this.renderProcessBar() } </div> 
      </div > 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > Program Overview </div> 
        <div className = "cohorts-bar-subtitle" > 8 Week Build To Learn Voyages <br /> Part-Time or Full-Time teams</div> 
        <div className = "cohorts-bar-items" > {this.renderProgramOverview()} </div> 
      </div > 
      <div className = "landing-bar" >
        <div className = "landing-bar-title" > Past Projects </div> 
        <div className = "landing-bar-items" > {this.renderProjectsBar()} </div> 
      </div > 
      <div className = "cohorts-bar" >
        <div className = "cohorts-bar-title" > What People Are Saying About Chingu </div> 
        <div className = "cohorts-bar-items" > {this.renderTestimonialBar()} </div> 
      </div > 
      <div className = "chingu-bar" >
      <div className = "chingu-bar-box" >
        <div className = "chingu-bar-title" > Ready To Try Chingu ? </div>
          { this.renderEntranceBtn('chingu-green-btn') } 
        </div>
      </div> 
    </div>
    );
  }
}

export default Landing;
