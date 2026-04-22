import { useDispatch } from "react-redux"


import { setsellerProducts, setProducts, setProduct } from "../state/product.slice.js";
import { addProductVariant, createProduct, getAllProducts, getProductById, getSellerProducts } from "../services/products.api.js";

export const useProduct = () => {
    const dispatch = useDispatch();

    async function handleCreateProducts(formData) {
        const data = await createProduct(formData)
        return data.product
    }

    async function handleGetSellerProduct() {
        const data = await getSellerProducts();
        dispatch(setsellerProducts(data.products));
        return data.products
    }

    async function handleGetAllProducts() {
        const data = await getAllProducts();
        dispatch(setProducts(data.products));
    }

    async function handleGetProductById(id) {
        const data = await getProductById(id);
        dispatch(setProduct(data.product))
        return data.products;
    }

    async function handleAddProductVariant(id, newProductVariant) {
      const data = await addProductVariant(id, newProductVariant);
      return data;
    }

    return {
      handleCreateProducts,
      handleGetSellerProduct,
      handleGetAllProducts,
      handleGetProductById,
      handleAddProductVariant,
    };
}