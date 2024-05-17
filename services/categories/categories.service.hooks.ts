import { useMutation, useQuery, useQueryClient } from "react-query";

import { fetchCategories, postCategory } from "./categories.service";
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

export const usePostCategory = () => {
	const queryClient = useQueryClient();

	return useMutation((category: CategoryPayload) => postCategory(category), {
		onSettled: async () => {
			await queryClient.invalidateQueries("categories");
		},
	});
};
