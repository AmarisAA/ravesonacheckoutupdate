import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const moveToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#070311] via-[#100622] to-[#07111f] text-white px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-sm text-white/50">
          <Link to="/" className="hover:text-purple-300 transition">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-purple-300 font-semibold">Wishlist</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="uppercase tracking-[0.35em] text-cyan-300 text-sm font-bold mb-3">
              Ravesona
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 text-transparent bg-clip-text">
              My Wishlist
            </h1>
          </div>

          <Link
            to="/"
            className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition"
          >
            Continue Shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>

            <p className="text-white/60 mb-8">
              Add products to your wishlist so you can save them for later.
            </p>

            <Link
              to="/"
              className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 font-bold transition shadow-lg shadow-purple-900/30"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl hover:border-purple-400/40 transition"
              >
                <Link to={`/product/${item.documentId || item.id}`}>
                  <img
                    src={
                      item.image ||
                      `https://placehold.co/400x500?text=${encodeURIComponent(
                        item.name || "Product"
                      )}`
                    }
                    alt={item.name}
                    className="w-full h-[360px] object-cover rounded-2xl mb-5"
                  />
                </Link>

                <div className="space-y-3">
                  <p className="uppercase tracking-[0.25em] text-cyan-300 text-xs font-bold">
                    Saved Product
                  </p>

                  <Link to={`/product/${item.documentId || item.id}`}>
                    <h2 className="text-2xl font-extrabold hover:text-purple-300 transition">
                      {item.name}
                    </h2>
                  </Link>

                  <p className="text-white/55 line-clamp-2">
                    {item.description || "No description available."}
                  </p>

                  <p className="text-3xl font-extrabold">
                    ${Number(item.price || 0).toFixed(2)}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      onClick={() => moveToCart(item)}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 font-bold transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-5 py-3 rounded-2xl border border-red-400/40 text-red-300 hover:bg-red-500/10 font-bold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;