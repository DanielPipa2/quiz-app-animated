// Quiz services

import { QuizPayload, Quiz } from "./quiz.service.types";

import { supabase } from "@/config/supabase";

export const fetchQuizzes = async (): Promise<Quiz[]> => {
	const { data: quiz } = await supabase.from("quiz").select("*").throwOnError();
	if (!quiz) throw new Error("No quiz found.");
	return quiz;
};

export const fetchQuizzesById = async (id: number): Promise<Quiz> => {
	const { data: quiz } = await supabase
		.from("quiz")
		.select("*")
		.eq("id", id)
		.throwOnError();
	if (!quiz) throw new Error("No quiz found.");
	return quiz[0];
};

export const postQuiz = async (quiz: QuizPayload): Promise<any> => {
	const { data } = await supabase
		.from("quiz")
		.insert({ ...quiz })
		.select("*")
		.single();
	if (!data) throw new Error("Quiz wasn't created.");
	return data;
};

export const updateQuiz = async (quiz: QuizPayload): Promise<any> => {
	const { data } = await supabase
		.from("quiz")
		.update({ ...quiz })
		.eq("id", quiz.id)
		.select();
	if (!data) throw new Error("Quiz wasn't updated.");
	return data;
};

export const deleteQuiz = async (id: number): Promise<any> => {
	const { data } = await supabase.from("quiz").delete().eq("id", id).select();
	if (!data) throw new Error("Quiz wasn't deleted.");
	return data;
};
