import React, { useEffect, useState } from "react";

import { Card } from "antd";
import { Paper } from "@mui/material";

import "firebase/firestore";
import fireStore from "../Config/firebase";
import { onSnapshot, query, collection } from "firebase/firestore";

import "./index.css";
// import { doc, getDoc } from "firebase/firestore";

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
  // const orderId = new URLSearchParams(window.location.search).get("orderId");
  // const [orders, setOrders] = useState<any>(null);
  const [allOrders, setAllOrders] = useState<any>(null);

  /* For Specific User */
  // useEffect(() => {
  //   const userData = async () => {
  //     const fs = fireStore;
  //     const docRef = doc(fs, "Orders", `${orderId}`);
  //     const docSnap = await getDoc(docRef);
  //     setOrders(docSnap.data());
  //   };
  //   userData();
  // }, [orderId]);

  /* For Whole Collection */
  useEffect(() => {
    const allData = async () => {
      const fs = fireStore;
      const q = query(collection(fs, "Orders"));
      await onSnapshot(q, (querySnapshot) => {
        const foods: any = [];
        querySnapshot.forEach((doc) => {
          foods.push(doc.data());
        });
        setAllOrders(foods);
      });
    };
    allData();
  }, []);

  const calcTotalCost = (items: any) => {
    let sumOfAmount = 0;
    items.forEach((price: any) => {
      let sumOfPrice = price.amount * price.quantity;
      sumOfAmount += sumOfPrice;
    });
    return sumOfAmount;
  };

  return (
    <>
      <div className="navigation">
        <div className="inciter">
          <h1>Inciter Tech</h1>
          <h2>Food Services</h2>
        </div>
      </div>
      <div className="dashboard">
        {(allOrders || []).map((item: any, index: number) => {
          return (
            <Paper elevation={8} className="order-paper" key={index}>
              <Card className="card" title={item?.name} bordered={true}>
                <p>
                  <b className="order-label">{item?.name} Order: </b>
                  <u>
                    <b className="order-list">
                      {(item?.items || []).map((res: any, index: number) => {
                        return (
                          <div key={index}>
                            <li>{`${res.restaurantName} : ${res?.dish} , Quantity : ${res.quantity}`}</li>
                          </div>
                        );
                      })}
                    </b>
                  </u>
                </p>
                <p>
                  <b className="order-label">Total Order Cost: </b>
                  <u>
                    <b className="order-list">{calcTotalCost(item?.items)}</b>
                  </u>
                </p>
                <p>
                  <b className="order-label">Amount {item?.name} have: </b>
                  <u>
                    <b className="order-list">{item?.givenAmount}</b>
                  </u>
                </p>
                <p>
                  <b className="order-label">Amount To Return: </b>
                  <u>
                    <b className="order-list">
                      {" "}
                      {item?.givenAmount - calcTotalCost(item?.items)}
                    </b>
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
