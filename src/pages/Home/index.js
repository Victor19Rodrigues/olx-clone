import React, { useState } from "react";

import useApi from "../../helpers/OlxAPI";

import { PageContainer } from "../../components/MainComponents";
import { PageArea, SearchArea } from "./styled";

const Page = () => {
  const api = useApi();

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
                <select name="state"></select>
                <button>Pesquisar</button>
              </form>
            </div>
            <div className="categorylist"></div>
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
