import React from "react";
import "./PizzaStage.css";

const PizzaStage = ({ orders, moveOrderToNextStage }) => {
  const renderOrders = (stage) =>
    orders
      .filter((order) => order.stage === stage)
      .map((order) => (
        <div
          key={order.id}
          className={`order-card ${
            order.timeSpent >= 180 ? "red-background" : ""
          }`} // Add red background if timer exceeds 3 minutes (180 seconds)
        >
          <h4>{order.id}</h4>
          <p>{formatTime(order.timeSpent)}</p>
          {order.stage !== "Order Picked" && (
            <button onClick={() => moveOrderToNextStage(order.id)}>Next</button>
          )}
        </div>
      ));

  // Helper function to format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds} sec`;
  };

  return (
    <div className="pizza-stages">
      <div className="stage-column">
        <h3>Order Placed</h3>
        {renderOrders("Order Placed")}
      </div>
      <div className="stage-column">
        <h3>Order in Making</h3>
        {renderOrders("Order in Making")}
      </div>
      <div className="stage-column">
        <h3>Order Ready</h3>
        {renderOrders("Order Ready")}
      </div>
      <div className="stage-column">
        <h3>Order Picked</h3>
        {renderOrders("Order Picked")}
      </div>
    </div>
  );
};

export default PizzaStage;
