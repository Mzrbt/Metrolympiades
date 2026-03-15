const BASE_URL = "http://localhost:3000"

export const request = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    if (!response.ok) throw new Error(`Erreur ${response.status}`)
    return response.json()
}

export const register = (email, username, password, teamName) =>
    request('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, username, password, teamName})
    })

export const login = (email, password) =>
    request('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    })

export const getMyTeam = () => 
    request('/teams/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })

export const modMyTeam = (teamName, members) =>
    request('/teams/me', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({teamName, members})
    })

export const getTeams = () => request('/teams')

export const getTeam = (teamId) => request(`/teams/${teamId}`)

export const createMatch = (team2id, activityId, startedAt, team1score, team2score) =>
    request('/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({team2id, activityId, startedAt, team1score, team2score})
    })

export const getMyMatches = () =>
    request('/matches/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })

export const getMatches = (teamId = null) => request(teamId ? `/matches?teamid=${teamId}` : '/matches')

export const getRanking = () => request('/ranking')

export const createActivity = (name) =>
    request('/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name})
    })

export const getActivities = () => request('/activities')

export const deleteMatch = (matchId) =>
    request(`matches/${matchId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(matchId)
    })