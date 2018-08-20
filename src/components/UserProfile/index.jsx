import * as React from "react";
import { client } from "../../index"
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import GetData from "../utilities/GetData"
import profileQuery from "./graphql/profileQuery"
import './UserProfile.css'
// import Store from '../../AppGlobalStore';

class UserProfile extends React.Component {
  // componentDidMount() {
  //   // let user = Store.getUserState();
  //   const { user } = JSON.parse(window.localStorage.getItem('store'));
  //   this.setState({ user: user }, () => {
  //     // let pendingApproval = user.cohorts.filter((cohort) => {
  //     //   let member = cohort.members.filter((member) => member.user.username === Store.state.user.username && member.status === 'pending_approval');
  //     //   if (member.length >= 1) {
  //     //     return cohort;
  //     //   }
  //     // });
  //     // console.log(pendingApproval);
  //   });
  // }

  render() {
    const { user } = this.props.data
    const currentTeams = user.teams.filter(team => { return team.cohort.status === 'ongoing' });
    const pastTeams = user.teams.filter(team => { return team.cohort.status === 'ended' });

    let pendingApproval = user.cohorts.filter((cohort) => {
      let member = cohort.members.filter((member) => member.user.username === user.username && member.status === 'pending_approval');
      if (member.length >= 1) {
        return cohort;
      }
    });
    return (
      <div className="user-profile-container">
        <aside className="user-profile">
          <UserSideBar user={user} />
        </aside>
        <main className="user-voyages">
          <section className="user-voyage">
            <div className="user-voyage-title">Current Voyages</div>
            {currentTeams.length > 0
              ? currentTeams.map((team, index) => {
                return (
                  <Cards.CurrentVoyageCardWithTeam
                    key={team.id + "_" + index}
                    voyageNumber={team.id}
                    startDate={team.cohort.start_date}
                    endDate={team.cohort.end_date}
                    team={team.title}
                  />
                )
              })
              : <Cards.ApplyForAVoyageCard />
            }
          </section>
          <section className="user-voyage">
            <div className="user-voyage-title">Upcoming Voyages</div>
            {
              pendingApproval.length > 0
                ? pendingApproval.map((cohort, index) => {
                  return (
                    <Cards.PendingApprovalVoyageCard
                      key={cohort.id + "_" + index}
                      voyageNumber={cohort.id}
                      startDate={cohort.start_date}
                      endDate={cohort.end_date}
                      cohort={cohort.title}
                    />
                  )
                })
                : null
            }
          </section>
          {
            pastTeams.length > 0
              ? <section className="user-voyage">
                <div className="user-voyage-title">Past Voyages</div>
                <div>
                  {pastTeams.map((team, index) => {
                    return (
                      <Cards.PreviousVoyageCardWithTeam
                        key={team.id + "_" + index}
                        voyageNumber={team.id}
                        startDate={team.cohort.start_date}
                        endDate={team.cohort.end_date}
                        team={team.title}
                      />
                    )
                  })}

                </div>
              </section>
              : null
          }
        </main>
      </div>
    )
  }
}

export default props =>
  <GetData
    component={UserProfile}
    query={profileQuery}
    loader
    {...props} />
