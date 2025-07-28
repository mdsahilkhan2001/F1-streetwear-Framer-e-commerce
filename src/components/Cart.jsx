 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  CreditCard,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const productData = {
  "JavaScript Tee": {
    image: "https://m.media-amazon.com/images/I/71M8Pmi2EBL.jpg",
    price: 249,
  },
  "Node.js Tee": {
    image: "https://rukminim2.flixcart.com/image/704/844/kl8ccy80/t-shirt/p/6/y/xxl-node-js-black-dudeme-original-imagyegmb4xdsehh.jpeg?q=90",
    price: 299,
  },
  "React.js Tee": {
    image: "https://m.media-amazon.com/images/I/51ojrq2Jz5L._UY1100_.jpg",
    price: 199,
  },
  "MongoDB Tee": {
    image: "https://www.teez.in/cdn/shop/products/Mongodb-T-Shirt-2.jpg?v=1571504799",
    price: 249,
  },
  "SQL Tee": {
    image: "https://shopdeworld.com/image/cache/catalog/mens/mens-i-love-heart-sql-t-shirt-black-500x500.jpg",
    price: 299,
  },
  "Python Tee": {
    image: "https://m.media-amazon.com/images/I/61oTp0Tl4OL._SY741_.jpg",
    price: 279,
  },
  "HTML5 Tee": {
    image: "https://images.meesho.com/images/products/538865105/ks1ec_1200.jpg?width=512",
    price: 229,
  },
  "CSS3 Tee": {
    image: "https://www.oblugift.com/wp-content/uploads/2024/10/CSS-tshirt-baby-blue-front.webp",
    price: 239,
  },
  "GitHub Tee": {
    image: "https://shopdeworld.com/image/cache/catalog/mens/mens-github-t-shirt-black-500x500.jpg",
    price: 269,
  },
  "Linux Tee": {
    image: "https://www.teez.in/cdn/shop/products/Be-Cool-Use-Linux-T-Shirt-For-Men-1.jpg?v=1586841921",
    price: 299,
  },
  "VS Code Tee": {
    image: "https://www.teez.in/cdn/shop/products/Visual-Studio-Code-T-Shirt-1_large.jpg?v=1571504796",
    price: 259,
  },
};

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [items, setItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const itemMap = new Map();
    cartItems.forEach((itemName) => {
      const existing = itemMap.get(itemName);
      if (existing) {
        existing.qty += 1;
      } else {
        itemMap.set(itemName, {
          name: itemName,
          qty: 1,
          price: productData[itemName]?.price || 199,
          image: productData[itemName]?.image || "https://via.placeholder.com/150",
        });
      }
    });
    setItems(Array.from(itemMap.values()));
  }, [cartItems]);

  const updateQty = (index, delta) => {
    const updated = [...items];
    updated[index].qty += delta;
    if (updated[index].qty <= 0) {
      updated.splice(index, 1);
    }
    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    toast.info("Item removed from cart");
  };

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleCheckout = async () => {
    const email = prompt("Enter your email to confirm checkout:");
    if (!email) return;
    setIsCheckingOut(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("type", "checkout");
    formData.append("cartItems", items.map(i => `${i.name} x ${i.qty}`).join(", "));
    formData.append("total", total);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyUto-wa2f2odyn25Rk1TZBRVZ3poGCXGI67H2Gcu_y1x1ekwvEqdi3jQGvXUniARub8Q/exec",
        { method: "POST", body: formData }
      );
      const result = await res.json();
      if (result.result === "success") {
        toast.success("✅ Order placed successfully!");
        clearCart();
        setItems([]);
        navigate("/");
      } else {
        toast.error("❌ Failed to record order.");
      }
    } catch (err) {
      toast.error("⚠️ Network error. Try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      setItems([]);
      toast.info("🧹 Cart cleared");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-2xl mx-auto py-20 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <button
            onClick={() => navigate("/category")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700"
          >
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative w-full sm:w-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover sm:rounded-l-xl rounded-t-xl sm:rounded-tr-none"
                  />
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    x{item.qty}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-100 rounded">
                      <button onClick={() => updateQty(index, -1)} className="px-3 py-1 hover:bg-gray-200"><Minus /></button>
                      <span className="px-4">{item.qty}</span>
                      <button onClick={() => updateQty(index, 1)} className="px-3 py-1 hover:bg-gray-200"><Plus /></button>
                    </div>
                    <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700"><X /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>GST (18%)</span><span>₹{tax}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>₹{total}</span></div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" /> Checkout
                </>
              )}
            </button>
            <button
              onClick={handleClearCart}
              className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" /> Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
