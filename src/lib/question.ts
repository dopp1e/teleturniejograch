export enum QuestionType {
    OpenEnded = "Open-Ended",
    ChooseOneOrMany = "Choose one or many",
    Reorder = "Choose order"
}

export interface Question {
    id: string;
    type: QuestionType;
    question: string;
    answers: string[];
    acceptedAnswers: string[];
}