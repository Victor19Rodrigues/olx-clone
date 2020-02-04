import React from "react";
import { Link } from "react-router-dom";

import { Item } from "./styled";

// import { Container } from './styles';

export default ({ data }) => {
  let price = "";

  if (data.priceNegotiable) {
    price = "Preço Negociável";
  } else {
    price = `R$ ${data.price}`;
  }

  return (
    <Item className="aditem">
      <Link to={`/ad/${data.id}`}>
        <div className="itemImage">
          <img src={data.image} alt="" />
        </div>
        <div className="itemName">{data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </Item>
  );
};
