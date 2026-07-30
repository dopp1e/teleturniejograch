<!--
    TeamPanel component.

    Wires together the pieces: pulls the team list from the Pinia store and hands
    it to GenericList for display, using TeamForm as the create/edit dialog. The
    create/edit callbacks just open the form and return its Promise, so GenericList
    receives the resulting Team (or null on cancel) and emits `change`, which is
    persisted back to the store via setTeams. Each row renders the team name plus a
    comma-separated member list (or an italic placeholder when empty).
-->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTeamsStore } from '@/stores/teams'
import GenericList from '@/components/GenericList.vue'
import TeamForm from '@/components/TeamForm.vue'

const store = useTeamsStore()
const { teams } = storeToRefs(store)

const form = ref(null)
const createTeam = () => form.value.open()
const editTeam = (p) => form.value.open(p)
</script>

<template>
    <div class="flex justify-center pt-16">
        <GenericList
            title="Team list"
            :initial-items="teams"
            :create-item="createTeam"
            :edit-item="editTeam"
            @change="store.setTeams"
            v-slot="{ item }"
        >
        <div class="flex items-center justify-between gap-2">
        <div>
            <div class="font-medium">{{ item.name }}</div>
            <div v-if="item.members.length" class="text-muted-foreground text-sm">
                {{ item.members.join(', ') }}
            </div>
            <div v-else class="text-muted-foreground text-sm italic">No members</div>
        </div>
        <span
            class="inline-block size-3 rounded-full border"
            :style="{ backgroundColor: item.hexColor }"
        />
    </div>
        </GenericList>
    </div>
    <TeamForm ref="form" />
</template>