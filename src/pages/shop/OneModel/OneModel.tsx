import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../redux/hooks/useTypedSelector';
import { IModels } from '../../../redux/store/types/Imodels';
import styles from './OneModel.module.css';

export default function OneModel() {
  const [oneModel, setOneModel] = useState<IModels>();
  const [indexModel, setIndexModel] = useState<any>(0);
  const [indexSize, setIndexSize] = useState<any>(0);
  const [modelInput, setModelInput] = useState<String>('1');
  const [modelAddBasket, setModelAddBasket] = useState<any>('');
  const [restSize, setRestSize] = useState<String>('');

  useEffect(() => {
    const modelParse = localStorage.getItem('model');
    setOneModel(JSON.parse(modelParse!));
  }, []);

  useEffect(() => {
    setModelAddBasket({
      ...modelAddBasket,
      modelName: oneModel?.name,
      color: oneModel?.colors[0].color,
    });
  }, [oneModel]);

  function handleColor(model: any, index: number) {
    setModelInput('1');
    setRestSize('');
    setIndexSize(0);
    setModelAddBasket({
      ...modelAddBasket,
      modelName: oneModel?.name,
      color: model.color,
    });

    setIndexModel(index);
  }

  function handleSize(sizeModel: any, index: number) {
    if (modelAddBasket.color) {
      setRestSize(`Остаток на складе: ${sizeModel.rest}`);
    }
    setModelAddBasket({
      ...modelAddBasket,
      size: sizeModel,
    });
    setIndexSize(index + 1);
  }

  function addBasket() {}
  return (
    <section className={styles.OneModel}>
      <h3>{oneModel?.name}</h3>
      <div className={styles.shopRoutes}>
        <Link to={'/'}>Главная</Link>
        <div className={styles.line}>—</div>
        <div className={styles.shopItem}>
          <Link to={'/shop'}>{oneModel?.categoriesId.name}</Link>
        </div>
        <div className={styles.line}>—</div>
        <div className={styles.shopItemGrey}>
          <div>{oneModel?.name}</div>
        </div>
      </div>
      <div className={styles.oneModelDiv}>
        <div className={styles.imgOneModel}>
          <img src={oneModel?.colors[indexModel].img.toString()} alt='' />
        </div>
        <div className={styles.oneModelBody}>
          <div className={styles.oneModelPrice}>
            {oneModel?.discount ? (
              <div>
                <p className={styles.oneModelPriceItem1p}>
                  ${oneModel?.discount.toString()}
                </p>
                <p className={styles.oneModelPriceItem2p}>
                  ${oneModel?.price.toString()}
                </p>
              </div>
            ) : (
              <p className={styles.oneModelPriceItem1p}>
                ${oneModel?.price.toString()}
              </p>
            )}
          </div>
          <div className={styles.oneModelColor}>
            <p>Выберите цвет</p>
            <div>
              {oneModel?.colors.map((model, index) => (
                <button
                  onClick={() => {
                    handleColor(model, index);
                  }}
                  style={{
                    background: model.color.toString(),
                    border: index === indexModel ? '3px solid #6e9c9f' : 'none',
                  }}
                ></button>
              ))}
            </div>
          </div>
          <div className={styles.oneModelSize}>
            <p>Выберите размер</p>
            <div>
              {oneModel?.colors[indexModel].sizesModel.map(
                (sizeModel, index) => {
                  if (sizeModel.rest !== 0) {
                    return (
                      <button
                        onClick={() => {
                          handleSize(sizeModel, index);
                        }}
                        className={
                          index + 1 == indexSize
                            ? styles.sizeBtnAct
                            : styles.sizeBtn
                        }
                      >
                        {sizeModel.size}
                      </button>
                    );
                  }
                }
              )}
            </div>
          </div>

          <div className={styles.addBasket}>
            <div>
              <input
                // disabled={indexSize === 0 ? true : false}
                value={modelInput.toString()}
                onChange={e => {
                  setModelInput(e.target.value);

                  e.target.value > modelAddBasket.size.rest
                    ? setModelInput(modelAddBasket.size.rest)
                    : null;
                }}
                type='number'
              />
            </div>
            <div>
              <button onClick={addBasket}>Добавить в корзину</button>
            </div>
          </div>
          <div className={styles.modelRest}>
            <p>{restSize}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
