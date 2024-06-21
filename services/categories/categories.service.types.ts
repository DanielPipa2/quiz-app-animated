export interface Category {
	id: string;
	name: string;
	icon: string;
	created_at: string;
}

export interface CategoryPayload {
	id?: string;
	name: string;
	icon: string;
	updated_at?: string;
}
