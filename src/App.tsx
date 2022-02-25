import React, { useState } from "react";
import InputField from "./components/common/input";
import Dashboard from "./components/common/screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

interface Props {
  name: string;
  restaurant: string;
  price: number;
  item: string;
  amount: number;
  totalAmount: number;
  id: string;
}

// interface Props {
//   restaurantName: string;
//   id: number;
//   dish: string;
//   amount: number;
// }

const App: React.FC = () => {
  const [data, setData] = useState<Props | null>(null);
  const [id, setId] = useState<Props | null>(null);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<InputField setData={setData} setId={setId} />}
          />
          <Route
            path="order-page"
            element={<Dashboard data={data} id={id} />}
          />
          {/* <Route path="/" element={<Temp setData={setData} setId={setId} />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
