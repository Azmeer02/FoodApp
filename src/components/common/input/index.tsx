import React, { useState, useEffect } from "react";

import { Form, Button, Input, Alert, Select, Spin } from "antd";
import "antd/dist/antd.css";

import { Box, Paper } from "@mui/material";

import { addDoc, collection } from "firebase/firestore";
import fireStore from "../Config/firebase";

import { useNavigate } from "react-router-dom";

import items from "../itemAPI.json";
import Header from "../header/index";

import "./index.css";

interface OrderItem {
  restaurantName: string;
  id: number;
  dish: string;
  amount: number;
}

interface OrderItems {
  items: Array<OrderItem>;
}

type InputProps = {
  setData: CallableFunction;
  setId: CallableFunction;
};

const InputField: React.FC<InputProps> = ({ setData, setId }) => {
  const [selectedItems, setSelectedItems] = useState<OrderItems>();
  const [givenAmount, setGivenAmount] = useState<number>(0);
  const [orderAmount, setOrderAmount] = useState<number>(0);
  const [returnAmount, setReturnAmount] = useState<any>();
  const [alert, setAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const currDate = new Date();

  const staticOrderItems: OrderItems = items;
  const [form] = Form.useForm();
  const { Option, OptGroup } = Select;
  let navigate = useNavigate();

  const unique = Array.from(
    new Set(staticOrderItems.items.map((res: any) => res.restaurantName))
  ).map((value: any) => value);

  const onFormSubmit = async () => {
    form.validateFields().then(async (values) => {
      values.givenAmount = givenAmount;
      values.items = selectedItems?.items;
      values.date = currDate;
      const db = fireStore;
      addDoc(collection(db, "User"), values)
        .then((values: any) => {
          values.returnAmount = returnAmount;
          values.orderAmount = orderAmount;
          navigate(`/order-page`);
          setData(values);
        })
        .catch((err) => {
          console.log(err, "Error");
        });
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
      <div>
        <Header />
      </div>
      <div className="body">
        <Box>
          <Paper
            elevation={12}
            className="paper"
            style={{ border: "5px solid orange", padding: "20px" }}
          >
            <h1 className="order">Place Your Order Here...</h1>
            <Form layout="horizontal" className="form" form={form}>
              <Spin spinning={loading}>
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
                    <Select.Option value="Hashir Khan">
                      Hashir Khan
                    </Select.Option>
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
                <Form.Item
                  label="Order"
                  name="items"
                  rules={[
                    { required: true, message: "Please select your Order!" },
                  ]}
                >
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
                      setOrderAmount(sumOfOrderItemsPrice);
                    }}
                  >
                    {unique.map((uni, idx) => (
                      <OptGroup key={idx} label={uni}>
                        {staticOrderItems.items
                          .filter((item: any) => item.restaurantName === uni)
                          .map((item: any) => (
                            <Option key={item.id} value={item.id}>
                              {`${uni} , ${item.dish} , Rs.${item.amount}/-`}
                            </Option>
                          ))}
                      </OptGroup>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Cash u have"
                  rules={[
                    { required: true, message: "Please select your Username!" },
                  ]}
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
                <Form.Item label="Total Item Cost">
                  <h2 className="price">{orderAmount}</h2>
                </Form.Item>
                <Form.Item label="Cash to Return">
                  <h2>{returnAmount}</h2>
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    style={{ float: "right" }}
                    onClick={() => {
                      onFormSubmit();
                      setLoading(true);
                    }}
                  >
                    Place Order
                  </Button>
                </Form.Item>
              </Spin>
            </Form>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default InputField;
