import { useDispatch } from "react-redux"


import { setsellerProducts } from "../state/product.slice.js";
import { createProduct, getSellerProducts } from "../services/products.api.js";

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

    return { handleCreateProducts, handleGetSellerProduct };
}