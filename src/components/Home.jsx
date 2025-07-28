 import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Tees", icon: "👕", color: "from-red-400 to-red-600" },
    { name: "Jackets", icon: "🧥", color: "from-blue-400 to-blue-600" },
    { name: "Caps", icon: "🧢", color: "from-green-400 to-green-600" },
    { name: "Accessories", icon: "⌚", color: "from-purple-400 to-purple-600" },
    { name: "Limited", icon: "⭐", color: "from-yellow-400 to-yellow-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar currentPage="home" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-16 sm:py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            F1 Streetwear Collection
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Gear up with our exclusive developer-themed streetwear.
          </p>
          <button
            onClick={() => navigate("/category/tees")}
            className="bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">
              Discover our carefully curated collection of F1-inspired streetwear.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() =>
                  category.name === "Tees"
                    ? navigate("/category/tees")
                    : alert(`${category.name} coming soon!`)
                }
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-4 sm:p-6 text-white text-center transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl`}
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold sm:font-bold text-sm sm:text-lg">
                    {category.name}
                  </h3>
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
