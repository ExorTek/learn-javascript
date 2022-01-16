import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EditProduct from "./pages/EditProduct";
import 'react-block-ui/style.css';
import ProductDetails from "./pages/ProductDetails";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/product' element={<EditProduct/>}/>
                    <Route path='/product-details' element={<ProductDetails/>}/>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
