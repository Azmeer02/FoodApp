import React, { useState } from "react";
import InputField from "./components/common/input";
import Dashboard from "./components/common/screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { values } from "./components/common/input/index";

interface Props {
  name: string;
  restaurant: string;
  price: number;
  item: string;
  amount: number;
  totalAmount: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<Props | null>(null);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InputField setData={setData} />} />
          <Route path="order-page" element={<Dashboard data={data} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
