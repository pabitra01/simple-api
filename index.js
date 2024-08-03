const express = require("express");
const app = express();
const fetchData1 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 115));
  return {
    foodList: [
      {
        name: "Pizza",
        description: "Delicious pizza with toppings",
        price: "$10",
      },
      { name: "Burger", description: "Juicy burger with fries", price: "$8" },
    ],
  };
};

const fetchData2 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000));
  return {
    locations: ["Restaurant A", "Restaurant B", "Street Vendor C"],
  };
};

const fetchData3 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    nutritionalInfo: {
      calories: 500,
      protein: 20,
      carbs: 60,
      fat: 25,
    },
  };
};

const fetchData4 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    stockOutFoods: ["Sushi", "Salad", "Ice Cream"],
  };
};

const combineData = async () => {
  const data1 = await fetchData1();
  const data2 = await fetchData2();
  const data3 = await fetchData3();
  const data4 = await fetchData4();

  return {
    foodItems: data1.foodList,
    availableLocations: data2.locations,
    nutritionalInformation: data3.nutritionalInfo,
    stockOutFoods: data4.stockOutFoods,
  };
};

app.get("/", async (req, res) => {
  try {
    const mergedData = await combineData();
    res.json(mergedData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
