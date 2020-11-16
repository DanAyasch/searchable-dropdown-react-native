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
    color: "#241C4C"
  },
  input: {
    paddingLeft: 10,
    width: "100%"
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#241C4C",
    height: 50,
    opacity: 0.5,
    color: "#241C4C",
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
  setScrollNotOnFlatlist
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
        <Text style={styles.label}>{label}</Text>
      </View>
      <View
        style={{
          ...styles.inputContainer,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View>
          <TextInput
            placeholderTextColor="#241C4C"
            color="#241C4C"
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
                for (let item of items) {
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
                borderColor: "#825DFF",
                flexWrap: "wrap"
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
                contentContainerStyle={{ width: "100%" }}
                renderItem={({ item, index }) => {
                  return (
                    <ListItem
                      containerStyle={{
                        backgroundColor: selectedValues.some(
                          category => category === item.value
                        )
                          ? "rgba(130, 93, 255, 0.15)"
                          : "transparent"
                      }}
                      titleStyle={{
                        fontSize: 14
                      }}
                      bottomDivider={true}
                      Component={TouchableWithoutFeedback}
                      title={item.name}
                      rightIcon={
                        selectedValues.some(
                          category => category === item.value
                        ) ? (
                          <AntDesign
                            name="checkcircle"
                            color={"#825DFF"}
                            size={17}
                          />
                        ) : (
                          {}
                        )
                      }
                      onPress={() => {
                        if (
                          !selectedValues.some(
                            category => category === item.value
                          )
                        )
                          setSelectedValues([...selectedValues, item.value]);
                        else {
                          removeItem(item.value);
                        }
                      }}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#825DFF"
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setSavedItems([
                    ...savedItems,
                    { name: search, value: search }
                  ]);
                  setItems([...items, { name: search, value: search }]);
                  setSelectedValues([...selectedValues, search]);
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
              </TouchableWithoutFeedback>
            </View>
          ))}
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            maxWidth: 350,
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
  selectedValues: PropTypes.array.isRequired,
  setSelectedValues: PropTypes.func.isRequired,
  setScrollNotOnFlatlist: PropTypes.func
};

export default CustomDropdown;
