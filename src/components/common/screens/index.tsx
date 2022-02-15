import React from "react";
import "./index.css";
import { Card } from "antd";
import { Paper } from "@mui/material";

interface Props {
  name: string;
  restaurant: string;
  price: number;
  item: string;
  amount: number;
  totalAmount: number;
}

type InputProps = {
  data: Props | null;
};

const Dashboard: React.FC<InputProps> = ({ data }) => {
  console.log(data);

  return (
    <>
      <div className="navigation">
        <div className="inciter">
          <h1>Inciter Tech</h1>
          <h2>Food Services</h2>
        </div>
      </div>
      <div className="dashboard">
        <Paper elevation={8} className="order-paper">
          <Card className="card" title={data?.name} bordered={true}>
            <p>
              <b className="order-label">Restaurant Name: </b>
              <u>
                <b className="order-list">{data?.restaurant}</b>
              </u>
            </p>
            <p>
              <b className="order-label">{data?.name} Order: </b>
              <u>
                <b className="order-list">{data?.item}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Total Order Cost: </b>
              <u>
                <b className="order-list">{data?.price}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Amount {data?.name} have: </b>
              <u>
                <b className="order-list">{data?.amount}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Amount To Return: </b>
              <u>
                <b className="order-list">{data?.totalAmount}</b>
              </u>
            </p>
          </Card>
        </Paper>
      </div>
    </>
  );
};

export default Dashboard;
