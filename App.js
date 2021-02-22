import React, { useState } from "react";
import CustomDropdown from "./src/CustomDropdown";
import { View } from "react-native";

let items = [
  {
    id: 1,
    name: "JavaScript",
    value: "JavaScript"
  },
  {
    id: 2,
    name: "Java",
    value: "Java"
  },
  {
    id: 3,
    name: "Ruby",
    value: "Ruby"
  },
  {
    id: 4,
    name: "React Native",
    value: "React Native"
  },
  {
    id: 5,
    name: "PHP",
    value: "PHP"
  },
  {
    id: 6,
    name: "Python",
    value: "Python"
  },
  {
    id: 7,
    name: "Go",
    value: "Go"
  },
  {
    id: 8,
    name: "Swift",
    value: "Swift"
  }
];

export default function App() {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <View style={{ marginLeft: 30, marginTop: 50 }}>
      <CustomDropdown
        options={items}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        addNewElementText="Add "
        label="Programming Languages"
        placeholder="Languages"
        inputSize={300}
      />
    </View>
  );
}
