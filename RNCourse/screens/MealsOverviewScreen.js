import { View, FlatList, StyleSheet } from "react-native";

import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useEffect } from "react";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useEffect(() => {
    const selectedCategory = CATEGORIES.find(
      (category) => category.id === catId
    );
    const categoryTitle = selectedCategory.title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId]);

  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
