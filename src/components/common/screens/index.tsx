import React, { useEffect, useState } from "react";
import "./index.css";
import { Card } from "antd";
import { Paper } from "@mui/material";
import "firebase/firestore";
import fireStore from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onSnapshot, query, collection } from "firebase/firestore";

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
  const [orders, setOrders] = useState<any>(null);
  const [allOrders, setAllOrders] = useState<any>(null);

  useEffect(() => {
    const userData = async () => {
      const fs = fireStore;
      const docRef = doc(fs, "User", `${orderId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setOrders(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    userData();
  }, [orderId]);

  useEffect(() => {
    const allData = async () => {
      const fs = fireStore;
      const q = query(collection(fs, "User"));
      const unsubscribe = await onSnapshot(q, (querySnapshot) => {
        const foods: any = [];
        querySnapshot.forEach((doc) => {
          foods.push(doc.data());
          // console.log("data=", doc.data());
        });
        setAllOrders(foods);
      });
    };
    allData();
  }, []);

  return (
    <>
      <div className="navigation">
        <div className="inciter">
          <h1>Inciter Tech</h1>
          <h2>Food Services</h2>
        </div>
      </div>
      <div className="dashboard">
        {/* <Paper elevation={8} className="order-paper">
          <Card className="card" title={orders?.Name} bordered={true}>
            <p>
              <b className="order-label">Restaurant Name: </b>
              <u>
                <b className="order-list">{orders?.RestaurantName}</b>
              </u>
            </p>
            <p>
              <b className="order-label">{orders?.Name} Order: </b>
              <u>
                <b className="order-list">{orders?.ItemOrder}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Total Order Cost: </b>
              <u>
                <b className="order-list">{orders?.Price}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Amount {orders?.Name} have: </b>
              <u>
                <b className="order-list">{orders?.Amount}</b>
              </u>
            </p>
            <p>
              <b className="order-label">Amount To Return: </b>
              <u>
                <b className="order-list">{orders?.TotalAmount}</b>
              </u>
            </p>
          </Card>
        </Paper> */}
        {allOrders &&
          Object.entries(allOrders).map((item: any) => {
            return (
              <Paper elevation={8} className="order-paper" key={item}>
                <Card className="card" title={item?.[1]?.Name} bordered={true}>
                  <p>
                    <b className="order-label">Restaurant Name: </b>
                    <u>
                      <b className="order-list">{item?.[1]?.RestaurantName}</b>
                    </u>
                  </p>
                  <p>
                    <b className="order-label">{item?.[1]?.Name} Order: </b>
                    <u>
                      <b className="order-list">{item?.[1]?.ItemOrder}</b>
                    </u>
                  </p>
                  <p>
                    <b className="order-label">Total Order Cost: </b>
                    <u>
                      <b className="order-list">{item?.[1]?.Price}</b>
                    </u>
                  </p>
                  <p>
                    <b className="order-label">
                      Amount {item?.[1]?.Name} have:{" "}
                    </b>
                    <u>
                      <b className="order-list">{item?.[1]?.Amount}</b>
                    </u>
                  </p>
                  <p>
                    <b className="order-label">Amount To Return: </b>
                    <u>
                      <b className="order-list">{item?.[1]?.TotalAmount}</b>
                    </u>
                  </p>
                </Card>
              </Paper>
            );
          })}
      </div>
    </>
  );
};

export default Dashboard;
