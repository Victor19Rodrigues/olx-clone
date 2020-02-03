import React from "react";
import { Link } from "react-router-dom";
// import { Container } from './styles';

const Page = () => {
  return (
    <>
      <div>Página Home</div>
      <Link to="/about">Sobre</Link>
    </>
  );
};

export default Page;
