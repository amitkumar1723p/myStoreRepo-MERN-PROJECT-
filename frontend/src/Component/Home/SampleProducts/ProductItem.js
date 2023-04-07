import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
export default function ProductItem({ item }) {


    return (

        <>
            <Link to={`/productDetails/${item._id}`} className="underline_none">
                <div className='productItembox'>
                    <img src={item.images[0].url} alt="Products Image" />
                    <p >{item.name} </p>
                    <p>
                        <Rating
                            className='rating'

                            value={item.allratingsAvg ? item.allratingsAvg : 0}

                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </p>

                    {/* <p><StarIcon /></p> */}
                    <p> {item.numOfReviews} Reviews </p>

                    <p className='price'> ₹{item.price}</p>
                </div>
            </Link>
        </>
    )
}