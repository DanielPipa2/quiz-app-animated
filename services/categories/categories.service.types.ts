export interface Category {
	id: string;
	name: string;
	icon: string;
	created_at: string;
}

export interface CategoryPayload {
	name: string;
	icon: string;
}
