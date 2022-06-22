import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import GDI from 'assets/images/GradientDescentImg.png';
import KNNI from 'assets/images/KnnImg.png';
import LRI from 'assets/images/LinearRegressionImag.png';
import LogisticRI from 'assets/images/LogisticRegressionImg.png';
import NNI from 'assets/images/NeuralNetworksImg.png';
import { useTranslation } from "react-i18next";

function Cards() {
  const [t] = useTranslation('translation');
  return (
    <div className='cards' id="cards_id">
      {/* Don't delet this line, it prevent the window slide from stopping on h1 */}
      <div className='cards__pos'></div>
      <h1>{t("cards.main_algs")}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={LRI}
              text={t("cards.linear_regression.text")}
              info={t("cards.linear_regression.info")}
              label={t("cards.linear_regression.label")}
              path='/algorithms/lr1'
            />
            <CardItem
              src={GDI}
              text={t("cards.gradient_descent.text")}
              info={t("cards.gradient_descent.info")}
              label={t("cards.gradient_descent.label")}
              path='/algorithms/gd1'
            />
          </ul>
          <ul className='cards__items'>
            {/* <CardItem
                src= { KNNI }
                text={t("cards.knn.text")}
                info={t("cards.knn.info")}
                label={t("cards.knn.label")}
                path='/algorithms'
              /> */}
            <CardItem
              src={NNI}
              text={t("cards.neural_networks.text")}
              info={t("cards.neural_networks.info")}
              label={t("cards.neural_networks.label")}
              path='/algorithms/nn1'
            />
            <CardItem
              src={LogisticRI}
              text={t("cards.logistic_regression.text")}
              info={t("cards.logistic_regression.info")}
              label={t("cards.logistic_regression.label")}
              path='/algorithms/logreg1'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
