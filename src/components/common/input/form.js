import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Select } from "antd";

const { Option } = Select;

const orderData = [
  {
    restaurantName: "Al-Naz (Main)",
    items: [
      {
        name: "Biryani",
        prices: [
          {
            value: 100,
          },
          {
            value: 80,
          },
        ],
      },
      {
        name: "Pulao",
        prices: [
          {
            value: 110,
          },
          {
            value: 90,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    restaurantName: "Quetta Hotel",
    items: [
      {
        id: 21,
        name: "Paratha",
        prices: [
          {
            id: 211,
            value: 150,
          },
          {
            id: 212,
            value: 30,
          },
        ],
      },
      {
        id: 22,
        name: "Chai",
        prices: [
          {
            id: 221,
            value: 30,
          },
          {
            id: 222,
            value: 50,
          },
        ],
      },
    ],
  },
];

const noRestaurant = {
  id: 3,
  restaurantName: "No Restaurant Selected",
};

const noItems = [
  {
    id: 31,
    name: "No Item Selected",
  },
];

const noPrices = [
  {
    id: 311,
    value: "No Price Selected",
  },
];

const defaultValue = "Please Select";

const App = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(noRestaurant);
  const [selectedItems, setSelectedItems] = useState(noItems);
  const [selectedPrices, setSelectedPrices] = useState(noPrices);

  const handleRestaurantChange = (value) => {
    const foundRestaurant = orderData.find((res) => +res.id === +value);

    if (foundRestaurant) {
      setSelectedRestaurant(foundRestaurant);
      setSelectedItems(foundRestaurant.items);
      setSelectedPrices(foundRestaurant.prices);
    } else {
      setSelectedRestaurant(noRestaurant);
      setSelectedItems(noItems);
      setSelectedPrices(noPrices);
    }
  };

  const handleItemChange = (value) => {
    const foundItem = selectedItems.find((res) => +res.id === +value);

    if (foundItem) {
      setSelectedPrices(foundItem.prices);
    } else {
      setSelectedPrices(noPrices);
    }
  };

  const handlePriceChange = (value) => {
    console.log("Price", value);
  };

  return (
    <>
      <Select
        defaultValue={defaultValue}
        style={{ width: 120 }}
        onChange={handleRestaurantChange}
        value={selectedRestaurant.restaurantName}
      >
        {orderData.map((order) => (
          <Option key={order.id}>{order.restaurantName}</Option>
        ))}
      </Select>
      <Select
        defaultValue={defaultValue}
        style={{ width: 120 }}
        onChange={handleItemChange}
      >
        {selectedItems.map((item) => (
          <Option key={item.id}>{item.name}</Option>
        ))}
      </Select>
      <Select
        defaultValue={defaultValue}
        style={{ width: 120 }}
        onChange={handlePriceChange}
      >
        {selectedPrices.map((price) => (
          <Option key={price.id}>{price.value}</Option>
        ))}
      </Select>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
