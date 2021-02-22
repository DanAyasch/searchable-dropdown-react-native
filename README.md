# Searchable Dropdown React Native

Searchable Dropdown in react native, usable with Expo.
Allow you to handle single and multiple selections.

## Screenshots

![first](https://drive.google.com/uc?export=view&id=1n2ODy1ypyjVoSGCujLNjAttMByB5QbpW)
![third](https://drive.google.com/uc?export=view&id=1kHNPQKD8iYD7jUT_Eo9-dvoES8Vdfvk5)
![second](https://drive.google.com/uc?export=view&id=1GF5vAvUjJTwwsS7nF4wVw_1cRvFzGgfb)

## Installation

```bash
npm install --save searchable-dropdown-react-native
```

## Properties

| Name                   | Description                                                      | Type     | Default          | Required |
| ---------------------- | ---------------------------------------------------------------- | -------- | ---------------- | -------- |
| **`options`**          | The options for the component.                                   | `array`  |                  | Yes      |
| `selectedValues`       | The values currently selected.                                   | `array`  |                  | Yes      |
| `setSelectedValues`    | The callback to handle the selection of items                    | `func`   |                  | Yes      |
| `label`                | The label of the dropdown                                        | `string` |                  | No       |
| `placeholder`          | Default text to be shown to the user                             | `string` | 'Select an item' | No       |
| `inputSize`            | Size of the input.                                               | `number` | `150`            | No       |
| `addNewElementText`    | The text that will be shown to add a new element is the options. | `string` | `Add an item`    | No       |
| `rightIcon`            | The icon on the right of the input (if you want one).            | `any`    |                  | No       |
| `selectedElementColor` | Color of the selected items.                                     | `string` |                  | No       |
| `labelStyle`           | Additional styles for the label.                                 | `object` | `{}`             | No       |
| `containerStyle`       | Additional styles for the container view.                        | `object` | `{}`             | No       |
| `itemStyle`            | Additional styles for the items.                                 | `object` | `{}`             | No       |
| `labelStyle`           | Additional styles for the labels.                                | `object` | `{}`             | No       |
| `inputContainerStyle`  | Additional styles for the input container.                       | `object` | `{}`             | No       |
| `inputColor`           | The color of the input.                                          | `string` |                  | No       |

# Example

```jsx
import React, { useState } from "react";
import SearchableDropdown from "searchable-dropdown-react-native";

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
    <SearchableDropdown
      options={items}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      label="test dropdown"
      placeholder="Test placeholder"
      inputSize={300}
    />
  );
}
```
