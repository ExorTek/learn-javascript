import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ProductList() {
    const [response, setResponse] = useState([]);
    const getData = () => {
        axios.get('http://localhost:3000/products').then(function (response) {
            return setResponse(response?.data);
        });
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{margin:'0'}}>

            <div className="container flex  m-6 justify-end">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product Name
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity Per Unit
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                {
                                    response.map((res) => (
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {res.productName}
                                                        </div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{res.quantityPerUnit}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold p-2 rounded-full bg-green-100 text-green-800">
                                                 ₺ {res.unitPrice}
                                            </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {res.unitsInStock}
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductList;
