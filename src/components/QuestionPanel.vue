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
import { useQuestionsStore } from "@/stores/questions.ts"
import GenericList from '@/components/GenericList.vue'
import QuestionForm from "@/components/QuestionForm.vue"

const store = useQuestionsStore()
const { questions } = storeToRefs(store)

const form = ref(null)
const createQuestion = () => form.value.open()
const editQuestion = (p) => form.value.open(p)
</script>

<template>
    <div class="flex justify-center pt-16">
        <GenericList
            title="Questions"
            :initial-items="questions"
            :create-item="createQuestion"
            :edit-item="editQuestion"
            @change="store.setQuestions"
            v-slot="{ item }"
        >
        <div class="flex items-center justify-between gap-2">
        <div>
            <div class="font-medium">{{ item.question }}</div>
            <div class="text-muted-foreground text-sm">
                item.type
            </div>
        </div>
        <span
            class="inline-block size-3 rounded-full border"
            :style="{ backgroundColor: item.hexColor }"
        />
    </div>
        </GenericList>
    </div>
    <QuestionForm ref="form" />
</template>