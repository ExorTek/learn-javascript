import React from 'react';

function Footer() {
    return (
        <footer className="relative bg-slate-500 text-white pt-8 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl fonat-semibold text-blueGray-700">E-Commerce</h4>
                        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                            Buy Buy Buy Buy Buy Buy Buy!
                        </h5>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >About
                                            Us</p>
                                    </li>
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >Blog</p>
                                    </li>
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >Github</p>
                                    </li>
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >Free
                                            Products</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >MIT
                                            License</p>
                                    </li>
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >Terms &amp; Conditions</p>
                                    </li>
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >Privacy
                                            Policy</p>
                                    </li>
                                    <li>
                                        <p className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                        >Contact
                                            Us</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-6 border-blueGray-300">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Copyright © <span id="get-current-year">2021</span> Mehmet
                                <p
                                    className="text-blueGray-500 hover:text-blueGray-800">Hakları Saklıdır</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
