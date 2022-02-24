import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { Form, Button, Input, Alert } from "antd";
import { Box, Paper } from "@mui/material";
import items from "../itemAPI.json";
import { addDoc, collection } from "firebase/firestore";
import fireStore from "../Config/firebase";
import "./index.css";

interface OrderItem {
  restaurantName: string;
  id: number;
  value: string;
  amount: number;
}
interface OrderItems {
  items: Array<OrderItem>;
}

const Temp = () => {
  const [selectedItems, setSelectedItems] = useState<OrderItems>();
  const [givenAmount, setGivenAmount] = useState<number>(0);
  const [orderAmount, setOrderAmount] = useState<number>(0);
  const [returnAmount, setReturnAmount] = useState<any>();
  const [alert, setAlert] = useState<boolean>(false);
  // console.log(selectedItems?.items);

  const staticOrderItems: OrderItems = items;
  const [form] = Form.useForm();
  const { Option, OptGroup } = Select;

  const unique = Array.from(
    new Set(staticOrderItems.items.map((res: any) => res.restaurantName))
  ).map((value: any) => value);

  const onFormSubmit = () => {
    form.validateFields().then((values) => {
      values.givenAmount = givenAmount;
      values.orderAmount = orderAmount;
      values.returnAmount = returnAmount;
      values.items = selectedItems?.items;
      // console.log("values", values);
      const db = fireStore;
      let data = addDoc(collection(db, "User"), values);
      console.log(data);
    });
  };
  useEffect(() => {
    const returnCash = givenAmount - orderAmount;
    if (orderAmount === 0) {
      return;
    } else if (givenAmount >= orderAmount) {
      setReturnAmount(returnCash);
      setAlert(false);
    } else {
      setAlert(true);
    }
  }, [orderAmount, givenAmount]);

  return (
    <>
      <div className="body">
        <Box>
          <Paper
            elevation={12}
            className="paper"
            style={{ border: "5px solid orange", padding: "20px" }}
          >
            <h1 className="order">Place Your Order Here...</h1>
            <Form layout="horizontal" className="form" form={form}>
              <Form.Item
                name="name"
                label="Select User"
                rules={[
                  { required: true, message: "Please select your Username!" },
                ]}
              >
                <Select>
                  <Select.Option value="Mohsin Ghani">
                    Mohsin Ghani
                  </Select.Option>
                  <Select.Option value="Hammad Younus">
                    Hammad Younus
                  </Select.Option>
                  <Select.Option value="Shariq Ateeq">
                    Shariq Ateeq
                  </Select.Option>
                  <Select.Option value="Yasir Ahmed">
                    Yasir Ahmed Ghouri
                  </Select.Option>
                  <Select.Option value="Syed Rahmeer">
                    Syed Rahmeer
                  </Select.Option>
                  <Select.Option value="Zia-Ur-Rehman">
                    Zia-Ur-Rehman Warsi
                  </Select.Option>
                  <Select.Option value="Ibrar Ahmed">
                    Ibrar Ahmed Khatri
                  </Select.Option>
                  <Select.Option value="Syed Azmeer">
                    Syed Azmeer Haider
                  </Select.Option>
                  <Select.Option value="Sarib Ghouri">
                    Sarib Ghouri
                  </Select.Option>
                  <Select.Option value="Atif Memon">Atif Memon</Select.Option>
                  <Select.Option value="Muhammad Shayan">
                    Muhammad Shayan
                  </Select.Option>
                  <Select.Option value="Muhammad Usman">
                    Muhammad Usman Ali
                  </Select.Option>
                  <Select.Option value="Hashir Khan">Hashir Khan</Select.Option>
                  <Select.Option value="Muhammad Ahsan">
                    Muhammad Ahsan Ali
                  </Select.Option>
                  <Select.Option value="Muhammad Qasim">
                    Muhammmad Qasim
                  </Select.Option>
                  <Select.Option value="Tabish Ansari">
                    Tabish Ansari
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Order" name="items">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Restaurant & Order"
                  onChange={(e) => {
                    let selected: OrderItems = {
                      items: staticOrderItems?.items?.filter(
                        (item: OrderItem) => {
                          return e.includes(item.id);
                        }
                      ),
                    };
                    setSelectedItems(selected);
                    let sumOfOrderItemsPrice = 0;
                    selected.items.forEach((item: OrderItem) => {
                      sumOfOrderItemsPrice += item.amount;
                    });
                    // console.log(sumOfOrderItemsPrice);
                    setOrderAmount(sumOfOrderItemsPrice);
                  }}
                >
                  {unique.map((uni, idx) => (
                    <OptGroup key={idx} label={uni}>
                      {staticOrderItems.items
                        .filter((item: any) => item.restaurantName === uni)
                        .map((item: any) => (
                          <Option key={item.id} value={item.id}>
                            {`${uni} , ${item.value} , Rs.${item.amount}/-`}
                          </Option>
                        ))}
                    </OptGroup>
                  ))}
                </Select>
              </Form.Item>
              {/* <Form.Item
                name="restaurant"
                label="Restaurant"
                rules={[
                  { required: true, message: "Please select Restaurant!" },
                ]}
              >
                <Select onChange={onRestaurantChange}>
                  {(staticOrderItems.orders || []).map((res: any) => {
                    return (
                      <Select.Option
                        key={res.id}
                        name="restaurantName"
                        value={res.id}
                      >
                        {res.restaurantName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="items"
                label="Items"
                rules={[{ required: true, message: "Please select Items!" }]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  tokenSeparators={[","]}
                  onChange={(e, v) => {
                    setItem(v.map((hehe: any) => hehe.children));
                    let selected = test?.items?.filter((i: any) => {
                      return e.includes(i.id.toString());
                    });
                    let price = 0;
                    selected.forEach((item: any) => {
                      price += item.prices;
                    });
                    setOrderAmount(price);
                  }}
                >
                  {test?.items?.map((items: any) => {
                    return (
                      <Option
                        key={items.id}
                      >{`${items.name} Rs. ${items.prices}/-`}</Option>
                    );
                  })}
                </Select>
              </Form.Item> */}
              <Form.Item
                label="Cash u have"
                rules={[{ required: true, message: "Please select Amount!" }]}
              >
                <Input
                  onChange={(e) => {
                    setGivenAmount(+e.target.value);
                  }}
                />
              </Form.Item>
              {alert && (
                <Alert
                  message="Please add Equivalent or Greater Amount"
                  type="error"
                  style={{ marginTop: "5px" }}
                ></Alert>
              )}
              <Form.Item label="Total Item Cost" name="orderAmount">
                <h2 className="price">{orderAmount}</h2>
              </Form.Item>
              <Form.Item label="Cash to Return" name="returnAmount">
                <h2>{returnAmount}</h2>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  onClick={onFormSubmit}
                  style={{ float: "right" }}
                >
                  Place Order
                </Button>
              </Form.Item>
            </Form>
          </Paper>
        </Box>
      </div>
      {/* <Form layout="horizontal" className="form" form={form}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select one country"
        onChange={handleChange}
      >
        {unique.map((uni, idx) => (
          <OptGroup key={idx} label={uni}>
            {staticOrderItems.items
              .filter((item: any) => item.restaurantName === uni)
              .map((item: any, itemIndex: number) => (
                <Option
                  key={`${itemIndex}_${item.restaurantName}`}
                  value={item.value}
                >
                  {`${item.value} , Rs.${item.amount}/-`}
                </Option>
              ))}
          </OptGroup>
        ))}
      </Select>
      <Form.Item>
        <Button
          htmlType="submit"
          onClick={onFormSubmit}
          style={{ float: "right" }}
        >
          Place Order
        </Button>
      </Form.Item>
      </Form> */}
    </>
  );
};

export default Temp;
