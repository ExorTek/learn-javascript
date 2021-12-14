import './style/style.css';

import CategoryList from "./component/categories/CategoryList";
import ProductList from "./component/products/ProductList";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
    return (
        <div style={{margin:'0'}}>
            <Header/>
            <CategoryList/>
            <ProductList/>
            <Footer/>
        </div>
    );
}

export default App;
