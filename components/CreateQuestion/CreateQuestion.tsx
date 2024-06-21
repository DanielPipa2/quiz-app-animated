import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
	TextInput,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";

import { Category, Question } from "./CreateQuestion.types";

import { SafeAreaView } from "@/components/safe-area-view";
import { supabase } from "@/config/supabase";

const CreateQuestion = () => {
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>();
	const [newQuestion, setNewQuestion] = useState({
		question: "",
		seconds_per_question: 0,
		wrong_answer_1: "",
		wrong_answer_2: "",
		wrong_answer_3: "",
		correct_answer: "",
	});

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			console.error("Error fetching categories:", error);
			return;
		}

		setCategories(data);
	};

	useEffect(() => {
		fetchItems();
	}, []);

	async function fetchItems() {
		setLoading(true);
		const { data: questions, error } = await supabase
			.from("questions")
			.select("*");
		if (error) console.log("Error: ", error);
		else setQuestions(questions || []);
		setLoading(false);
	}

	async function createItem() {
		if (
			!newQuestion.question.trim() ||
			newQuestion.seconds_per_question <= 0 ||
			!newQuestion.wrong_answer_1.trim() ||
			!newQuestion.wrong_answer_2.trim() ||
			!newQuestion.wrong_answer_3.trim() ||
			!newQuestion.correct_answer.trim() ||
			!selectedCategory
		) {
			console.log("All fields are required");
			return;
		}
		const { error } = await supabase.from("questions").insert([newQuestion]);
		if (error) console.log("Error: ", error);
		fetchItems();
	}

	async function deleteItem(id: string) {
		const { error } = await supabase.from("questions").delete().match({ id });
		if (error) console.log("Error: ", error);
		fetchItems();
	}

	if (loading) return <Text>Loading...</Text>;

	return (
		<SafeAreaView className="flex-1 justify-center items-center w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
			<TextInput
				placeholder="Question"
				value={newQuestion.question}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, question: text })
				}
				className="h-12 border mb-3 p-3 w-full rounded-lg shadow-lg"
			/>
			<TextInput
				placeholder="Seconds per Question"
				value={String(newQuestion.seconds_per_question)}
				onChangeText={(text) =>
					setNewQuestion({
						...newQuestion,
						seconds_per_question: parseInt(text, 10) || 0,
					})
				}
				keyboardType="numeric"
				className="h-12 border  mb-3 p-3 w-full rounded-lg shadow-lg"
			/>
			<TextInput
				placeholder="Wrong Answer 1"
				value={newQuestion.wrong_answer_1}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, wrong_answer_1: text })
				}
				className="h-12 border border-gray-300 mb-3 p-3 w-full rounded-lg shadow-lg"
			/>
			<TextInput
				placeholder="Wrong Answer 2"
				value={newQuestion.wrong_answer_2}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, wrong_answer_2: text })
				}
				className="h-12 border border-gray-300 mb-3 p-3 w-full rounded-lg shadow-lg"
			/>
			<TextInput
				placeholder="Wrong Answer 3"
				value={newQuestion.wrong_answer_3}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, wrong_answer_3: text })
				}
				className="h-12 border border-gray-300 mb-3 p-3 w-full rounded-lg shadow-lg"
			/>
			<TextInput
				placeholder="Correct Answer"
				value={newQuestion.correct_answer}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, correct_answer: text })
				}
				className="h-12 border border-gray-300 mb-3 p-3 w-full rounded-lg shadow-lg"
			/>
			<View className="mb-3 w-full shadow-lg">
				<Picker
					selectedValue={selectedCategory}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedCategory(itemValue)
					}
					style={{ height: 50, width: "100%" }}
				>
					{categories.map((category) => (
						<Picker.Item
							key={category.id}
							label={category.name}
							value={category.id}
						/>
					))}
				</Picker>
			</View>
			<TouchableOpacity
				onPress={createItem}
				className="bg-blue-500 p-4 rounded-lg shadow-lg w-full mb-3"
			>
				<Text className="text-white text-center">Create Question</Text>
			</TouchableOpacity>
			<FlatList
				data={questions}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className="p-4 bg-white border border-gray-200 mb-3 rounded-lg shadow-lg w-full">
						<Text className="text-lg font-semibold">{item.question}</Text>
						{/* Display other question details here */}
						<TouchableOpacity
							onPress={() => deleteItem(item.id)}
							className="mt-2 bg-red-500 p-2 rounded-lg"
						>
							<Text className="text-white text-center">Delete</Text>
						</TouchableOpacity>
					</View>
				)}
				className="w-full mt-4"
			/>
		</SafeAreaView>
	);
};

export default CreateQuestion;
