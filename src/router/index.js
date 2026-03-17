import { createRouter, createWebHistory } from 'vue-router'
import GamesView from '../views/GamesView.vue'
import LoginView from '../views/LoginView.vue'
import NewGameView from '../views/NewGameView.vue'
import RankingView from '../views/RankingView.vue'
import RegisterView from '../views/RegisterView.vue'
import TeamView from '../views/TeamView.vue'

const routes = [
    {
        path: '/games',
        component: GamesView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/games/new',
        component: NewGameView
    },
    {
        path: '/ranking',
        component: RankingView
    },
    {
        path: '/register',
        component: RegisterView
    },
    {
        path: '/team',
        component: TeamView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router