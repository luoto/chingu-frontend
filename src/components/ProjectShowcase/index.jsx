import * as React from "react";
import Banner from './components/Banner';
import ProjectSideBar from './components/ProjectSideBar';
import ProjectDescription from './components/ProjectDescription';
import { getProjectAndUser, getUserId } from './graphql/getProjectAndUser';
import { Query } from 'react-apollo';
import './ProjectShowcase.css';
import HeroImage from './components/HeroImage';
import Loader from "../Loader"
import Error from "../Error"

/*
This component should only be concerned with the overall layout of the page and whether it is editable.
*/
const ProjectShowcase = props => {
  const { project_id } = props.match.params
  const isEditable = (user, project) =>
    project.users.some((teamMember) => user.id === teamMember.id);

  return (
    <Query
      query={getProjectAndUser}
      variables={{
        id: project_id,
        github_repo_id: props.github_repo_id
      }}>
      {({ error, loading, data }) => {

        if (error) return <Error error={error.message} goBack="/projects" />
        if (loading) return <Loader />

        const { project } = data
        return (
          <div className="project-portal">
            <Query query={getUserId} fetchPolicy="cache-only">
              {
                // Get logged in user to determine if page should be editable.
                ({ loading, data: { user } }) => {
                  if (loading) return null

                  const editable = user && isEditable(user, project)
                  return <React.Fragment>
                    <Banner
                      editable={editable}
                      title={project.title}
                      elevator_pitch={project.elevator_pitch}
                      project_id={project_id}
                    />
                    <HeroImage
                      editable={editable}
                      title={project.title}
                      images={project.images.length > 0 ? project.images[0] : undefined}
                      project_id={project_id}
                    />
                    <div className="project-info-container">
                      <ProjectDescription
                        editable={editable}
                        description={project.description}
                        project_id={project_id}
                      />
                      <ProjectSideBar
                        project={project}
                        editable={editable}
                      />
                    </div>
                  </React.Fragment>
                }
              }
            </Query>
          </div>
        );
      }}
    </Query>
  );
}

export default ProjectShowcase;