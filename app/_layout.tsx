import "../global.css";
import { Stack } from "expo-router";
import { useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { SupabaseProvider } from "@/context/supabase-provider";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	const queryClientRef = useRef<QueryClient>();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: process.env.ENV === "production",
					staleTime: 15 * 1000 * 60,
				},
			},
		});
	}

	return (
		<SafeAreaProvider className="flex-1 bg-white">
			<QueryClientProvider client={queryClientRef.current}>
				<SupabaseProvider>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen
							name="(protected)"
							options={{ statusBarColor: "#6c5ce0" }}
						/>
						<Stack.Screen name="(public)" />
						<Stack.Screen
							name="modal"
							options={{
								presentation: "modal",
							}}
						/>
					</Stack>
				</SupabaseProvider>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
