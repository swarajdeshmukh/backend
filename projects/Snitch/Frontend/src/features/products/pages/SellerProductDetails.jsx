import React, { useEffect, useState, useRef } from "react";
import { useProduct } from "../hooks/useProduct";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const SellerProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.product);
  const { handleGetProductById, handleAddProductVariant } = useProduct();
  // Variant form state
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantForm, setVariantForm] = useState({
    attributes: {},
    stock: "",
    price: {
      amount: "",
      currency: "INR",
    },
    selectedImages: [],
    uploadedImages: [], // preview strings for new uploads
    uploadedFiles: [], // actual File objects for upload
  });
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [editingVariantId, setEditingVariantId] = useState(null);
  const [variants, setVariants] = useState([]);
  const MAX_IMAGES_PER_VARIANT = 7;

  useEffect(() => {
    handleGetProductById(id);
  }, [id]);

  // Initialize variants from product data when it loads
  useEffect(() => {
    if (product?.variants) {
      setVariants(product.variants);
    }
  }, [product?.variants]);

  const handleAddAttribute = () => {
    if (attributeKey && attributeValue) {
      setVariantForm((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attributeKey]: attributeValue,
        },
      }));
      setAttributeKey("");
      setAttributeValue("");
    }
  };

  const handleRemoveAttribute = (key) => {
    setVariantForm((prev) => {
      const newAttributes = { ...prev.attributes };
      delete newAttributes[key];
      return { ...prev, attributes: newAttributes };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = variantForm.uploadedImages.length + files.length;

    if (totalImages > MAX_IMAGES_PER_VARIANT) {
      alert(
        `You can upload maximum ${MAX_IMAGES_PER_VARIANT} images per variant`,
      );
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVariantForm((prev) => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, reader.result],
          uploadedFiles: [...prev.uploadedFiles, file],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveUploadedImage = (index) => {
    setVariantForm((prev) => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  const handleToggleImage = (imageUrl) => {
    setVariantForm((prev) => {
      const isSelected = prev.selectedImages.includes(imageUrl);
      return {
        ...prev,
        selectedImages: isSelected
          ? prev.selectedImages.filter((url) => url !== imageUrl)
          : [...prev.selectedImages, imageUrl],
      };
    });
  };

  const handleAddVariant = async () => {
    // Check if at least one attribute is provided
    if (Object.keys(variantForm.attributes).length === 0) {
      alert("Please add at least one attribute");
      return;
    }

    try {
      const formData = new FormData();

      variantForm.uploadedFiles.forEach((file) => {
        formData.append("images", file);
      });

      formData.append(
        "selectedImages",
        JSON.stringify(variantForm.selectedImages),
      );
      formData.append("stock", variantForm.stock || 0);
      formData.append("priceAmount", variantForm.price.amount || "");
      formData.append("priceCurrency", variantForm.price.currency || "INR");
      formData.append("attributes", JSON.stringify(variantForm.attributes));

      const data = await handleAddProductVariant(id, formData);
      const newVariant = data?.variant ?? data;

      if (editingVariantId) {
        setVariants((prev) =>
          prev.map((v) => (v._id === editingVariantId ? newVariant : v)),
        );
        setEditingVariantId(null);
      } else {
        setVariants((prev) => [...prev, newVariant]);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to add variant. Please try again.");
      return;
    }

    // Reset form
    setVariantForm({
      attributes: {},
      stock: "",
      price: { amount: "", currency: "INR" },
      selectedImages: [],
      uploadedImages: [],
      uploadedFiles: [],
    });
    setShowVariantForm(false);
  };

  const handleEditVariant = (variant) => {
    setVariantForm({
      attributes: variant.attributes || {},
      stock: String(variant.stock || ""),
      price: variant.price || { amount: "", currency: "INR" },
      selectedImages: [],
      uploadedImages: variant.images?.map((img) => img.url) || [],
      uploadedFiles: [],
    });
    setEditingVariantId(variant._id);
    setShowVariantForm(true);
  };

  const handleDeleteVariant = (variantId) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      setVariants((prev) => prev.filter((v) => v._id !== variantId));
    }
  };

  const handleUpdateStock = (variantId, newStock) => {
    setVariants((prev) =>
      prev.map((v) =>
        v._id === variantId ? { ...v, stock: Number(newStock) } : v,
      ),
    );
  };

  const handleUpdatePrice = (variantId, newPrice) => {
    setVariants((prev) =>
      prev.map((v) =>
        v._id === variantId
          ? {
              ...v,
              price: { ...v.price, amount: Number(newPrice) },
            }
          : v,
      ),
    );
  };

  return (
    <>
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
          {product ? (
            <>
              {/* ── Product Header ── */}
              <div className="mb-12">
                <h1
                  className="text-5xl font-light leading-tight mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1b1c1a",
                  }}
                >
                  {product.title}
                </h1>
                <div
                  className="w-14 h-px mb-4"
                  style={{ backgroundColor: "#C9A96E" }}
                />
                <p
                  className="text-base leading-relaxed max-w-2xl"
                  style={{ color: "#7A6E63" }}
                >
                  {product.description}
                </p>
              </div>

              {/* ── Main Product Overview ── */}
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b"
                style={{ borderColor: "#e4e2df" }}
              >
                <div className="lg:col-span-1">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-full aspect-3/4 object-cover"
                    style={{ backgroundColor: "#f5f3f0" }}
                  />
                </div>

                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-2"
                      style={{ color: "#C9A96E" }}
                    >
                      Base Price
                    </span>
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

                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-3"
                      style={{ color: "#C9A96E" }}
                    >
                      Product Images
                    </span>
                    <div className="flex gap-3 flex-wrap">
                      {product.images?.map((img) => (
                        <div
                          key={img._id}
                          className="w-20 h-24 overflow-hidden shrink-0"
                          style={{ backgroundColor: "#f5f3f0" }}
                        >
                          <img
                            src={img.url}
                            alt="product"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-2"
                      style={{ color: "#C9A96E" }}
                    >
                      Total Variants
                    </span>
                    <span
                      className="text-2xl font-light"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "#1b1c1a",
                      }}
                    >
                      {variants.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Variants Section ── */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2
                    className="text-3xl font-light"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#1b1c1a",
                    }}
                  >
                    Variants
                  </h2>
                  <button
                    onClick={() => {
                      setShowVariantForm(!showVariantForm);
                      setEditingVariantId(null);
                      if (showVariantForm) {
                        setVariantForm({
                          attributes: {},
                          stock: "",
                          price: { amount: "", currency: "INR" },
                          selectedImages: [],
                          uploadedImages: [],
                        });
                      }
                    }}
                    className="py-3 px-6 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300"
                    style={{
                      backgroundColor: "#1b1c1a",
                      color: "#fbf9f6",
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
                    {showVariantForm ? "Cancel" : "+ Add Variant"}
                  </button>
                </div>

                {/* ── Add/Edit Variant Form ── */}
                {showVariantForm && (
                  <div
                    className="mb-12 p-8 rounded-sm"
                    style={{ backgroundColor: "#f5f3f0" }}
                  >
                    <h3
                      className="text-2xl font-light mb-6"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "#1b1c1a",
                      }}
                    >
                      {editingVariantId ? "Edit Variant" : "Create New Variant"}
                    </h3>

                    {/* ── Select Images ── */}
                    <div className="mb-8">
                      <label
                        className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-4"
                        style={{ color: "#C9A96E" }}
                      >
                        Images for Variant (Optional - Max{" "}
                        {MAX_IMAGES_PER_VARIANT})
                      </label>

                      {/* Uploaded Images */}
                      {variantForm.uploadedImages.length > 0 && (
                        <div className="mb-6">
                          <span
                            className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
                            style={{ color: "#C9A96E" }}
                          >
                            Uploaded Images ({variantForm.uploadedImages.length}
                            /{MAX_IMAGES_PER_VARIANT})
                          </span>
                          <div className="flex gap-4 flex-wrap">
                            {variantForm.uploadedImages.map((img, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={img}
                                  alt={`uploaded ${index}`}
                                  className="w-24 h-32 object-cover"
                                  style={{ backgroundColor: "#fbf9f6" }}
                                />
                                <button
                                  onClick={() =>
                                    handleRemoveUploadedImage(index)
                                  }
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm leading-none transition-colors"
                                  style={{ backgroundColor: "#C9A96E" }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      "#E8D4B4")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      "#C9A96E")
                                  }
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upload Input */}
                      {variantForm.uploadedImages.length <
                        MAX_IMAGES_PER_VARIANT && (
                        <div className="mb-6">
                          <label
                            className="block py-6 px-4 border-2 border-dashed text-center cursor-pointer transition-all"
                            style={{
                              borderColor: "#C9A96E",
                              backgroundColor: "#fbf9f6",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#f5f3f0";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#fbf9f6";
                            }}
                          >
                            <span
                              className="text-sm font-medium"
                              style={{ color: "#C9A96E" }}
                            >
                              Click to upload or drag images
                            </span>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}

                      {/* Product Images Selection */}
                      {product.images && product.images.length > 0 && (
                        <div>
                          <span
                            className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3"
                            style={{ color: "#C9A96E" }}
                          >
                            Or Select from Product Images
                          </span>
                          <div className="flex gap-4 flex-wrap">
                            {product.images?.map((img) => (
                              <button
                                key={img._id}
                                onClick={() => handleToggleImage(img.url)}
                                className={`w-24 h-32 overflow-hidden transition-all duration-300 border-2 ${
                                  variantForm.selectedImages.includes(img.url)
                                    ? "border-[#C9A96E] opacity-100"
                                    : "border-[#e4e2df] opacity-60 hover:opacity-100"
                                }`}
                                style={{ backgroundColor: "#fbf9f6" }}
                              >
                                <img
                                  src={img.url}
                                  alt="variant option"
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Attributes ── */}
                    <div className="mb-8">
                      <label
                        className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-4"
                        style={{ color: "#C9A96E" }}
                      >
                        Attributes (e.g., Size, Color)
                      </label>

                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          placeholder="Attribute name (e.g., Size)"
                          value={attributeKey}
                          onChange={(e) => setAttributeKey(e.target.value)}
                          className="flex-1 py-3 px-4 border-2 outline-none transition-all"
                          style={{
                            borderColor: "#e4e2df",
                            backgroundColor: "#fbf9f6",
                            color: "#1b1c1a",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "#C9A96E")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "#e4e2df")
                          }
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., M)"
                          value={attributeValue}
                          onChange={(e) => setAttributeValue(e.target.value)}
                          className="flex-1 py-3 px-4 border-2 outline-none transition-all"
                          style={{
                            borderColor: "#e4e2df",
                            backgroundColor: "#fbf9f6",
                            color: "#1b1c1a",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "#C9A96E")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "#e4e2df")
                          }
                        />
                        <button
                          onClick={handleAddAttribute}
                          className="py-3 px-6 text-[11px] uppercase tracking-[0.25em] font-medium transition-all"
                          style={{
                            backgroundColor: "#1b1c1a",
                            color: "#fbf9f6",
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
                          Add
                        </button>
                      </div>

                      {/* Display added attributes */}
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(variantForm.attributes).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="py-2 px-4 rounded-sm flex items-center gap-3"
                              style={{
                                backgroundColor: "#fbf9f6",
                                border: "1px solid #e4e2df",
                              }}
                            >
                              <span
                                className="text-sm"
                                style={{ color: "#1b1c1a" }}
                              >
                                {key}: <strong>{value}</strong>
                              </span>
                              <button
                                onClick={() => handleRemoveAttribute(key)}
                                className="text-lg leading-none transition-colors"
                                style={{ color: "#B5ADA3" }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.color = "#C9A96E")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.color = "#B5ADA3")
                                }
                              >
                                ×
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* ── Stock & Price ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div>
                        <label
                          className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-2"
                          style={{ color: "#C9A96E" }}
                        >
                          Stock Quantity (Optional)
                        </label>
                        <input
                          type="number"
                          value={variantForm.stock}
                          onChange={(e) =>
                            setVariantForm((prev) => ({
                              ...prev,
                              stock: e.target.value,
                            }))
                          }
                          placeholder="0"
                          className="w-full py-3 px-4 border-2 outline-none transition-all"
                          style={{
                            borderColor: "#e4e2df",
                            backgroundColor: "#fbf9f6",
                            color: "#1b1c1a",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "#C9A96E")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "#e4e2df")
                          }
                        />
                      </div>

                      <div>
                        <label
                          className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-2"
                          style={{ color: "#C9A96E" }}
                        >
                          Price Amount (Optional)
                        </label>
                        <input
                          type="number"
                          value={variantForm.price.amount}
                          onChange={(e) =>
                            setVariantForm((prev) => ({
                              ...prev,
                              price: { ...prev.price, amount: e.target.value },
                            }))
                          }
                          placeholder="0"
                          className="w-full py-3 px-4 border-2 outline-none transition-all"
                          style={{
                            borderColor: "#e4e2df",
                            backgroundColor: "#fbf9f6",
                            color: "#1b1c1a",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "#C9A96E")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "#e4e2df")
                          }
                        />
                      </div>

                      <div>
                        <label
                          className="text-[10px] uppercase tracking-[0.24em] font-medium block mb-2"
                          style={{ color: "#C9A96E" }}
                        >
                          Currency (Optional)
                        </label>
                        <select
                          value={variantForm.price.currency}
                          onChange={(e) =>
                            setVariantForm((prev) => ({
                              ...prev,
                              price: {
                                ...prev.price,
                                currency: e.target.value,
                              },
                            }))
                          }
                          className="w-full py-3 px-4 border-2 outline-none transition-all"
                          style={{
                            borderColor: "#e4e2df",
                            backgroundColor: "#fbf9f6",
                            color: "#1b1c1a",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderColor = "#C9A96E")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "#e4e2df")
                          }
                        >
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="JPY">JPY</option>
                        </select>
                      </div>
                    </div>

                    {/* ── Form Actions ── */}
                    <div className="flex gap-4">
                      <button
                        onClick={handleAddVariant}
                        className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 flex-1"
                        style={{
                          backgroundColor: "#1b1c1a",
                          color: "#fbf9f6",
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
                        {editingVariantId ? "Update Variant" : "Create Variant"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Variants List ── */}
                {variants.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {variants.map((variant) => (
                      <div
                        key={variant._id}
                        className="flex flex-col"
                        style={{ backgroundColor: "#f5f3f0" }}
                      >
                        {/* Variant Image */}
                        <div
                          className="aspect-3/4 overflow-hidden mb-4"
                          style={{ backgroundColor: "#fbf9f6" }}
                        >
                          <img
                            src={
                              variant.images?.[0]?.url ||
                              product.images?.[0]?.url
                            }
                            alt="variant"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Variant Details */}
                        <div className="p-6 flex flex-col gap-4">
                          {/* Attributes */}
                          {Object.keys(variant.attributes || {}).length > 0 && (
                            <div>
                              <span
                                className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-2"
                                style={{ color: "#C9A96E" }}
                              >
                                Attributes
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(variant.attributes).map(
                                  ([key, value]) => (
                                    <span
                                      key={key}
                                      className="text-xs px-3 py-1"
                                      style={{
                                        backgroundColor: "#fbf9f6",
                                        color: "#1b1c1a",
                                        border: "1px solid #e4e2df",
                                      }}
                                    >
                                      {key}: {value}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          {/* Stock */}
                          <div>
                            <span
                              className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-2"
                              style={{ color: "#C9A96E" }}
                            >
                              Stock
                            </span>
                            <div className="flex gap-2 items-center">
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleUpdateStock(variant._id, e.target.value)
                                }
                                className="flex-1 py-2 px-3 border-2 text-sm outline-none"
                                style={{
                                  borderColor: "#e4e2df",
                                  backgroundColor: "#fbf9f6",
                                  color: "#1b1c1a",
                                }}
                                onFocus={(e) =>
                                  (e.currentTarget.style.borderColor =
                                    "#C9A96E")
                                }
                                onBlur={(e) =>
                                  (e.currentTarget.style.borderColor =
                                    "#e4e2df")
                                }
                              />
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#1b1c1a", minWidth: "40px" }}
                              >
                                {variant.stock} pcs
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div>
                            <span
                              className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-2"
                              style={{ color: "#C9A96E" }}
                            >
                              Price {!variant.price?.amount && "(Not Set)"}
                            </span>
                            <div className="flex gap-2 items-center">
                              <input
                                type="number"
                                value={variant.price?.amount || ""}
                                onChange={(e) =>
                                  handleUpdatePrice(variant._id, e.target.value)
                                }
                                placeholder="Set price"
                                className="flex-1 py-2 px-3 border-2 text-sm outline-none"
                                style={{
                                  borderColor: "#e4e2df",
                                  backgroundColor: "#fbf9f6",
                                  color: "#1b1c1a",
                                }}
                                onFocus={(e) =>
                                  (e.currentTarget.style.borderColor =
                                    "#C9A96E")
                                }
                                onBlur={(e) =>
                                  (e.currentTarget.style.borderColor =
                                    "#e4e2df")
                                }
                              />
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#1b1c1a", minWidth: "50px" }}
                              >
                                {variant.price?.currency || "INR"}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div
                            className="flex gap-2 mt-4 pt-4 border-t"
                            style={{ borderColor: "#e4e2df" }}
                          >
                            <button
                              onClick={() => handleEditVariant(variant)}
                              className="flex-1 py-2 text-[10px] uppercase tracking-[0.25em] font-medium transition-all"
                              style={{
                                backgroundColor: "#1b1c1a",
                                color: "#fbf9f6",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#C9A96E";
                                e.currentTarget.style.color = "#1b1c1a";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#1b1c1a";
                                e.currentTarget.style.color = "#fbf9f6";
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteVariant(variant._id)}
                              className="flex-1 py-2 text-[10px] uppercase tracking-[0.25em] font-medium transition-all border-2"
                              style={{
                                borderColor: "#C9A96E",
                                color: "#C9A96E",
                                backgroundColor: "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#C9A96E";
                                e.currentTarget.style.color = "#1b1c1a";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                e.currentTarget.style.color = "#C9A96E";
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center flex flex-col items-center">
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4"
                      style={{ color: "#C9A96E" }}
                    >
                      No Variants Yet
                    </span>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "#7A6E63",
                      }}
                    >
                      Start by creating your first variant to offer different
                      options for this product.
                    </p>
                  </div>
                )}
              </div>
            </>
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

export default SellerProductDetails;
