import * as React from "react";
import * as Cards from "../VoyageCard/VoyageCard";
import UserSideBar from "./UserSideBar";
import './UserProfile.css'
import Store from '../../AppGlobalStore';

class UserProfile extends React.Component {
  render() {
    const user = Store.getUserState();

    const currentTeams = user.teams.filter(team => { return team.cohort.status === 'ongoing'});
    const pastTeams = user.teams.filter(team => { return team.cohort.status === 'ended' });
    
    return (
      <div className="user-profile-container">
        <aside className="user-profile">
          <UserSideBar />
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
                    startDate={team.startDate}
                    endDate={team.endDate} 
                    team={team}
                  />
                )
              })
              : <Cards.ApplyForAVoyageCard />
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
                    startDate={team.startDate}
                    endDate={team.endDate} 
                    team={team}
                  />
                )
              })}
            
            </div>
          </section>
          : null
          }
        </main>
      </div>
    );
  }
}

export default UserProfile;
