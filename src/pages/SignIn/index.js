import React, { useState } from "react";

import useApi from "../../helpers/OlxAPI";
import { doLogin } from "../../helpers/AuthHandler";

import { PageArea } from "./styled";
import {
  PageContainer,
  PageTitle,
  ErrorMessage
} from "../../components/MainComponents";

const Page = () => {
  const api = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    setDisabled(true);

    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = "/";
    }

    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
                type="checkbox"
                disabled={disabled}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
