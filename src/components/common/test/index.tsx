import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { Form, Button, Input, Alert } from "antd";
import { Box, Paper } from "@mui/material";
import items from "../itemAPI.json";
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
  const [amount, setAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<any>();
  const [alert, setAlert] = useState<boolean>(false);
  console.log(total);

  const staticOrderItems: OrderItems = items;
  const [form] = Form.useForm();
  const { Option, OptGroup } = Select;

  const unique = Array.from(
    new Set(staticOrderItems.items.map((res: any) => res.restaurantName))
  ).map((value: any) => value);

  const onFormSubmit = () => {
    form.validateFields().then((values) => {
      console.log("values", values);
    });
  };
  useEffect(() => {
    const returnCash = amount - total;
    if (total === 0) {
      return;
    } else if (amount >= total) {
      setTotalAmount(returnCash);
      setAlert(false);
    } else {
      setAlert(true);
    }
  }, [total, amount]);

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
              <Form.Item label="Order">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Restaurant & Order"
                  onChange={(e, v) => {
                    console.log("e", e);
                    console.log("v", v);
                    // setItem(v.map((id: any) => id.children));
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
                    console.log(sumOfOrderItemsPrice);
                    setTotal(sumOfOrderItemsPrice);
                  }}
                >
                  {unique.map((uni, idx) => (
                    <OptGroup key={idx} label={uni}>
                      {staticOrderItems.items
                        .filter((item: any) => item.restaurantName === uni)
                        .map((item: any, itemIndex: number) => (
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
                    setTotal(price);
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
                name="amount"
                label="Cash u have"
                rules={[{ required: true, message: "Please select Amount!" }]}
              >
                <Input
                  onChange={(e) => {
                    setAmount(+e.target.value);
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
              <Form.Item label="Total Item Cost">
                <h2 className="price">{total}</h2>
              </Form.Item>
              <Form.Item label="Cash to Return">
                <h2>{totalAmount}</h2>
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
