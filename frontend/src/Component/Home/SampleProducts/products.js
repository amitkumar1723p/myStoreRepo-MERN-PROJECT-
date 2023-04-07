import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductsAction } from '../../../action/ProductAction'
import ProductItem from './ProductItem'


export default function Products({ productArr }) {
    

 

    return (


        <>
            {productArr && productArr.length > 0  && <>

                <h1 className='categoryheading'> {productArr[0].category}</h1>


                <div className='productCategorybox'>
                <div className="categoryItemBox">
                    {productArr.map((item, index) => {
                       

    
                        return  (
                 

                        
                           <ProductItem key={index} item={item} />
                         )
                        
                      


                    })}

</div>
                </div>
            </>}


        </>
    )
}
