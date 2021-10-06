import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../common/context/Auth.context";
import axiosInstance from "../../../../common/http";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";
import ReactPaginate from "react-paginate";
import { Row, Col } from "react-bootstrap";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const storedToken = localStorage.getItem("authToken");

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateFormat(dateObj, " mmm dd yyyy @ h:MM:ss TT");
  }
  
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
  };

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/orders/customer/${user._id}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      const data = response.data;
      const slice = data.slice(offset, offset + perPage);

      const postData = slice.map((order) => (
        <Row key={order._id} id="orders-list">
          <Col xs={12} sm={4} lg={4}>
            <h3>{order._id}</h3>
          </Col>
          <Col xs={12} sm={4} lg={2}>
            <h3>{formatDate(order.createdAt)}</h3>
          </Col>
          <Col xs={12} sm={8} lg={2}>
            <p>{order.status}</p>
          </Col>
          <Col xs={12} sm={8} lg={2}>
            <p>{order.totalOrder} €</p>
          </Col>
          <Col xs={12} sm={12} lg={2}>
            <Row>
              <Col xs={6} sm={6} lg={6}>
                <div className="mb-2">
                  <Link
                    to={`/my-account/customer/orders/${order._id}`}
                    className="btn btn-outline-secondary edit-btn w-100"
                  >
                    Order details
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ));

      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    axiosInstance
      .get(`/api/orders/customer/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setOrders(response.data);
        console.log("getOrders", response.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="section">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <p>
            Hello <strong>{user.username}</strong>
          </p>
          <div>
            {orders.length !== 0 && data}
            {!orders.length && <p>No orders found</p>}

            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
