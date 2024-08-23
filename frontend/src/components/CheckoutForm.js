import React, { useState } from "react";
import axios from "axios";

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [items, setItems] = useState([
    { itemName: "", quantity: "", price: "" },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const url = `${process.env.REACT_APP_API_URL}`;

  // Handle change in items array
  const handleItemChange = (index, e) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setItems(newItems);
    calculateTotalAmount(newItems);
  };

  // Calculate total amount
  const calculateTotalAmount = (itemsList) => {
    const total = itemsList.reduce((acc, item) => {
      return acc + (item.quantity * item.price || 0);
    }, 0);
    setTotalAmount(total);
  };

  // Add a new item to the order
  const addItem = () => {
    setItems([...items, { itemName: "", quantity: "", price: "" }]);
  };

  // Delete an item from the order
  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotalAmount(newItems);
  };

  // Validate form fields
  const validateForm = () => {
    if (!name || !address || !paymentInfo) {
      alert("Please fill out all required fields.");
      return false;
    }
    // Add further validation if necessary (e.g., regex for card number)
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Only proceed if validation passes

    const formData = {
      name,
      address,
      paymentInfo,
      items,
      totalAmount,
    };

    try {
      const res = await axios.post(url, formData);
      alert("Order placed successfully!");
      setName("");
      setAddress("");
      setPaymentInfo("");
      setItems([{ itemName: "", quantity: "", price: "" }]);
      setTotalAmount(0);
    } catch (err) {
      console.error(err.response.data);
      alert("Error placing order");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Shipping Address:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </label>
        <label>
          Payment Information:
          <input
            type="text"
            value={paymentInfo}
            onChange={(event) => setPaymentInfo(event.target.value)}
            required
          />
        </label>

        <div>
          <label>Items:</label>
          {items.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={item.itemName}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <button type="button" onClick={() => deleteItem(index)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem}>
            Add Another Item
          </button>
        </div>

        <div>
          <label>Total Amount:</label>
          <input type="number" value={totalAmount} readOnly />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
