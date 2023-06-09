import orderApi from 'api/orderApi';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import timeString from 'utils/timeString';
import './OrderList.scss';

function OrderList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [listOrder, setListOrder] = useState([]);
    const match = useRouteMatch();

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

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true);
                const getUserOrderData = await orderApi.getOrderUser();
                
                if(getUserOrderData.success) {
                    setListOrder(getUserOrderData.orders);
                } else {
                    console.log(getUserOrderData.message);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }        
        };

        fetchOrder();
    }, [])

    const body = isLoading ? <Loading backgroundColor="black" /> : 
        !listOrder.length ? (
            <div className="order-list">
                <p>You don't have any orders yet. <Link to='/'><i>Go to the Shop</i></Link> </p>
            </div>
        ) : (
            <div className="order-list">
                <Container fluid="true">
                    <Row className="order-list__head">
                        <Col md="2">
                            <p>ORDER</p>
                        </Col>
                        <Col md="3">
                            <p>STATUS</p>
                        </Col>
                        <Col md="2">
                            <p>DATE</p>
                        </Col>
                        <Col md="3">
                            <p>TOTAL</p>
                        </Col>
                        <Col md="2">
                            <p>ACTIONS</p>
                        </Col>
                    </Row>
    
                    {
                        listOrder.map(function(order, index) {
                            const quantity = order.orderDetails.reduce(function(acc, cur) {
                                return acc + cur.quantity;
                            }, 0);
    
                            return (
                                <Row key={order._id} >
                                    <Col md="2" className="order-list__index">
                                        <p>#{index + 1}</p>
                                    </Col>
                                    <Col md="3" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                                        <div
                                            style={{
                                                width: "80%",
                                                backgroundColor: getColorStatus(order.status).bgcColor,
                                                color: getColorStatus(order.status).color,
                                                borderRadius: 20,
                                                textAlign: "center",
                                                padding: "3px",
                                            }}
                                        >
                                            {getStatus(order.status)}
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <p>{timeString(order.createdAt)}</p>
                                    </Col>
                                    <Col md="3">
                                        <p>${order.totalAmount} for {quantity} { quantity > 1 ? 'items' : 'item'}</p>
                                    </Col>
                                    <Col md="2">
                                        <p><Link to={`${match.url}/${order._id}`} style={{ textDecoration: "underline", color: "#2222ef"}}>View</Link></p>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Container>
            </div>
        );
    
    return body;
}

export default OrderList;