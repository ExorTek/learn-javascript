import React from 'react';
import ProductForm from "../components/productForm";

function EditProduct() {
    return (
        <div
            className="flex-col justify-between pt-10 px-3 md:flex-row form-container bg-gray-50 flex container mx-auto"
            style={{gap: 10, minHeight: "100vh"}}>
            <ProductForm/>
        </div>
    );
}

export default EditProduct;
