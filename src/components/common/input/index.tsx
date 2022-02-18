import React, { useState } from "react";
import Header from "../header/index";
import "antd/dist/antd.css";
import { Form, Select, Button, Input, Alert } from "antd";
import { Box, Paper } from "@mui/material";
import Orders from "../localAPI.json";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import fireStore from "../Config/firebase";

interface Orders {
  orders: any;
}

type InputProps = {
  setData: CallableFunction;
  setId: CallableFunction;
};

const InputField: React.FC<InputProps> = ({ setData, setId }) => {
  const [name, setName] = useState<string>("");
  const [test, setTest] = useState<any>(null);
  const [total, setTotal] = useState<any>([]);
  const [item, setItem] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [totalAmount, setTotalAmount] = useState<any>();
  const [alert, setAlert] = useState<boolean>(false);
  const currDate = new Date();

  const newOrders: Orders = Orders;
  const { Option } = Select;
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const onFormSubmit = () => {
    form.validateFields().then((values) => {
      console.log("values = ", values);
      values.price = total;
      values.item = item;
      values.totalAmount = totalAmount;
      setData(values);
      userData().then((data) => navigate(`/order-page?orderId=${data}`));
    });
  };

  const returnAmount = () => {
    const returnCash = amount - total;
    if (amount >= total) {
      setTotalAmount(returnCash);
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  const onRestaurantChange = (value: any, match: any) => {
    const foundRestaurant = newOrders.orders.find(
      (res: any) => +res.id === +value
    );
    setTest(foundRestaurant);
    form.setFieldsValue({
      ["restaurant"]: match.children,
    });
  };

  /* Firebase Initialization*/

  const userData = async () => {
    const db = fireStore;
    let data = await addDoc(collection(db, "User"), {
      Name: name,
      RestaurantName: test.restaurantName,
      Amount: amount,
      Price: total,
      TotalAmount: totalAmount,
      ItemOrder: item,
      Date: currDate,
    });
    return data?.id;
  };

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
              <Form.Item
                name="name"
                label="Select User"
                rules={[
                  { required: true, message: "Please select your Username!" },
                ]}
              >
                <Select onChange={setName}>
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
              <Form.Item
                name="restaurant"
                label="Restaurant"
                rules={[
                  { required: true, message: "Please select Restaurant!" },
                ]}
              >
                <Select onChange={onRestaurantChange}>
                  {(newOrders.orders || []).map((res: any) => {
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
              </Form.Item>
              <Form.Item
                name="amount"
                label="Cash u have"
                rules={[{ required: true, message: "Please select Amount!" }]}
              >
                <Input
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={returnAmount}
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
    </>
  );
};

export default InputField;
