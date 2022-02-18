import React, { useEffect, useState } from "react";
import "./index.css";
import { Card } from "antd";
import { Paper } from "@mui/material";
import "firebase/firestore";
import fireStore from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Props {
  name: string;
  restaurant: string;
  price: number;
  item: string;
  amount: number;
  totalAmount: number;
  id: string;
}

type InputProps = {
  data: Props | null;
  id: Props | null;
};

const Dashboard: React.FC<InputProps> = ({ data, id }: any) => {
  const orderId = new URLSearchParams(window.location.search).get("orderId");
  const [allOrders, setAllOrders] = useState<any>(null);
  useEffect(() => {
    const userData = async () => {
      const fs = fireStore;
      const docRef = doc(fs, "User", `${orderId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setAllOrders(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    userData();
  }, [orderId]);

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
          <Card className="card" title={allOrders?.Name} bordered={true}>
            <p>
              <b className="order-label">Restaurant Name: </b>
              <u>
                <b className="order-list">{allOrders?.RestaurantName}</b>
              </u>
            </p>
            <p>
              <b className="order-label">{allOrders?.Name} Order: </b>
              <u>
                <b className="order-list">{allOrders?.ItemOrder}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Total Order Cost: </b>
              <u>
                <b className="order-list">{allOrders?.Price}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Amount {allOrders?.Name} have: </b>
              <u>
                <b className="order-list">{allOrders?.Amount}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Amount To Return: </b>
              <u>
                <b className="order-list">{allOrders?.TotalAmount}</b>
              </u>
            </p>
          </Card>
        </Paper>
      </div>
    </>
  );
};

export default Dashboard;
