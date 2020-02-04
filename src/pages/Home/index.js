import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useApi from "../../helpers/OlxAPI";

import { PageContainer } from "../../components/MainComponents";
import { PageArea, SearchArea } from "./styled";

const Page = () => {
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);

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

  return (
    <>
      <SearchArea>
        <PageContainer>
          <PageArea>
            <div className="searchBox">
              <form action="/ads" method="GET">
                <input
                  type="text"
                  name="q"
                  id=""
                  placeholder="O que você procura?"
                />
                <select name="state">
                  {stateList.map(state => (
                    <option key={state._id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <button>Pesquisar</button>
              </form>
            </div>
            <div className="categoryList">
              {categories.map(category => (
                <Link
                  to={`/ads?cat=${category.slug}`}
                  className="categoryItem"
                  key={category._id}
                >
                  <img src={category.img} alt="" />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </PageArea>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>...</PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
