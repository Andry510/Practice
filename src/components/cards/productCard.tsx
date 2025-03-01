
//UI
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { FaRegEdit } from "react-icons/fa";
import { ImagesComponent } from '../images';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

//Interfaces
import { IProduct } from "../../interfaces/products";

interface Props {
    product: IProduct;
    handleOnClick: () => void;
}

export const ProductCardComponent = ({ product, handleOnClick }: Props) => {

    //Functions
    const truncateDescription = (description: string, maxLength: number): string => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };


    const { images, title, description } = product;

    return (
        <Card className="h-full overflow-hidden shadow-lg rounded-3xl hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <CardMedia component="div" className="h-64 relative">
                    <ImagesComponent
                        url={images[0]}
                        iconName={'IoImagesOutline'}
                    />
                </CardMedia>
            </div>

            <CardContent className="p-5 flex flex-col h-[calc(100%-16rem)]">
                <div className="mb-2 flex justify-between items-start">
                    <Typography variant="h5" component="h2" className="font-bold">
                        {title}
                    </Typography>                    
                </div>            
                <Typography variant="body2" color="text.secondary" className="mb-4 line-clamp-3">
                    {
                        truncateDescription(description, 100)
                    }
                </Typography>

                <div className="mt-auto pt-4">
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleOnClick}
                        startIcon={<FaRegEdit className="h-4 w-4" />}
                        className="bg-primary hover:bg-primary/90 text-white py-2"
                    >
                        Editar Producto
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
