import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useApi from "../../helpers/OlxAPI";

import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";

import { PageArea } from "./styled";

const Page = () => {
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();

      setStateList(slist);
    };

    getStates();
  }, [api]);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();

      setCategories(cats);
    };

    getCategories();
  }, [api]);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8
      });

      setAdList(json.ads);
    };

    getRecentAds();
  }, [api]);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form action="" method="get">
            <input type="text" name="q" id="" />

            <div className="filterName">Estado:</div>
            <select name="state">
              <option></option>
              {stateList &&
                stateList.map((state, k) => (
                  <option value={state.name} key={k}>
                    {state.name}
                  </option>
                ))}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories &&
                categories.map((category, k) => (
                  <li key={k} className="categoryItem">
                    <img src={category.img} alt="" />
                    <span>{category.name}</span>
                  </li>
                ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">...</div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
