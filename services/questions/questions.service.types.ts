// Questions service interfaces and types

export interface Questions {
	id: number;
	created_at: string;
	question: string;
	seconds_per_question: number;
	wrong_answer_1: string;
	wrong_answer_2: string;
	wrong_answer_3: string;
	correct_answer: string;
}

export interface QuestionPayload {
	id?: number;
	question: string;
	seconds_per_question: number;
	wrong_answer_1: string;
	wrong_answer_2: string;
	wrong_answer_3: string;
	correct_answer: string;
}

export interface QuestionFormData {
	question: string;
	seconds_per_question: number;
	wrong_answer_1: string;
	wrong_answer_2: string;
	wrong_answer_3: string;
	correct_answer: string;
}
