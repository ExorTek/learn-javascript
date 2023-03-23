import React from 'react';
import Header from "../components/header";
import Footer from "../components/footer";

function MainLayout(props) {
    return (
        <div className="flex-col flex align-baseline">
            <Header/>
            <div style={{minHeight: '100vh'}}>{props.children}</div>
            <Footer/>
        </div>
    );
}

export default MainLayout;