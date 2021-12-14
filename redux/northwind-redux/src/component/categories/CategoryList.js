import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";


function CategoryList() {
    const [categories, setCategory] = useState([]);

    const getData = () => {
        axios.get('http://localhost:3000/categories').then(function (response) {
            return setCategory(response?.data);
        });
    }
    useEffect(() => {
        getData();
    }, []);
    const category = useSelector(state => state.category.currentCategory);

    return (

        <div style={{margin:'0'}}>
            <div className="container justify-start m-6">
                <div className="">
                    <div style={{maxWidth:'20%'}}>
                        <div className="shadow overflow-hidden border-b border-gray-200 max-w-xs">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category Name
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="min-w-full ">
                                                {
                                                    categories.map((cat) => (
                                                        <div onClick={() => {
                                                            if (!category === {}) {
                                                                category.push(cat.id);
                                                            }
                                                        }}
                                                             className="text-sm p-1 font-medium text-gray-900 border-b">
                                                            {cat.categoryName}
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
