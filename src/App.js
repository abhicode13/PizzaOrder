import React, { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm/OrderForm";
import PizzaStage from "./components/PizzaStage/PizzaStage";
import MainSection from "./components/MainSection/MainSection";

const App = () => {
  const [orders, setOrders] = useState([]);

  // Update timeSpent every second for all orders
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          timeSpent:
            order.stage !== "Order Picked"
              ? order.timeSpent + 1
              : order.timeSpent, 
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addOrder = (pizzaDetails) => {
    const newOrder = {
      id: `Order 00${orders.length + 1}`,
      details: pizzaDetails,
      stage: "Order Placed",
      timeSpent: 0,
      timestamps: {
        placed: new Date(), 
      },
    };
    setOrders([...orders, newOrder]);
  };
  

  const moveOrderToNextStage = (orderId) => {
    const nextStages = [
      "Order Placed",
      "Order in Making",
      "Order Ready",
      "Order Picked",
    ];
  
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              stage: nextStages[nextStages.indexOf(order.stage) + 1] || "Order Picked",
              timeSpent: 0,
              timestamps: {
                ...order.timestamps,
                picked:
                  nextStages[nextStages.indexOf(order.stage) + 1] === "Order Picked"
                    ? new Date()
                    : order.timestamps.picked, 
              },
            }
          : order
      )
    );
  };
  
  

  const cancelOrder = (orderId) => {
    const orderToCancel = orders.find((order) => order.id === orderId);
    if (
      orderToCancel.stage === "Order Ready" ||
      orderToCancel.stage === "Order Picked"
    ) {
      alert("Cannot cancel the order. It is already in 'Order Ready' or beyond.");
      return;
    }
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  return (
    <div>
      <OrderForm addOrder={addOrder} />
      <PizzaStage orders={orders} moveOrderToNextStage={moveOrderToNextStage} />
      <MainSection
        orders={orders}
        moveOrderToNextStage={moveOrderToNextStage}
        cancelOrder={cancelOrder}
      />
    </div>
  );
};

export default App;

