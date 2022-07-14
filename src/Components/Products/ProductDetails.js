import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const ProductDetails = () => {
  const { products } = useStore();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const matched = products?.find((item) => item?.id === id);
    if (matched?.id) {
      setProduct(matched);
    } else {
      navigate("/products");
    }
    window.scroll(0, 0);
  }, []);
  return <div>{id}</div>;
};

export default ProductDetails;
