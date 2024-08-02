import { useMutation, useQuery, useQueryClient } from "react-query";

import {
	deleteQuiz,
	fetchQuizzes,
	fetchQuizzesById,
	postQuiz,
	updateQuiz,
} from "./quiz.service";
import { QuizPayload } from "./quiz.service.types";

import { useSupabase } from "@/context/supabase-provider";

export const useFetchQuiz = () => {
	const { user } = useSupabase();

	return useQuery({
		queryKey: ["quiz"],
		queryFn: () => fetchQuizzes(),
		enabled: !!user,
	});
};

export const useFetchQuizById = (id: number) => {
	const { user } = useSupabase();

	return useQuery({
		queryKey: ["quiz", id],
		queryFn: () => fetchQuizzesById(id),
		enabled: !!user,
	});
};

export const usePostQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation((quiz: QuizPayload) => postQuiz(quiz), {
		onSettled: async () => {
			await queryClient.invalidateQueries("quiz");
		},
	});
};

export const useUpdateQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation((quiz: QuizPayload) => updateQuiz(quiz), {
		onSettled: async () => {
			await queryClient.invalidateQueries("quiz");
		},
	});
};

export const useDeleteQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation((id: number) => deleteQuiz(id), {
		onSettled: async () => {
			await queryClient.invalidateQueries("quiz");
		},
	});
};
