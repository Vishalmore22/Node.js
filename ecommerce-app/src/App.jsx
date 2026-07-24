import React from "react";
import axios from "axios";

const App = () => {
  const handleSignin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/product/signin",
        {
          email: "vishalmore@gmail.com",
          password: "098765",
        },
        {
          withCredentials: true,
        },
      );
      alert("Login Done!");
    } catch (err) {
      console.log(err.message);
    }
  };
  const getProduct = async () => {
    const res = await axios.get("http://localhost:5000/api/product", {
      withCredentials: true,
    });
    console.log(res.data);
  };
  return (
    <div>
      <button onClick={handleSignin}>Signin</button>
      <button onClick={getProduct}>Get Product</button>
    </div>
  );
};

export default App;
