import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  setsellerProducts,
  setProducts,
  setProduct,
} from "../state/product.slice.js";
import {
  addProductVariant,
  createProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
  updateProductVariant,
  deleteProductVariant,
} from "../services/products.api.js";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProducts = useCallback(async (formData) => {
    const data = await createProduct(formData);
    return data.product;
  }, []);

  const handleGetSellerProduct = useCallback(async () => {
    const data = await getSellerProducts();
    dispatch(setsellerProducts(data.products));
    return data.products;
  }, [dispatch]);

  const handleGetAllProducts = useCallback(async () => {
    const data = await getAllProducts();
    dispatch(setProducts(data.products));
  }, [dispatch]);

  const handleGetProductById = useCallback(
    async (id) => {
      const data = await getProductById(id);
      dispatch(setProduct(data.product));
      return data.products;
    },
    [dispatch],
  );

  const handleAddProductVariant = useCallback(async (id, newProductVariant) => {
    const data = await addProductVariant(id, newProductVariant);
    return data;
  }, []);

  const handleUpdateProductVariant = useCallback(
    async (id, variantId, updateData) => {
      const data = await updateProductVariant(id, variantId, updateData);
      return data;
    },
    [],
  );

  const handleDeleteProductVariant = useCallback(async (id, variantId) => {
    const data = await deleteProductVariant(id, variantId);
    return data;
  }, []);

  return {
    handleCreateProducts,
    handleGetSellerProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleAddProductVariant,
    handleUpdateProductVariant,
    handleDeleteProductVariant,
  };
};
