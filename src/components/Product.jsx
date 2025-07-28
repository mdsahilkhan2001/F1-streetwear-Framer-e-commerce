 
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
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


const Product = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const selectedProduct = products.find(
    (p) => p.name === decodeURIComponent(name || "")
  );

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <Navbar />
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">Product not found!</h2>
          <button
            onClick={() => navigate("/category")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar currentPage="product" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/category")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center max-h-[500px]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="object-contain w-full h-full"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h1>
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">₹{selectedProduct.price}</span>
                <span className="text-xl text-gray-400 line-through ml-3">₹{selectedProduct.originalPrice}</span>
              </div>

              <p className="text-gray-700 mb-6">
                Premium {selectedProduct.name} made from 100% organic cotton. Features sleek developer branding and comfort fit.
              </p>

              <button
                onClick={() => {
                  addToCart(selectedProduct.name);
                  toast.success(`${selectedProduct.name} added to cart! 🛒`);
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Add to Cart - ₹{selectedProduct.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
