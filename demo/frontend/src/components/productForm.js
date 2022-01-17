import React, {useEffect, useState} from 'react';
import axiosApi from "../axios/axiosApi";
import {useSearchParams, useNavigate} from "react-router-dom";
import Select from 'react-select';
import {toast} from 'react-toastify';
import UploadPhoto from "./upload";
import UploadPhotoModal from "./uploadModal";
import ImagePreviewer from "./imagePreviewer";

function ProductForm() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams('');
    const id = searchParams.get('id');
    const [product, setProduct] = useState({size: [], productImages: []});
    const [listCategories, setListCategories] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [loadingData, setLoadingData] = useState({loading: false, message: ""});
    toast.loading(loadingData);
    //Seçenek 1 : User kendisi kırpar
    const handleFile = (files) => {
        let data = new FormData();
        if (files && files.length > 3) {
            setLoadingData({
                loading: true,
                message: `Image${files.length > 1 ? 's' : ''} downloading, wait...`
            })
            for (let i = 0; i < (files.length > 4 ? 4 : files.length); i++) {
                data.append("files", files[i].originFileObj);
            }
        }
        updateProductImage(data);
    }
    //Seçenek 2 : Belirtilen ölçülerde otomatik kırpar
    // const handleFile = (file) => {
    //     let data = new FormData();
    //     setLoadingData({
    //         loading: true,
    //         message: `Image uploading, wait...`
    //     })
    //     data.append("files", file);
    //     updateProductImage(data);
    // };
    const updateProductImage = (data) => {
        axiosApi({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/product/upload`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        }).then((response) => {
            setLoadingData({loading: false, message: "Uploading images, please wait..."});
            if (response) {
                setTimeout(() => {
                    setProduct({...product, productImages: [...product.productImages, ...response.data]})
                }, 100)
            }
        });
    };
    const getProductById = () => {
        if (id) {
            axiosApi.get(`product/${id}`).then((response) => {
                if (!response.data.size) setProduct({...response.data, size: []})
                else setProduct({...response.data, size: response.data.size.map(si => si._id)});
            });
        }
    };
    const getSize = () => {
        axiosApi.get('/size').then((response) => {
            setListSize(response.data.map((c) => {
                return {label: `${c.size}`, value: `${c._id}`}
            }))
        });
    };
    const getCategory = () => {
        axiosApi.get('/category').then((response) => {
            setListCategories(response.data.map((c) => {
                return {label: `${c.categoryName}`, value: `${c._id}`}
            }))
        });
    };
    const getBrand = () => {
        axiosApi.get('/brand').then((response) => {
            setListBrands(response.data.map((b) => {
                return {label: `${b.brandName}`, value: `${b._id}`}
            }))
        });
    };
    const genders = [
        {label: 'Man', value: 'Man'},
        {label: 'Woman', value: 'Woman'}
    ];
    const saveProduct = () => {
        if (id) {
            axiosApi.put(`/product/${id}`, {
                ...product,
                productName: (product.productName || "").trim()
            }).then((response) => {
                toast.success(response.message);
                setTimeout(() => {
                    navigate({
                        pathname: '/product-details',
                        search: `id=${product._id}`,
                    });
                }, 100);
            });
        } else {
            axiosApi.post(`/product/`, {
                ...product,
                productName: (product.productName || "").trim()
            }).then((response) => {
                toast.success(response.message);
                setTimeout(() => {
                    navigate({
                        pathname: '/product-details',
                        search: `id=${response.data._id}`,
                    });
                }, 100)
            });
        }
    };

    useEffect(() => {
        getProductById();
        getCategory();
        getBrand();
        getSize();
    }, [id]);
    return (
        <>
            <div className="w-2/6 mw-full">
                <div className="flex flex-col mw-full w-3/5 md:w-full">
                    <label className="ml-2 block w-100 font-medium  text-black">Product Name</label>
                    <input
                        onChange={(e) => {
                            setProduct({
                                ...product, productName: e.target.value
                                    .replace(/[^a-züÜiĞğİÖöıIçÇA-Z0-9 ]/g, '')
                                    .replace("  ", ' ')
                            })
                        }}
                        type="text"
                        value={product.productName}
                        defaultValue={product.productName}
                        className="mt-1 p-1 w-100 focus:outline-blue-400 shadow-sm text-lg border-gray-500"
                    />
                    <label className="ml-1 block w-100 font-light  text-gray-400">*Min product name must be 6 char.
                        Please don't use special char. </label>
                </div>
                <div className="flex flex-col mt-4 w-3/5 md:w-full mw-full">
                    <label className="ml-2 block w-100 font-medium  text-black">
                        Price
                    </label>
                    <input
                        onChange={(e) => {
                            setProduct({
                                ...product, price: e.target.value
                                    .replace(/[^0-9]/g, '')
                                    .replace("..", ".")
                            })
                        }}
                        type="text"
                        value={product.price}
                        defaultValue={product.price}
                        className="mt-1 p-1 w-100 focus:outline-blue-400 shadow-sm text-lg border-gray-500"
                    />
                    <label className="ml-1 block w-100 font-light  text-gray-400">*Please just enter numeric
                        value(s). </label>

                </div>
                <div className="flex flex-col md:w-full">
                    <div className="flex flex-row w-full mt-4">
                        <div className="w-full">
                            <label className="ml-2 w-full font-medium text-black" htmlFor="">Category</label>
                            <Select className="w-full"
                                    placeholder={`${product.category ? product.category.categoryName : 'Select...'}`}
                                    onChange={(e) => setProduct({...product, category: e.value})}
                                    options={listCategories}/>
                        </div>
                        <div className="ml-4 w-full">
                            <label className="ml-2 w-full font-medium text-black" htmlFor="">Gender</label>
                            <Select className="w-full"
                                    placeholder={`${product.gender ? product.gender : 'Select...'}`}
                                    onChange={(e) => setProduct({...product, gender: e.value})}
                                    options={genders}/>
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:w-full">
                    <label className="ml-2 w-full font-medium text-black" htmlFor="">Brand</label>
                    <Select
                        className="w-full"
                        placeholder={`${product.brand ? product.brand.brandName : 'Select...'}`}
                        defaultValue={listBrands.find(brand => brand?.label == product.brand?.brandName)}
                        onChange={(e) => setProduct({...product, brand: e.value})}
                        options={listBrands}/>
                </div>
                <div className="mt-4 flex flex-col md:w-full">
                    <label className="ml-2 block w-full font-medium text-black" aria-label="">
                        Description
                    </label>
                    <div className="mt-1">
                              <textarea
                                  defaultValue={product.description}
                                  onChange={(e) => setProduct({...product, description: e.target.value})}
                                  className="shadow-sm mt-2 pl-1 pt-1 w-full block w-full h-80 border border-gray-300 focus:outline-blue-400 rounded-md"
                              />
                    </div>
                </div>
            </div>
            <div className="w-4/6 mw-full flex flex-col">
                <div className="flex flex-row">
                    {/*Seçenek 1 : User kendisi kırpar*/}
                    {!id && (
                        <UploadPhotoModal photoArray={handleFile}/>
                    )}
                    {/*Seçenek 2 : Belirtilen ölçülerde otomatik kırpar*/}
                    {/*<div className="w-4/6 flex flex-row mx-1" style={{gap: 10, maxHeight: 500}}>*/}
                    {/*    <UploadPhoto imageSize="large" className="mh-250" handleFile={handleFile}*/}
                    {/*                 src={product.productImages[0]}/>*/}
                    {/*    <UploadPhoto imageSize="large" className="mh-250" handleFile={handleFile}*/}
                    {/*                 src={product.productImages[1]}/>*/}
                    {/*</div>*/}
                    {/*<div className="w-2/6 mx-1" style={{gap: 10, maxHeight: 500}}>*/}
                    {/*    <UploadPhoto imageSize="small" className="mh-120" handleFile={handleFile}*/}
                    {/*                 src={product.productImages[2]}/>*/}
                    {/*    <UploadPhoto imageSize="small" className="mt-1 mh-120" handleFile={handleFile}*/}
                    {/*                 src={product.productImages[3]}/>*/}
                    {/*</div>*/}
                </div>
                {id && (
                    <label className="ml-2 block w-full font-medium text-black" aria-label="">
                        Uploaded Product Images:
                    </label>
                )}
                {id && (
                    <div className="flex flex-row ">
                        {product.productImages.map((p, i) => (
                            <ImagePreviewer key={i} value={p} src={p}/>
                        ))}
                    </div>
                )}
                <div className="flex flex-col mx-auto w-4/5 my-3" style={{gap: 10}}>
                    <div className="flex flex-col items-center w-full">
                        <Select className="w-full"
                                onChange={(e) => {
                                    if (!product.size.includes(e.value)) {
                                        setProduct({...product, size: [...product.size, e.value]})
                                    }
                                }}
                                options={listSize}/>
                    </div>
                    <div className="flex flex-wrap flex-row" style={{gap: 10}}>
                        {product.size.map((s, i) => (
                            <button key={s} className="shadow-sm relative mt-2 pl-1 h-8 border border-gray-300
                            focus:outline-blue-400 rounded-md hover:bg-blue-100 "
                                    onClick={() => {
                                        product.size.splice(i, 1)
                                        setProduct({...product})
                                    }}
                                    style={{width: "31.8%"}}>
                                {listSize.find(size => size.value == s)?.label}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="h-4 w-4 absolute svg-m text-red-800 -mt-1 -mr-1" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
                <button className="mt-4 w-4/5 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
            hover:text-white py-2 px-4 mx-auto border border-blue-500 hover:border-transparent rounded"
                        onClick={saveProduct}>{id ? 'Update' : 'Save'} Product
                </button>
            </div>
        </>
    );
}

export default ProductForm;
