import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Product = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const rawProduct = data?.data || data;

  const product = rawProduct?.attributes
    ? {
        id: rawProduct.id,
        documentId: rawProduct.documentId,
        ...rawProduct.attributes,
      }
    : rawProduct;

  const imageUrl = useMemo(() => {
    if (!product) return "";

    const image = product?.image;

    const url =
      image?.[0]?.url ||
      image?.url ||
      image?.data?.attributes?.url ||
      image?.data?.[0]?.attributes?.url;

    if (url) {
      return url.startsWith("http") ? url : `http://localhost:1338${url}`;
    }

    return `https://placehold.co/700x820?text=${encodeURIComponent(
      product.name || "Product"
    )}`;
  }, [product]);

  useEffect(() => {
    if (!product?.id) return;

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyWishlisted = storedWishlist.some(
      (item) => item.id === product.id
    );

    setIsWishlisted(alreadyWishlisted);
  }, [product?.id]);

  const buildProductItem = () => {
    return {
      id: product.id,
      documentId: product.documentId,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity,
      image: imageUrl,
    };
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...existingCart, buildProductItem()];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  const handleAddToWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingItem = existingWishlist.find(
      (item) => item.id === product.id
    );

    let updatedWishlist;

    if (existingItem) {
      updatedWishlist = existingWishlist.filter(
        (item) => item.id !== product.id
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
      alert(`${product.name} removed from wishlist`);
    } else {
      updatedWishlist = [...existingWishlist, buildProductItem()];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(true);
      alert(`${product.name} added to wishlist`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070311] text-white px-6 py-16">
        Loading product...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#070311] text-white px-6 py-16">
        No product found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#070311] via-[#100622] to-[#07111f] text-white px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-sm text-white/50">
          <Link to="/" className="hover:text-purple-300 transition">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-purple-300 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full rounded-2xl object-cover max-h-[760px]"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <p className="uppercase tracking-[0.35em] text-cyan-300 text-sm font-bold mb-4">
              Ravesona Product
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-5 bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 text-transparent bg-clip-text">
              {product.name}
            </h1>

            <p className="text-white/60 text-lg mb-8">
              {product.description || "No description available."}
            </p>

            <div className="flex items-center gap-4 mb-10">
              <p className="text-4xl font-extrabold">
                ${Number(product.price || 0).toFixed(2)}
              </p>

              <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-sm font-semibold">
                Available Now
              </span>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-5">Quantity</h2>

              <div className="inline-flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition"
                >
                  -
                </button>

                <span className="text-xl font-bold">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 font-bold transition shadow-lg shadow-purple-900/30"
              >
                Add to Cart
              </button>

              <button
                onClick={handleAddToWishlist}
                className={`px-8 py-4 rounded-2xl border font-bold transition ${
                  isWishlisted
                    ? "border-purple-400/50 bg-purple-500/20 text-purple-200"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            <div className="border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>

              <ul className="space-y-3 text-white/65">
                <li>• Physical collectible product</li>
                <li>• Designed for the Ravesona experience</li>
                <li>• Great for gifting, collecting, and display</li>
                <li>• Stored in your cart until checkout</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-3">Description</h2>
              <p className="text-white/60 leading-relaxed">
                {product.description ||
                  "This product is part of the Ravesona store experience. More details can be added here later."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;