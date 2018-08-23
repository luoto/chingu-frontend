import React, { Fragment } from "react"
import sidebarQuery from '../graphql/sidebarQuery';
import Request from "../../utilities/Request"

const SidebarBtn = ({ lbl, active, team }) => (
  <Fragment>
    <hr className="hl" />
    {team ? <img className="sidebar-nav__btn-icon" src={require('../../../assets/team-icon.png')} alt="team-icon" /> : null}
    <div className={`sidebar-nav__btn ${active ? "active" : null}`}>{lbl}</div>
  </Fragment>
)

const TeamLinks = teams => {
  if (!teams.length) {
    teams = [{
      "id": "2",
      "title": "vampires Team B",
      "cohort": {
        "id": "2",
        "title": "Voyage B",
        "start_date": Date.now() - 400,
        "end_date": Date.now() - 200
      }
    },
    {
      "id": "3",
      "title": "vampires Team C",
      "cohort": {
        "id": "3",
        "title": "Voyage C",
        "start_date": Date.now() - 100,
        "end_date": Date.now() + 100
      }
    }, {
      "id": "1",
      "title": "vampires Team A",
      "cohort": {
        "id": "1",
        "title": "Voyage A",
        "start_date": Date.now() - 700,
        "end_date": Date.now() - 500,
      }
    },]
  }

  const filterSort = teams => {
    // Expected C A B
    // TODO filtersort in one pass over array
    const now = Date.now() // TODO: Find end of day ???
    const active = team => team.cohort.end_date >= now
    const inactive = team => team.cohort.end_date < now
    const sort = team => {
      team.sort((a, b) => a.cohort.end_date - b.cohort.end_date)
      return team
    }
    return [...sort(teams.filter(active)), ...sort(teams.filter(inactive))]
  }

  let renderedTeamLinks = filterSort(teams).map((team, idx) => {
    return <SidebarBtn team key={idx} lbl={team.cohort.title + "/" + team.title} />
  })
  return (
    <Fragment>{renderedTeamLinks}</Fragment>
  )
}
const SideBar = ({ data: { user } }) => {
  return (
    <aside className="sidebar-container">
      <div className="portal-panel__sidebar">
        <div className="sidebar-userinfo__container">
          <img
            className="sidebar-userinfo__avatar"
            src={user.avatar}
            alt="User Avatar" />
          <div className="sidebar-userinfo__username">{user.username}</div>
        </div>

        <SidebarBtn lbl="All News" />

        <hr className="hl" />

        <label className="sidebar-nav__label">Your Teams</label>
        <TeamLinks />

      </div>
    </aside>
  )
}

export default props =>
  <Request
    component={SideBar}
    query={sidebarQuery}
    globalLoader
    {...props} />
