/**
 * Teams store.
 * 
 * Pinia store holding the list of teams. State is a single `teams` array,
 * replaced wholesale via `setTeams` (the Teams page emits the full list on every
 * change rather than mutating individual entries). `persist: true` saves the
 * state to storage - via pinia-plugin-persistedstate - so teams survive reloads. 
 */ 

import { defineStore } from 'pinia'
import type { Team } from '@/lib/teams'

export const useTeamsStore = defineStore('teams', {
    state: () => ({
        teams: [] as Team[],
    }),
    actions: {
        setTeams(teams: Team[]) {
            this.teams = teams
        },
    },
    persist: true,
})