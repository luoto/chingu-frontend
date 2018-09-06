import * as React from 'react';
import allProjectsQuery from './graphql/allProjectsQuery';
import Request from "../utilities/Request";
import Project from './components/Project';
import './AllProjects.css';

const AllProjects = props => {
  const renderProjects = projects =>
    projects.map((project, idx) => <Project project={project} key={idx} />)

  const { projects } = props.data;
  return (
    <div className="all-projects-container">
      <div className="all-projects-title">All Projects</div>
      <div className="all-projects">{projects && renderProjects(projects)}</div>
    </div>
  )
}

export default props => (
  <Request
    {...props}
    query={allProjectsQuery}
    component={AllProjects}
    globalLoader
  />)
