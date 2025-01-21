import React, { useState } from "react";
import "./OrderForm.css";

const OrderForm = ({ addOrder }) => {
  const [pizzaDetails, setPizzaDetails] = useState({
    type: "Select",
    size: "Select",
    base: "Select",
  });

  const handleChange = (e) => {
    setPizzaDetails({ ...pizzaDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are selected
    if (
      pizzaDetails.type === "Select" ||
      pizzaDetails.size === "Select" ||
      pizzaDetails.base === "Select"
    ) {
      alert("Please select all fields before placing an order!");
      return;
    }

  
    console.log("Order Placed:", pizzaDetails);
    addOrder(pizzaDetails);

    // Reset the form to default placeholder values
    setPizzaDetails({ type: "Select", size: "Select", base: "Select" });
  };

  return (
    <div className="pizza-order-container">
      <h1>Order Your Pizza</h1>
      <form onSubmit={handleSubmit} className="pizza-form">
        <label htmlFor="type">Type:</label>
        <select
          name="type"
          id="type"
          value={pizzaDetails.type}
          onChange={handleChange}
        >
          <option value="Select" disabled>
            Select
          </option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <label htmlFor="size">Size:</label>
        <select
          name="size"
          id="size"
          value={pizzaDetails.size}
          onChange={handleChange}
        >
          <option value="Select" disabled>
            Select
          </option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>

        <label htmlFor="base">Base:</label>
        <select
          name="base"
          id="base"
          value={pizzaDetails.base}
          onChange={handleChange}
        >
          <option value="Select" disabled>
            Select
          </option>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
