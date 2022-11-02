import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import {
    FaMinus, FaPlus, FaCartPlus, FaRegHeart,
    FaAngleRight, FaChevronLeft, FaChevronRight,
    FaFacebook, FaTwitter, FaPinterest
} from 'react-icons/fa'
import './productDetail.scss'
import { Link } from 'react-router-dom'
import cartApi from 'api/cartApi'


export default function ProductDetail({product}) {

    const [countCart, setCountCart] = useState(1);
    const [imgIndex, setImgIndex] = useState(0);
    const [listImage ] = useState(() => {
        return product?.listImage?.length ? product.listImage : product.thumb;
    });

    const cartClick = async () => {
        try {
            const cart = await cartApi.add({ productId: product._id, quantity: countCart })
            console.log(cart);

        } catch (error) {
            console.log(error);
        }   
    }

    const handleChangeImageIndex = (index) => {
        if (index >= listImage.length)
            return setImgIndex(0);
        if (index < 0)
            return setImgIndex(listImage.length - 1);
        
        setImgIndex(index);
    }
    
    return (
        <div className="ProductDetail">
            <div className="product-leave">
                <Link to="/" className="product-link">Home</Link>
                <FaAngleRight className="arrow"/>
                <Link to="/" className="product-link">Man</Link>
                <FaAngleRight className="arrow"/>
                <span className="product-name-first">{product.name}</span>
            </div>
            <div className="product-detail-container">
                <div className="product-gallery flex">
                    <div className="product-small" >
                        {listImage.map((item,index) => {
                            return (
                                <div
                                    className={imgIndex === index ? "product-small-item product-small-item-active" : "product-small-item"}
                                    key={item}
                                    onClick={() => setImgIndex(index)}
                                >
                                    <img 
                                        src={item} 
                                        alt="" 
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="product-slider">
                        {listImage.map((item, index) => {
                        return (
                            <div className="product-big" style={{ left: `calc(${index - imgIndex}*100%)`}} key={index}>
                                <div className="product-big-item" >
                                    <img
                                        src={item}
                                        alt="" 
                                    />
                                </div>
                            </div>
                            )
                        })}
                        <div 
                            className="change-product left"
                            onClick={() => handleChangeImageIndex(imgIndex - 1)}
                        >
                            <FaChevronLeft/>
                        </div>
                        <div 
                            className="change-product right"
                            onClick={() => handleChangeImageIndex(imgIndex + 1)}
                        >
                            <FaChevronRight/>
                        </div>
                    </div>
                </div>

                <div className="product-info-detail">
                    <div className="product-info-title">
                       {product.name}
                    </div>
                    <div className="product-info-des">
                        {product.description}
                    </div>
                    <div className="product-info-vote">
                        <ReactStars
                            value={product.evaluation}
                            size={20}
                            activeColor="#ffd700"
                            className="rating"
                        />
                        <p>(0 customer reviews)</p>
                    </div>
                    <div className="product-info-price">
                        ${product.price}.00
                    </div>

                    <div className="product-info-cart">
                        <div className="count-cart">
                            <div 
                                className="count-cart-item left"
                                onClick={() => { if(countCart >1 ) setCountCart(countCart-1)}}
                            >
                                <FaMinus/>
                            </div>
                            <div className="count-cart-item">
                                <input 
                                    type="text" 
                                    value={countCart}
                                    onChange={(e) => setCountCart(e.target.value)}
                                />
                            </div>
                            <div 
                                className="count-cart-item right"
                                onClick={() => setCountCart(countCart+1)}
                            >
                                <FaPlus/>
                            </div>
                        </div>
                        <div className="product-info-addtocart" onClick={cartClick}>
                            <FaCartPlus/>
                            <span>Add to cart</span>
                        </div>
                        <div className="product-info-wishlist">
                            <FaRegHeart/>
                        </div>
                    </div>

                    <div className="product-info-line"></div>
                    <div className="product-info-cate">
                        <span>Category: </span>
                        <span>Man</span>
                    </div>
                    <div className="product-info-line"></div>
                    <div className="product-info-social">
                        <i><FaFacebook className="icon"/>facebook</i>
                        <i><FaTwitter className="icon"/>twitter</i>
                        <i><FaPinterest className="icon"/>pinterest</i>
                    </div>

                </div>
            </div>
            {/* <ProductReview/> */}
        </div>
    )
}
