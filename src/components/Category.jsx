
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  { name: "JavaScript Tee", price: 249, originalPrice: 499, image: "https://m.media-amazon.com/images/I/71M8Pmi2EBL.jpg" },
  { name: "Node.js Tee", price: 299, originalPrice: 399, image: "https://rukminim2.flixcart.com/image/704/844/kl8ccy80/t-shirt/p/6/y/xxl-node-js-black-dudeme-original-imagyegmb4xdsehh.jpeg?q=90" },
  { name: "React.js Tee", price: 199, originalPrice: 449, image: "https://m.media-amazon.com/images/I/51ojrq2Jz5L._UY1100_.jpg" },
  { name: "MongoDB Tee", price: 249, originalPrice: 499, image: "https://www.teez.in/cdn/shop/products/Mongodb-T-Shirt-2.jpg?v=1571504799" },
  { name: "SQL Tee", price: 299, originalPrice: 399, image: "https://shopdeworld.com/image/cache/catalog/mens/mens-i-love-heart-sql-t-shirt-black-500x500.jpg" },
  { name: "Full Stack Tee", price: 199, originalPrice: 449, image: "https://www.teez.in/cdn/shop/products/Full-StackPython-Developer-T-Shirt-For-Men-3_large.jpg?v=1586929460" },

    { name: "Python Tee", price: 279, originalPrice: 459, image: "https://m.media-amazon.com/images/I/61oTp0Tl4OL._SY741_.jpg" },
  { name: "HTML5 Tee", price: 229, originalPrice: 399, image: "https://images.meesho.com/images/products/538865105/ks1ec_1200.jpg?width=512" },
  { name: "CSS3 Tee", price: 239, originalPrice: 399, image: "https://www.oblugift.com/wp-content/uploads/2024/10/CSS-tshirt-baby-blue-front.webp" },
  { name: "GitHub Tee", price: 269, originalPrice: 449, image: "https://shopdeworld.com/image/cache/catalog/mens/mens-github-t-shirt-black-500x500.jpg" },
  { name: "Linux Tee", price: 299, originalPrice: 499, image: "https://www.teez.in/cdn/shop/products/Be-Cool-Use-Linux-T-Shirt-For-Men-1.jpg?v=1586841921" },
  { name: "VS Code Tee", price: 259, originalPrice: 439, image: "https://www.teez.in/cdn/shop/products/Visual-Studio-Code-T-Shirt-1_large.jpg?v=1571504796" },
];


const Category = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product.name);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar currentPage="category" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Premium Tees Collection</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our signature F1-inspired tees crafted with premium materials
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative h-64 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/product/${encodeURIComponent(product.name)}`)}
                      className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
