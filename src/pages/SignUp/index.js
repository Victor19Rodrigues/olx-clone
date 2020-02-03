import React, { useState, useEffect } from "react";

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

  const [name, setName] = useState("");
  const [stateLocal, setStateLocal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [stateList, setStateList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStates = async () => {
      const list = await api.getStates();

      setStateList(list);
    };

    getStates();
  }, [api]);

  const handleSubmit = async e => {
    e.preventDefault();

    setDisabled(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Senhas não batem");
      setDisabled(false);

      return;
    }

    const json = await api.register(name, email, password, stateLocal);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }

    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                value={stateLocal}
                onChange={e => setStateLocal(e.target.value)}
                required
              >
                <option></option>
                {stateList.map(state => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
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
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password"
                name="confirm-password"
                id="confirm-password"
                disabled={disabled}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Cadastrar</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
