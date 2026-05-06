import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById } = useProduct();
  const product = useSelector((state) => state.products.product);
//   const user = useSelector((state) => state.auth.user);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetProductById(id);
    setIsLoading(false);
  }, [id]);

  const images = product?.images || [];
  const currentImage =
    images[selectedImageIndex]?.url || "/snitch_editorial_warm.png";
  
  console.log(product);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Top Bar ── */}
        <div className="pt-10 pb-0 flex items-center gap-5 px-8 lg:px-16 xl:px-24">
          <button
            onClick={() => navigate(-1)}
            className="text-lg transition-colors duration-200 leading-none"
            style={{ color: "#B5ADA3" }}
            aria-label="Go back"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#B5ADA3")}
          >
            ←
          </button>
          <span
            className="text-xs font-medium tracking-[0.32em] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch.
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-10">
          {!isLoading && product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* ── Image Gallery ── */}
              <div className="flex flex-col gap-6">
                {/* Main Image */}
                <div
                  className="aspect-3/4 overflow-hidden w-full"
                  style={{ backgroundColor: "#f5f3f0" }}
                >
                  <img
                    src={currentImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={image._id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`shrink-0 w-20 h-24 overflow-hidden transition-all duration-300 border-2 ${
                          selectedImageIndex === index
                            ? "border-[#C9A96E] opacity-100"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: "#f5f3f0" }}
                      >
                        <img
                          src={image.url}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Product Details ── */}
              <div className="flex flex-col gap-8">
                {/* Title & Price */}
                <div className="flex flex-col gap-4">
                  <h1
                    className="text-4xl lg:text-5xl font-light leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#1b1c1a",
                    }}
                  >
                    {product.title}
                  </h1>

                  {/* Gold rule separator */}
                  <div
                    className="w-14 h-px"
                    style={{ backgroundColor: "#C9A96E" }}
                  />

                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-3xl font-light"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "#1b1c1a",
                      }}
                    >
                      {product.price?.currency}{" "}
                      {product.price?.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-3">
                  <span
                    className="text-[10px] uppercase tracking-[0.24em] font-medium"
                    style={{ color: "#C9A96E" }}
                  >
                    Description
                  </span>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#7A6E63" }}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Product Meta Information */}
                <div className="flex flex-col gap-4 pt-4 border-t border-[#e4e2df]">
                  <div className="flex justify-between items-start gap-8">
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-2"
                        style={{ color: "#C9A96E" }}
                      >
                        Product ID
                      </span>
                      <span className="text-sm" style={{ color: "#7A6E63" }}>
                        {product._id}
                      </span>
                    </div>
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-2"
                        style={{ color: "#C9A96E" }}
                      >
                        Listed
                      </span>
                      <span className="text-sm" style={{ color: "#7A6E63" }}>
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 flex-1 sm:flex-auto text-center"
                    style={{
                      backgroundColor: "#1b1c1a",
                      color: "#fbf9f6",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#C9A96E";
                      e.currentTarget.style.color = "#1b1c1a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#1b1c1a";
                      e.currentTarget.style.color = "#fbf9f6";
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 border-2 flex-1 sm:flex-auto text-center"
                    style={{
                      borderColor: "#C9A96E",
                      color: "#C9A96E",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#C9A96E";
                      e.currentTarget.style.color = "#1b1c1a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#C9A96E";
                    }}
                  >
                    Buy now
                  </button>
                </div>

                {/* Seller Info */}
                {/* {product.seller && (
                  <div
                    className="mt-6 pt-6 border-t px-6 py-4"
                    style={{ backgroundColor: "#f5f3f0" }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
                      style={{ color: "#C9A96E" }}
                    >
                      Seller
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#7A6E63" }}
                    >
                      For inquiries about this piece, please contact the seller.
                    </p>
                    <button
                      className="mt-4 py-3 px-6 text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-300"
                      style={{
                        color: "#C9A96E",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1b1c1a")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#C9A96E")
                      }
                    >
                      Contact Seller
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          ) : (
            <div className="py-24 text-center flex flex-col items-center">
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4"
                style={{ color: "#C9A96E" }}
              >
                Loading
              </span>
              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#7A6E63",
                }}
              >
                Fetching product details...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
