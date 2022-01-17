import React, {useEffect, useState} from 'react';
import axiosApi from "../axios/axiosApi";
import {useSearchParams, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function ProductDetails() {
    const [searchParams, setSearchParams] = useSearchParams('');
    const id = searchParams.get('id');
    const [product, setProduct] = useState('');
    const navigate = useNavigate()
    const getProductById = () => {
        if (id) {
            axiosApi.get(`/product/${id}`).then((response) => {
                setProduct(response.data);
                if (!response.data) {
                    toast.info("Product not found")
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                }
            });
        }
    };
    useEffect(() => {
        getProductById()
    }, [id]);
    if (!product) return <></>
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
                <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                    <h6 className="font-xs  lg:leading-9 leading-7 text-gray-800 mt-4">Home
                        /{' ' + product.category?.categoryName}</h6>
                    <h2
                        className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{product.productName}</h2>
                    <h4
                        className="font-semibold lg:text-3xl text-2xl lg:leading-9 leading-7 text-gray-800 mt-4">{product.brand?.brandName}</h4>
                    <p className=" font-normal text-base leading-6 text-gray-600 mt-7">{product.description}</p>
                    <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">{product.price + ' ₺'}</p>
                    <button
                        className="mt-4 mb-5 w-full border-2 border-b-blue-500 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4border border-blue-500 hover:border-transparent rounded">
                        Add To Cart
                    </button>
                </div>
                <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                    <div className=" w-full lg:w-8/12 flex justify-center items-center">
                        {product.productImages && product.productImages[0] && (
                            <img src={`${product.productImages[0]}`} alt="Product Image"/>
                        )}
                    </div>
                    <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                        {product.productImages.slice(1, product.productImages.length).map((imageUrl, i) => (
                            <div className=" flex justify-center items-center py-4" key={i}>
                                <img src={imageUrl} alt="Product Image"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
