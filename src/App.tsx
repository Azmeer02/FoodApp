import React, { useState } from "react";
import InputField from "./components/common/input";
import Dashboard from "./components/common/screens";
import Error from "./components/Error";
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
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
