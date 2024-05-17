import { View } from "react-native";

import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function TabTwoScreen() {
	const { user } = useSupabase();
	const { full_name } = user?.user_metadata ?? {};

	return (
		<View className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
			<H1 className="text-center">
				{full_name ? `Welcome, ${full_name}!` : "Welcome!"}
			</H1>
			<Muted className="text-center">Press gear icon to sign out</Muted>
		</View>
	);
}
