 import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Tees", icon: "👕", color: "from-red-400 to-red-600" },
    { name: "Jackets", icon: "🧥", color: "from-blue-400 to-blue-600" },
    { name: "Caps", icon: "🧢", color: "from-green-400 to-green-600" },
    { name: "Accessories", icon: "⌚", color: "from-purple-400 to-purple-600" },
    { name: "Limited", icon: "⭐", color: "from-yellow-400 to-yellow-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar currentPage="home" />

      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">F1 Streetwear Collection</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
             gear up with our exclusive developer-themed streetwear.
          </p>
          <button
            onClick={() => navigate("/category/tees")}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Shop Collection
          </button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our carefully curated collection of F1-inspired streetwear
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => category.name === "Tees" ? navigate("/category/tees") : alert(`${category.name} coming soon!`)}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white text-center transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl`}>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
