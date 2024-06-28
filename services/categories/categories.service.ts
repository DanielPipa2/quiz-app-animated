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

export const fetchCategoriesById = async (id: number): Promise<Category> => {
	const { data: categories } = await supabase
		.from("categories")
		.select("*")
		.eq("id", id)
		.throwOnError();
	if (!categories) throw new Error("No categories found.");
	return categories[0];
};

export const postCategory = async (category: CategoryPayload): Promise<any> => {
	const { data } = await supabase
		.from("categories")
		.insert({ ...category })
		.select("*")
		.single();
	if (!data) throw new Error("Category wasn't created.");
	return data;
};

export const updateCategory = async (
	category: CategoryPayload,
): Promise<any> => {
	const { data } = await supabase
		.from("categories")
		.update({ ...category })
		.eq("id", category.id)
		.select();
	if (!data) throw new Error("Category wasn't updated.");
	return data;
};

export const deleteCategory = async (id: number): Promise<any> => {
	const { data } = await supabase
		.from("categories")
		.delete()
		.eq("id", id)
		.select();
	if (!data) throw new Error("Category wasn't deleted.");
	return data;
};
