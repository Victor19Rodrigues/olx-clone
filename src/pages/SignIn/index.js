import React from "react";
import { Link } from "react-router-dom";

import { PageArea } from "./styled";
import { PageContainer, PageTitle } from "../../components/MainComponents";

const Page = () => {
  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        <form>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input type="email" name="email" id="email" />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input type="password" name="password" id="password" />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input type="checkbox" />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button>Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
