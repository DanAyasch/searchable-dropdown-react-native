import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomDropdown from "./src/CustomDropdown";

export default function App() {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <CustomDropdown
      options={[{ name: "Test", value: "test" }]}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      label="test dropdown"
      placeholder="Test placeholder"
      inputSize={300}
    />
  );
}
