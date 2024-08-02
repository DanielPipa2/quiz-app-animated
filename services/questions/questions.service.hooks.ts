import { useMutation, useQuery, useQueryClient } from "react-query";

import {
	deleteQuestion,
	fetchQuestions,
	fetchQuestionsById,
	postQuestion,
	updateQuestion,
} from "./questions.service";
import { QuestionPayload } from "./questions.service.types";

import { useSupabase } from "@/context/supabase-provider";

export const useFetchQuestions = () => {
	const { user } = useSupabase();

	return useQuery({
		queryKey: ["questions"],
		queryFn: () => fetchQuestions(),
		enabled: !!user,
	});
};

export const useFetchQuestionsById = (id: number) => {
	const { user } = useSupabase();

	return useQuery({
		queryKey: ["questions", id],
		queryFn: () => fetchQuestionsById(id),
		enabled: !!user,
	});
};

export const usePostQuestion = () => {
	const queryClient = useQueryClient();

	return useMutation((question: QuestionPayload) => postQuestion(question), {
		onSettled: async () => {
			await queryClient.invalidateQueries("questions");
		},
	});
};

export const useUpdateQuestion = () => {
	const queryClient = useQueryClient();

	return useMutation((question: QuestionPayload) => updateQuestion(question), {
		onSettled: async () => {
			await queryClient.invalidateQueries("questions");
		},
	});
};

export const useDeleteQuestion = () => {
	const queryClient = useQueryClient();

	return useMutation((id: number) => deleteQuestion(id), {
		onSettled: async () => {
			await queryClient.invalidateQueries("questions");
		},
	});
};
