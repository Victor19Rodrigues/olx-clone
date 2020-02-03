import Cookies from "js-cookie";
import qs from "qs";

const BASEAPI = "http://alunos.b7web.com.br:501";

const OlxAPI = {
  login: async (email, password) => {
    const response = await apiFetchPost("/user/signin", { email, password });

    return response;
  }
};

const apiFetchPost = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get("token");

    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI}${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchGet = async (endpoint, body = []) => {
  if (!body.token) {
    let token = Cookies.get("token");

    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI}${endpoint}?${qs.stringify(body)}`);

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

export default () => OlxAPI;
