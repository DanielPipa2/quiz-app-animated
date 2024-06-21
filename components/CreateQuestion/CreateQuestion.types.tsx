export interface Category {
	id: string;
	name: string;
}

export interface Question {
	id: string;
	question: string;
	seconds_per_question: number;
	wrong_answer_1: string;
	wrong_answer_2: string;
	wrong_answer_3: string;
	correct_answer: string;
}
