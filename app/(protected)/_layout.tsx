import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={24} style={{ marginBottom: -4 }} {...props} />;
}

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	const tabProps = {
		tabBarStyle: {
			height: 72,
		},
		tabBarLabelStyle: {
			fontSize: 12,
			marginBottom: 12,
		},
	};

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? theme.dark.background
							: theme.light.background,
				},
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Inicio",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					...tabProps,
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: "Categorías",
					tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
					...tabProps,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Perfil",
					headerShown: true,
					headerTintColor: "white",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="gear"
										size={25}
										color="black"
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
					...tabProps,
				}}
			/>
		</Tabs>
	);
}
