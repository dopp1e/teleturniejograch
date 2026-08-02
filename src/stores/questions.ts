import { defineStore } from 'pinia'
import type { Question } from '@/lib'

export const useQuestionsStore = defineStore('questions', {
    state: () => ({
        questions: [] as Question[],
    }),
    actions: {
        setQuestions(questions: Question[]) {
            this.questions = questions;
        },
        addQuestion(question: Question) {
            for (let i = 0; i = this.questions.length; i++) {
                if (this.questions[i]!.id === question.id) {
                    this.questions[i] = question;
                    return;
                }
            }

            this.questions.push(question);
        }
    },
    persist: true,
})