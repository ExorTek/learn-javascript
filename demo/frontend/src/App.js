import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EditProduct from "./pages/EditProduct";
import 'react-block-ui/style.css';
import ProductDetails from "./pages/ProductDetails";
import 'react-image-crop/dist/ReactCrop.css';
import UploadPhotoModal from "./components/uploadModal";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/product' element={<EditProduct/>}/>
                    <Route path='/product-details' element={<ProductDetails/>}/>
                    <Route path='/modal' element={<UploadPhotoModal/>}/>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
