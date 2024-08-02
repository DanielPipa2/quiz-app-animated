import React, { useEffect, useState } from "react";
import {
	TextInput,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

import { Button } from "../ui/button";
import { H4, Lead, P } from "../ui/typography";

import { SafeAreaView } from "@/components/safe-area-view";
import { supabase } from "@/config/supabase";
import { Category } from "@/services/categories/categories.service.types";
import { Questions } from "@/services/questions/questions.service.types";

const CreateQuestion = () => {
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState<Questions[]>([]);
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
			return;
		}
		const { error } = await supabase.from("questions").insert([newQuestion]);
		if (error) console.log("Error: ", error);
		fetchItems();
	}

	async function deleteItem(id: number) {
		const { error } = await supabase.from("questions").delete().match({ id });
		if (error) console.log("Error: ", error);
		fetchItems();
	}

	if (loading)
		return (
			<View className="flex-1 items-center justify-center px-4">
				<Text>Loading...</Text>
			</View>
		);

	return (
		<SafeAreaView className="flex-1 justify-center items-start w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
			{/* <TextInput
				placeholder="Quiz Name"
				value={newQuestion.question}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, question: text })
				}
				className="h-12 border-2 rounded-xl w-full border-gray-200"
			/> */}
			<Lead className="text-black font-medium pb-2">Title</Lead>
			<TextInput
				placeholder="Question"
				value={newQuestion.question}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, question: text })
				}
				className="border-2 rounded-2xl pl-6 w-full border-gray-200"
				style={styles.inputStyle}
			/>
			<Lead className="text-black font-medium pt-4 pb-2">
				Seconds per question
			</Lead>
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
				className="border-2 rounded-2xl pl-6 w-full border-gray-200"
				style={styles.inputStyle}
			/>
			<Lead className="text-black font-medium pt-4 pb-2">Wrong Answer 1</Lead>
			<TextInput
				placeholder="Wrong Answer 1"
				value={newQuestion.wrong_answer_1}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, wrong_answer_1: text })
				}
				className="border-2 rounded-2xl pl-6 w-full border-gray-200"
				style={styles.inputStyle}
			/>
			<Lead className="text-black font-medium pt-4 pb-2">Wrong Answer 2</Lead>
			<TextInput
				placeholder="Wrong Answer 2"
				value={newQuestion.wrong_answer_2}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, wrong_answer_2: text })
				}
				className="border-2 rounded-2xl pl-6 w-full border-gray-200"
				style={styles.inputStyle}
			/>
			<Lead className="text-black font-medium pt-4 pb-2">Wrong Answer 3</Lead>
			<TextInput
				placeholder="Wrong Answer 3"
				value={newQuestion.wrong_answer_3}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, wrong_answer_3: text })
				}
				className="border-2 rounded-2xl pl-6 w-full border-gray-200"
				style={styles.inputStyle}
			/>
			<Lead className="text-black font-medium pt-4 pb-2">Correct Answer</Lead>
			<TextInput
				placeholder="Correct Answer"
				value={newQuestion.correct_answer}
				onChangeText={(text) =>
					setNewQuestion({ ...newQuestion, correct_answer: text })
				}
				className="border-2 rounded-2xl pl-6 w-full border-gray-200"
				style={styles.inputStyle}
			/>
			{/* <Lead className="text-black font-medium pt-4 pb-2">Quiz Category</Lead>
			<View className="border-2 rounded-2xl pl-6 w-full border-gray-200 mb-6">
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
			</View> */}
			<Button
				className="rounded-2xl w-full bg-white"
				size="lg"
				variant="secondary"
				onPress={createItem}
			>
				<H4 className="font-bold text-[#6c5ce0]">Submit question</H4>
			</Button>
			<ScrollView
				className="w-full mt-10 pb-10"
				showsVerticalScrollIndicator={false}
			>
				{questions.map((item) => (
					<View
						className="p-4 bg-white border border-gray-200 mb-3 rounded-2xl w-full"
						key={item.id}
					>
						<P className="text-lg font-semibold text-black">{item.question}</P>
						<TouchableOpacity
							onPress={() => deleteItem(item.id)}
							className="mt-2 bg-red-500 p-2.5 rounded-lg"
						>
							<P className="text-white text-center">Delete</P>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		height: 50,
		borderWidth: 2,
		borderRadius: 20,
	},
});

export default CreateQuestion;
