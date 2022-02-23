import React from "react";
import { Select } from "antd";
import { Form, Button } from "antd";
import items from "../itemAPI.json";

interface Orders {
  items: any;
}

const Temp = () => {
  const newOrders: Orders = items;
  console.log(newOrders);
  const [form] = Form.useForm();
  const { Option, OptGroup } = Select;

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  const onFormSubmit = () => {
    form.validateFields().then((values) => {
      console.log("values = ", values);
    });
  };

  // const hostel: any = [];
  // (newOrders.items || []).forEach((res: any, i: number) => {
  //   if (i === 0) {
  //     hostel.push(res.restaurantName);
  //   } else if (!hostel.includes(res.restaurantName)) {
  //     hostel.push(res.restaurantName);
  //   }
  // });

  const unique = Array.from(
    new Set(newOrders.items.map((res: any) => res.restaurantName))
  ).map((value: any) => value);
  console.log(unique);

  return (
    <>
      <Form layout="horizontal" className="form" form={form}></Form>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select one country"
        onChange={handleChange}
        // optionLabelProp="label"
      >
        {unique.map((uni, idx) => (
          <OptGroup key={idx} label={uni}>
            {newOrders.items
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
    </>
  );
};

export default Temp;
