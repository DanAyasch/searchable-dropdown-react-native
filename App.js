import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomDropdown from "./src/CustomDropdown";

export default function App() {
  return (
    <CustomDropdown
      options={[
        { name: "Test", value: "test" },
        { name: "Test", value: "test" },
        { name: "Test", value: "test" },
        { name: "Test", value: "test" }
      ]}
      selectedValues={[]}
      setSelectedValues={() => console.log("HERE I SET")}
      label="test dropdown"
      placeholder="Test placeholder"
    />
  );
}
