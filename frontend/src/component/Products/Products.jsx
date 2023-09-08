import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from "@material-ui/core/Typography";
// import { useAlert } from "react-alert";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/backgroundHome1.jpg";

import bg3 from "../../Assets/backgroundHome2.jpg";
import bg4 from "../../Assets/productBanner/NEW_ARRIVALS.jpg";

const stylelap = [
  "Laptop văn phòng",
  "Laptop Gaming",
  "Laptop học tập",
  "Laptop sinh viên",
  "Laptop đồ họa",
];
const loai = [
  "DELL",
  "HP",
  "MSI",
  "ASUS",
  "LENOVO",
  "ACER",
  "MACBOOK",
  "SURFACE",
  "XIAOMI",
  "LG",
  "HUAWEI",
  "GIGABYTE",
  "FUJITSU",
];


const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");


  const [openLap, setOpenLap] = React.useState(false);
  const handleOpenLap = () => {
    setOpenLap(!openLap);
  };
  const [openLoai, setOpenLoai] = React.useState(false);
  const handleOpenLoai = () => {
    setOpenLoai(!openLoai);
  };

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Sản phẩm" />
          <Header />
          <div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <div className="productBanner">
                <Carousel
                  style={{
                    overflow: "hidden",
                    height: "10vh",
                  }}
                >
                  <img src={bg} className="bgImgi" />

                  <img src={bg3} className="bgImgi" />
                  <img src={bg4} className="bgImgi" />
                </Carousel>
              </div>
            </div>
            {products.length === 0 ? (
              ""
            ) : (
              <h2
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid rgba(21,21,21,0.5)",
                  width: "20vmax",
                  fontSize: "1.4vmax",
                  fontFamily: "Poppins,sans-serif",
                  margin: "3vmax auto",
                  color: "rgb(0, 0, 0, 0.7)",
                }}
              >
                SẢN PHẨM
              </h2>
            )}
            <div
              className="sidebar__product"
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <div
                className="sidebar__products"
                style={{
                  border: "1px solid #999",
                  // margin: "1vmax",
                  // flex: ".177",
                  display:"flex",
                  flexDirection:"column",
                 
                }}
              >
                <Typography style={{ fontSize: "1.2vmax", padding: "5px", textAlign:"center" }}>
                  DANH MỤC
                </Typography>

                
                <button style={{borderLeft:"none", borderRight:"none",cursor:"pointer"  }} onClick={() => setCategory()}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  Tất cả
                  </Typography>
                </button>

                <button style={{borderLeft:"none", borderRight:"none", borderTop:"none"  }} onClick={handleOpenLap}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  Laptop
                  </Typography>
                </button>
                {openLap ? (
                  <ul className="categoryBox">
                    {stylelap.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul>
                ) : null}
               
                <button style={{ borderLeft:"none", borderRight:"none",borderTop:"none"}} onClick={handleOpenLoai}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  Loại Laptop
                  </Typography>
                </button>
                {openLoai ? (
                  <ul className="categoryBox">
                    {loai.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul>
                ) : null}
                
              </div>

              {products.length === 0 ? (
                <span
                  style={{
                    display: "block",
                    padding: "30px 0",
                    fontSize: "1.5rem",
                    flex: ".9",
                    textAlign: "center",
                  }}
                >
                  Không tìm thấy sản phẩm trong danh mục này....
                </span>
              ) : (
                <div
                  className="products"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flex: ".9",
                  }}
                >
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
            </div>

            <div
              className="pagination__box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "6vmax",
              }}
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
