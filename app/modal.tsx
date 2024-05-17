import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function Modal() {
	const { signOut } = useSupabase();

	return (
		<View className="flex flex-1 justify-center bg-background p-4 gap-y-4">
			<View className="flex flex-1 absolute top-24 right-2">
				<Link href="/settings" asChild>
					<Pressable>
						{({ pressed }) => (
							<FontAwesome
								name="close"
								size={25}
								color="black"
								style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
							/>
						)}
					</Pressable>
				</Link>
			</View>

			<H1 className="text-center">Sign Out</H1>
			<Muted className="text-center">
				This is a modal screen. Sign out and return to the welcome screen.
			</Muted>
			<Button
				className="w-full"
				size="default"
				variant="default"
				onPress={() => {
					signOut();
				}}
			>
				<Text>Sign Out</Text>
			</Button>
		</View>
	);
}
