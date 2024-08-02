import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function TabTwoScreen() {
	const { user } = useSupabase();
	const { full_name } = user?.user_metadata ?? {};

	return (
		<SafeAreaView
			className="flex-1 bg-background p-4 gap-y-4"
			style={{ backgroundColor: "#6c5ce0" }}
		>
			<Link href="/modal" asChild className="items-end">
				<Pressable>
					{({ pressed }) => (
						<FontAwesome
							name="gear"
							size={25}
							color="white"
							style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
						/>
					)}
				</Pressable>
			</Link>
			<View className="flex flex-1 justify-center">
				<H1 className="text-center">
					{full_name ? `Welcome, ${full_name}!` : "Welcome!"}
				</H1>
				<Muted className="text-center dark:text-gray-50">
					Press gear icon to sign out
				</Muted>
			</View>
		</SafeAreaView>
	);
}
