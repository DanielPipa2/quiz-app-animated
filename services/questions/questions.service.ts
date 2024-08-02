// Questions services

import { QuestionPayload, Questions } from "./questions.service.types";

import { supabase } from "@/config/supabase";

export const fetchQuestions = async (): Promise<Questions[]> => {
	const { data: questions } = await supabase
		.from("questions")
		.select("*")
		.throwOnError();
	if (!questions) throw new Error("No questions found.");
	return questions;
};

export const fetchQuestionsById = async (id: number): Promise<Questions> => {
	const { data: questions } = await supabase
		.from("questions")
		.select("*")
		.eq("id", id)
		.throwOnError();
	if (!questions) throw new Error("No questions found.");
	return questions[0];
};

export const postQuestion = async (question: QuestionPayload): Promise<any> => {
	const { data } = await supabase
		.from("questions")
		.insert({ ...question })
		.select("*")
		.single();
	if (!data) throw new Error("Question wasn't created.");
	return data;
};

export const updateQuestion = async (
	question: QuestionPayload,
): Promise<any> => {
	const { data } = await supabase
		.from("questions")
		.update({ ...question })
		.eq("id", question.id)
		.select();
	if (!data) throw new Error("Question wasn't updated.");
	return data;
};

export const deleteQuestion = async (id: number): Promise<any> => {
	const { data } = await supabase
		.from("questions")
		.delete()
		.eq("id", id)
		.select();
	if (!data) throw new Error("Question wasn't deleted.");
	return data;
};
