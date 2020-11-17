import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { ListItem } from "react-native-elements";
import { Chip } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    color: "#000"
  },
  input: {
    paddingLeft: 10,
    width: "100%"
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    opacity: 0.5,
    color: "#000",
    borderRadius: 4
  }
});

const CustomDropdown = ({
  label,
  placeholder,
  addNewElementText = "Ajouter ",
  options,
  selectedValues,
  setSelectedValues,
  rightIcon,
  selectedElementColor,
  setScrollNotOnFlatlist,
  labelStyle,
  inputContainerStyle,
  inputColor,
  inputSize
}) => {
  const [search, setSearch] = useState("");
  const [isDisplayingOptions, setIsDisplayingOptions] = useState(false);

  const [savedItems, setSavedItems] = useState(options);
  const [items, setItems] = useState(options);

  const removeItem = itemToRemove => {
    const index = selectedValues.findIndex(value => value === itemToRemove);
    const data = [...selectedValues];
    data.splice(index, 1);
    setSelectedValues(data);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <View>
        <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
      </View>
      <View
        style={{
          ...styles.inputContainer,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          ...inputContainerStyle,
          width: inputSize ? inputSize : "auto"
        }}
      >
        <View style={{ width: "90%" }}>
          <TextInput
            placeholderTextColor={inputColor}
            color={inputColor}
            style={styles.input}
            fontStyle={!search || search.length == 0 ? "italic" : "normal"}
            placeholder={placeholder}
            value={search}
            onFocus={() => setIsDisplayingOptions(true)}
            isFocus={focused => setIsDisplayingOptions(focused)}
            onChangeText={value => {
              setSearch(value);
              if (value.length === 0) {
                setItems(savedItems);
              } else {
                let data = [];
                for (let item of savedItems) {
                  if (item.value.toLowerCase().includes(value.toLowerCase())) {
                    data.push(item);
                  }
                }
                setItems(data);
              }
            }}
          />
        </View>
        <View style={{ paddingRight: 10 }}>
          {!isDisplayingOptions ? (
            <TouchableWithoutFeedback
              onPress={() => setIsDisplayingOptions(true)}
            >
              <AntDesign name="down" size={16} color="black" />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setIsDisplayingOptions(false)}
            >
              <AntDesign name="up" size={16} color="black" />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
      <View>
        {isDisplayingOptions &&
          (items.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#000",
                flexWrap: "wrap",
                width: inputSize ? inputSize : "auto"
              }}
            >
              <FlatList
                key={"dropdownList"}
                vertical
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onTouchStart={() =>
                  setScrollNotOnFlatlist && setScrollNotOnFlatlist(false)
                }
                onTouchEnd={() =>
                  setScrollNotOnFlatlist && setScrollNotOnFlatlist(true)
                }
                onMomentumScrollEnd={() =>
                  setScrollNotOnFlatlist && setScrollNotOnFlatlist(true)
                }
                data={items}
                extraData={selectedValues}
                style={{ maxHeight: 200 }}
                contentContainerStyle={{
                  width: inputSize ? inputSize - 2 : "100%"
                }}
                renderItem={({ item }) => {
                  return (
                    <ListItem
                      key={item.name}
                      containerStyle={{
                        backgroundColor: selectedValues.some(
                          value => value === item.value
                        )
                          ? selectedElementColor
                          : "transparent"
                      }}
                      bottomDivider={true}
                      Component={TouchableWithoutFeedback}
                      onPress={() => {
                        if (!selectedValues.some(value => value === item.value))
                          setSelectedValues([...selectedValues, item.value]);
                        else {
                          removeItem(item.value);
                        }
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14 }}>
                          {item.name}
                        </ListItem.Title>
                      </ListItem.Content>
                      {selectedValues.some(value => value === item.value) &&
                        rightIcon}
                    </ListItem>
                  );
                }}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setSavedItems([...savedItems, { name: search, value: search }]);
                setItems([...items, { name: search, value: search }]);
                setSelectedValues([...selectedValues, search]);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#000",
                  width: inputSize ? inputSize : "auto"
                }}
              >
                <View
                  style={{
                    height: 50,
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ alignItems: "center", paddingLeft: 15 }}>
                    {`${addNewElementText}${search}`}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            maxWidth: "100%",
            flexWrap: "wrap"
          }}
        >
          {selectedValues.map((value, key) => {
            return (
              <View key={key} style={{ padding: 3 }}>
                <Chip key={key} onClose={() => removeItem(value)}>
                  {value}
                </Chip>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

CustomDropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  addNewElementText: PropTypes.string,
  options: PropTypes.array.isRequired,
  rightIcon: PropTypes.element,
  selectedElementColor: PropTypes.string,
  selectedValues: PropTypes.array.isRequired,
  setSelectedValues: PropTypes.func.isRequired,
  setScrollNotOnFlatlist: PropTypes.func
};

CustomDropdown.defaultProps = {
  rightIcon: <AntDesign name="checkcircle" color={"#000"} size={17} />,
  selectedElementColor: "rgba(0, 0, 0, 0.1)"
};

export default CustomDropdown;
