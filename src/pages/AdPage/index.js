import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import { Slide } from "react-slideshow-image";

import useApi from "../../helpers/OlxAPI";
import AdItem from "../../components/partials/AdItem";

import { PageArea, Fake, OthersArea, Breadcrumb } from "./styled";
import { PageContainer } from "../../components/MainComponents";

const Page = () => {
  const api = useApi();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState([]);

  useEffect(() => {
    const getAdInfo = async id => {
      const json = await api.getAd(id, true);

      setAdInfo(json);
      setLoading(false);
    };

    getAdInfo(id);
  }, [api, id]);

  return (
    <PageContainer>
      {adInfo.category && (
        <Breadcrumb>
          Você está aqui:
          <Link to="/">Home</Link>/
          <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
          <Link
            to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          / {adInfo.title}
        </Breadcrumb>
      )}

      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div key={k} className="each-slide">
                      <img src={img} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="ad-info">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>
                    Criado em{" "}
                    {format(
                      new Date(adInfo.dateCreated),
                      "dd 'de' MMMM 'de' yyyy', às ' HH:mm'h'",
                      { locale: pt }
                    )}
                  </small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}

                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && "Preço negociável"}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className="price">
                Preço: <span>R$ {adInfo.price}</span>
              </div>
            )}
          </div>
          {loading && <Fake height={50} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                // eslint-disable-next-line react/jsx-no-target-blank
                target="_blank"
                className="contactSellerLink"
              >
                Fale com o vendedor
              </a>
              <div className="createdBy box box--padding">
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          )}
        </div>
      </PageArea>

      <OthersArea>
        {adInfo.others && (
          <>
            <h2>Outras ofertas do vendedor</h2>
            <div className="list">
              {adInfo.others.map((other, k) => (
                <AdItem key={k} data={other} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  );
};

export default Page;
