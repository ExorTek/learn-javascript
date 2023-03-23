import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography,} from '@mui/material';
import {EditOutlined, DeleteOutline} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import {useNavigate} from 'react-router-dom';

function Product({product, deleteProduct}) {
    const navigate = useNavigate();
    return (
        <Card sx={{maxWidth: 345, width: 345}} className="mt-5 flex flex-col justify-between">
            <CardMedia
                style={{width: "100%", height: 380, objectFit: "contain"}}
                component="img"
                height="140"
                image={`${product.productImages[0]}`}
                alt="product image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.productName}{' ' + product.gender}
                </Typography>
                <Typography sx={{fontWeight: 'regular'}} variant="body2" color="text.secondary">
                    {product.category?.categoryName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand?.brandName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.price + " ₺"}
                </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
                <Button color="error" endIcon={<DeleteOutline/>} onClick={() => {
                    deleteProduct(product._id)
                }} size="small">
                    Delete
                </Button>
                <Button endIcon={<InfoIcon/>} className="bg-fuchsia-500 absolute" onClick={() => {
                    navigate({
                        pathname: '/product-details',
                        search: `id=${product._id}`,
                    });
                }}>
                    Details
                </Button>
                <Button onClick={() => {
                    navigate({
                        pathname: '/product',
                        search: `id=${product._id}`,
                    });
                }} size="small" endIcon={<EditOutlined/>}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default Product;
