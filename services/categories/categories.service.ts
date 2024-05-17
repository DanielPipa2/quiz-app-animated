import { Category, CategoryPayload } from "./categories.service.types";

import { supabase } from "@/config/supabase";

export const fetchCategories = async (): Promise<Category[]> => {
	const { data: categories } = await supabase
		.from("categories")
		.select("*")
		.throwOnError();
	if (!categories) throw new Error("No categories found.");
	return categories;
};

export const postCategory = async (category: CategoryPayload): Promise<any> => {
	const { data } = await supabase
		.from("categories")
		.insert([category])
		.single()
		.throwOnError();
	if (!data) throw new Error("Category wasn't created.");
	return data;
};
