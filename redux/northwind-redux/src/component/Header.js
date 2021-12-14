import React from 'react';

function Header() {
    return (
        <nav className={'flex items-center justify-between bg-slate-500 p-8'}>
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
                <span className={'font-semibold text-xl tracking-tight ml-1'}>E-Commerce</span>
            </div>

            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <p
                        className="font-medium block lg:inline-block lg:mt-0 text-white hover:text-white hover:bg-blue-500 mr-4 p-1 leading-none rounded">
                        Categories
                    </p>
                    <p
                        className="font-medium block lg:inline-block lg:mt-0 text-white hover:text-white hover:bg-blue-500 mr-4 p-1 leading-none rounded">
                        Products
                    </p>
                </div>
                <div>
                    <p
                        className="inline-block px-4 py-2 text-white hover:text-white hover:text-blue-400 mt-4 lg:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </p>
                </div>
            </div>
        </nav>
    );
}

export default Header;
