import { useMutation, useQuery, useQueryClient } from "react-query";

import {
	deleteCategory,
	fetchCategories,
	fetchCategoriesById,
	postCategory,
	updateCategory,
} from "./categories.service";
import { CategoryPayload } from "./categories.service.types";

import { useSupabase } from "@/context/supabase-provider";

export const useFetchCategories = () => {
	const { user } = useSupabase();

	return useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchCategories(),
		enabled: !!user,
	});
};

export const useFetchCategoriesById = (id: number) => {
	const { user } = useSupabase();

	return useQuery({
		queryKey: ["categories", id],
		queryFn: () => fetchCategoriesById(id),
		enabled: !!user,
	});
};

export const usePostCategory = () => {
	const queryClient = useQueryClient();

	return useMutation((category: CategoryPayload) => postCategory(category), {
		onSettled: async () => {
			await queryClient.invalidateQueries("categories");
		},
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation((category: CategoryPayload) => updateCategory(category), {
		onSettled: async () => {
			await queryClient.invalidateQueries("categories");
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation((id: number) => deleteCategory(id), {
		onSettled: async () => {
			await queryClient.invalidateQueries("categories");
		},
	});
};
