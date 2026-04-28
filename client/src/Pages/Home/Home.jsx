import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:1338/api/products?populate=*");
        const json = await res.json();
        console.log("API RESPONSE:", json);
        setProducts(json.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const imageUrl =
      product?.image?.[0]?.url
        ? `http://localhost:1338${product.image[0].url}`
        : product?.image?.url
        ? `http://localhost:1338${product.image.url}`
        : product?.attributes?.image?.data?.[0]?.attributes?.url
        ? `http://localhost:1338${product.attributes.image.data[0].attributes.url}`
        : product?.attributes?.image?.data?.attributes?.url
        ? `http://localhost:1338${product.attributes.image.data.attributes.url}`
        : `https://placehold.co/300x420?text=${encodeURIComponent(product.name || "Product")}`;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          documentId: product.documentId,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1,
          image: imageUrl,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
        <p className="text-2xl font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-10 text-white bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Available Products
        </h1>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-300">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            console.log("PRODUCT:", product);

            const imageUrl =
              product?.image?.[0]?.url
                ? `http://localhost:1338${product.image[0].url}`
                : product?.image?.url
                ? `http://localhost:1338${product.image.url}`
                : product?.attributes?.image?.data?.[0]?.attributes?.url
                ? `http://localhost:1338${product.attributes.image.data[0].attributes.url}`
                : product?.attributes?.image?.data?.attributes?.url
                ? `http://localhost:1338${product.attributes.image.data.attributes.url}`
                : `https://placehold.co/300x420?text=${encodeURIComponent(product.name || "Product")}`;

            return (
              <div
                key={product.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#140d2a] to-[#052333] shadow-xl p-5"
              >
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-[700px] object-cover rounded-2xl mb-6 border border-white/10"
                />

                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>

                <p className="text-gray-300 mb-2 text-xl">
                  {product.description || "No description available."}
                </p>

                <p className="text-white font-medium mb-6 text-2xl">
                  {product.price !== null && product.price !== undefined
                    ? `$${Number(product.price).toFixed(2)}`
                    : "Price coming soon"}
                </p>

                <div className="flex gap-4">
                  <Link
                    to={`/product/${product.documentId}`}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4 rounded-2xl text-2xl hover:opacity-90 transition"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="border border-white/20 px-6 py-4 rounded-2xl text-white text-2xl hover:bg-white/10 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;