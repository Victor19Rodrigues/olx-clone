import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";

import useApi from "../../helpers/OlxAPI";

import { PageArea, Fake } from "./styled";
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
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">{loading && <Fake height={300} />}</div>
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
                {adInfo.views && 
                  <small>Visualizações: {adInfo.views}</small>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
          </div>
          <div className="box box--padding">
            {loading && <Fake height={50} />}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
