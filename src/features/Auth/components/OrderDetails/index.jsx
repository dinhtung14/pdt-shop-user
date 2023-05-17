import orderApi from 'api/orderApi';
import Loading from 'components/Loading/Loading';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './OrderDetails.scss';
import { MdPermIdentity, MdRoom, MdPhone, MdMailOutline } from 'react-icons/md';
import { PAYMENT_METHOD_TYPE } from 'constants/global';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function OrderDetails(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState({});
    const { orderId } = useParams();

    const getStatus = (status) => {
        let content = "";
        switch (status) {
          case "1":
            content = "Order success";
            break;
          case "2":
            content = "Confirmed";
            break;
          case "3":
            content = "Preparing goods";
            break;
          case "4":
            content = "Successful delivery";
            break;
          case "5":
            content = "Delivering";
            break;
          case "6":
            content = "Canceled";
            break;
          default:
            content = "Confirmed";
            break;
        }
        return content;
      };

      const getColorStatus = (status) => {
        let color = "";
        let bgcColor = "";
        switch (status) {
          case "1":
            color = "#0f3460";
            bgcColor = "rgb(230, 230, 230)";
            break;
          case "2":
            color = "rgb(240, 140, 46)";
            bgcColor = "rgb(241, 200, 162)";
            break;
          case "3":
            color = "rgb(3, 184, 175)";
            bgcColor = "rgb(213, 241, 240)";
            break;
          case "4":
            color = "#f142d1";
            bgcColor = "#b6a2b2";
            break;
          case "5":
            color = "#33d067";
            bgcColor = "rgb(181, 246, 219)";
            break;
          case "6":
            color = "red";
            bgcColor = "rgb(247, 128, 122)";
            break;
          default:
            color = "#0f3460";
            bgcColor = "#ccc";
            break;
        }
        return { color, bgcColor };
      };    

    useEffect(() => {
        const loadOrder = async () => {
            try {
                setIsLoading(true);
                const orderData = await orderApi.getOrder(orderId);
                console.log("orderData", orderData);

                if(orderData.success) {
                    setOrder(orderData.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        loadOrder();
    }, [orderId]);

    const body = isLoading ? <Loading backgroundColor="black" /> : 
        !order ? (
            <div className="order-details">
                <p>This order does not exist. <Link to='/'><i>Go to the Shop</i></Link></p>
            </div>
        ) : (
            <div className="order-details">
                <div className='back' onClick={() => history.goBack()}><AiOutlineArrowLeft style={{ marginRight: 5 }}/> Back</div>
                <div className="order-details__main">
                    <h3>Order details</h3>
                    <div className="order-details__main__table">
                        <Container fluid="true" >
                            <Row>
                                <Col md="6">
                                    <p>PRODUCT</p>
                                </Col>
                                <Col md="6">
                                    <p>TOTAL</p>
                                </Col>
                            </Row>
                            {
                                order.orderDetails.map(function(detail) {
                                    return (
                                        <Row key={detail._id}>
                                            <Col md="6">
                                                <p>{detail.product.name} <b>× {detail.quantity}</b></p>
                                            </Col>
                                            <Col md="6">
                                                <p><b>${detail.product.price * ((100 - detail.product.discount) / 100) * detail.quantity}</b></p>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>SUBTOTAL</p>
                                </Col>
                                <Col md="6">
                                    <p>${order.totalAmount}</p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>SHIPPING</p>
                                </Col>
                                <Col md="6">
                                    <p>Free shipping</p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>PAYMENT METHOD</p>
                                </Col>
                                <Col md="6">
                                    <p>{PAYMENT_METHOD_TYPE[order.payment_method]}</p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>PAYMENT STATUS</p>
                                </Col>
                                <Col md="6">
                                    <p>
                                        {order.statusPayment === Number(1) ? "Unpaid" : order.statusPayment === Number(2) ? "Paid" : "Unpaid"}        
                                    </p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>ORDER STATUS</p>
                                </Col>
                                <Col md="6">
                                    <p style={{
                                        color: getColorStatus(order.status).color
                                    }}>
                                        {getStatus(order.status)}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>TOTAL</p>
                                </Col>
                                <Col md="6">
                                    <p>${order.totalAmount}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                
                <div className="order-details__address">
                    <h3>Billing address</h3>
                    <div className="order-details__address__card">
                        <p><MdPermIdentity/> {order.user.fullname || order.user.username}</p>
                        <p><MdRoom/> {order.address}</p>
                        <p><MdPhone/> {order.phoneNumber}</p>
                        <p><MdMailOutline/> {order.user.email}</p>
                    </div>
                </div>
            </div>
        )

    return body;
}

export default OrderDetails;