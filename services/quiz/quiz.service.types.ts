// Quiz service interfaces and types

export interface Quiz {
	id: number;
	created_at: string;
	title: string;
	category_id: number;
	description: string;
	host_id: string;
	image: string;
	status: string;
	questions_id: number[] | null;
}

export interface QuizPayload {
	id?: number;
	title: string;
	category_id: number;
	description: string;
	host_id: string;
	image: string;
	status: string;
	questions_id: number[] | null;
}
