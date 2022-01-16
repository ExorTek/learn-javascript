import React, {useEffect, useState} from 'react';
import axiosApi from "../axios/axiosApi";
import {useSearchParams, useNavigate} from "react-router-dom";
import Select from 'react-select';
import {toast} from 'react-toastify';

function ProductForm() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams('');
    const id = searchParams.get('id');
    const [product, setProduct] = useState({size: []});
    const [listCategories, setListCategories] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [loadingData, setLoadingData] = useState({loading: false, message: ""});
    toast.loading(loadingData);
    const handleCheckbox = (event) => {
        let value = event.target.value
        let index = product.size.findIndex(size => size._id == value)
        if (index == -1) {
            product.size.push({_id: value, size: listSize.find(size => size._id == value).size});
        } else {
            product.size = product.size.splice(index, 1)
        }
        setProduct({...product})
    };
    const handleFile = (event) => {
        let data = new FormData();
        if (event.target.files && event.target.files.length > 0) {
            let files = event.target.files
            setLoadingData({
                loading: true,
                message: `Image${files.length > 1 ? 's' : ''} downloading, wait...`
            })
            for (let i = 0; i < (files.length > 4 ? 4 : files.length); i++) {
                data.append("files", files[i]);
            }
        }
        updateProductImage(data);
        event.preventDefault();
    };
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
                    setProduct({...product, productImages: response.data})
                }, 100)
            }
        });
    };
    const getProductById = () => {
        if (id) {
            axiosApi.get(`product/${id}`).then((response) => {
                if (!response.data.size) setProduct({...response.data, size: []})
                else setProduct(response.data);
            });
        }
    };
    const getSize = () => {
        axiosApi.get('/size').then((response) => {
            setListSize(response.data);
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
            <div className="w-3/6 mw-full">
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
                                    defaultValue={listCategories.find(category => category?.label == product.category?.categoryName)}
                                    onChange={(e) => setProduct({...product, category: e.value})}
                                    options={listCategories}/>
                        </div>
                        <div className="ml-4 w-full">
                            <label className="ml-2 w-full font-medium text-black" htmlFor="">Gender</label>
                            <Select className="w-full"
                                    defaultValue={product.gender}
                                    onChange={(e) => setProduct({...product, gender: e.value})}
                                    options={genders}/>
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:w-full">
                    <label className="ml-2 w-full font-medium text-black" htmlFor="">Brand</label>
                    <Select
                        className="w-full"
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
            <div className="w-3/6 mw-full flex flex-col">
                <div className="flex flex-row" style={{gap: 10}}>
                    <div style={{gap: 10}}
                         className="flex  flex-col items-center w-3/6 border-2 border-gray-300 border-dashed rounded-md">
                        {product && product.productImages && product.productImages[0] && (
                            <img className="object-contain w-full" style={{maxHeight: 232}}
                                 src={product.productImages[0]}
                                 alt="product image"/>
                        )}
                        {!(product && product.productImages && product.productImages[0]) && (
                            <div className={'mt-12 w-full'}>
                                <svg className="mx-auto w-full h-12 text-gray-400" stroke="currentColor" fill="none"
                                     viewBox="0 0 48 48" aria-hidden="true">
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm items-center justify-center text-gray-600 flex-col w-full">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative text-center items-center flex flex-col justify-center w-full cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <label htmlFor={"file"} className=" w-full">Upload images</label>
                                        <input multiple id="file" onChange={handleFile}
                                               className="sr-only text-center  w-full"
                                               type="file" accept=".jpg, .jpeg, .png" name="file"/>
                                    </label>
                                    <p className="pl-1 w-full text-center">click and upload</p>
                                </div>
                                <p className="text-xs text-gray-500 text-center w-full">PNG, JPG, JPEG</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`w-3/6 items-center flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md`}>
                        {product && product.productImages && product.productImages[1] && (
                            <img className="object-contain w-full" style={{maxHeight: 232}}
                                 src={product.productImages[1]}
                                 alt="product image"
                            />
                        )
                        }
                        <div
                            className={`text-center my-12  ${product && product.productImages && product.productImages[1] && ("invisible")}`}>
                            <svg className="mx-auto w-full h-12 text-gray-400" stroke="currentColor" fill="none"
                                 viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="flex flex-row mt-4" style={{gap: 10}}>
                    <div
                        className={`  w-3/6 items-center flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md `}>
                        {
                            product && product.productImages && product.productImages[2] && (
                                <img className="object-contain w-full" style={{maxHeight: 232}}
                                     src={product.productImages[2]}
                                     alt="product image"
                                />
                            )
                        }
                        <div
                            className={`text-center my-12  ${product && product.productImages && product.productImages[2] && ("invisible")}`}>
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className={`w-3/6 items-center flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md`}>
                        {
                            product && product.productImages && product.productImages[3] && (
                                <img className="object-contain w-full" style={{maxHeight: 232}}
                                     src={product.productImages[3]}
                                     alt="product image"
                                />
                            )
                        }
                        <div
                            className={`text-center my-12  ${product && product.productImages && product.productImages[3] && ("invisible")}`}>
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <p className="font-light text-gray-400 ml-1">*Please select 4 product image.</p>
                <div>
                    <div>
                        <div className="mt-4 max-w-md flex flex-col">
                            <label className="ml-2 font-medium text-black" htmlFor="">Size</label>
                            <div className="flex ml-1 flex-row">
                                {listSize.map((s, i) => (
                                    <label className="mr-3" key={i} htmlFor="size">
                                        <input
                                            // defaultChecked={product.size?.find(size => size._id == s._id)}
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            onChange={(e) => handleCheckbox(e)} name="size"
                                            value={s._id} id="size"
                                            checked={product.size?.find(size => size._id == s._id)}
                                            type="checkbox"/>
                                        {s.size}
                                    </label>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <button className="mt-4 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4
            border border-blue-500 hover:border-transparent rounded"
                        onClick={saveProduct}>{id ? 'Update' : 'Save'} Product
                </button>
            </div>
        </>
    );
}

export default ProductForm;
