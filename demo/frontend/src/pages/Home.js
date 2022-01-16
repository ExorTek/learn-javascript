import React, {useEffect, useState} from 'react';
import Product from "../components/product";
import axiosApi from "../axios/axiosApi";
import {toast} from "react-toastify";

function Home() {
    const [products, setProducts] = useState([]);
    const deleteProduct = (id) => {
        if (!id) {
            toast.error("Product not found")
        }
        axiosApi.delete(`/product/${id}`).then((response) => {
            toast.info(response.message);
            setProducts(products.filter(p => p._id !== id))
        })
    };
    const getProducts = () => {
        axiosApi.get("/product").then((response => {
            setProducts(response.data);
        }))
    };
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div style={{gap: 20}} className="flex mb-6 justify-center max-w-screen-xl mx-auto flex-wrap">
            {products.map((p, i) => (
                <Product key={i} product={p} deleteProduct={deleteProduct}/>
            ))}
        </div>
    );
}

export default Home;
