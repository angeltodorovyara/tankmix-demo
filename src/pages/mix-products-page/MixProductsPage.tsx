import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PageLayout from "../PageLayout";
import List from "../../components/list/List";
import ListItemComponent from "../../components/list/list-item/ListItem";
import ListItemAction from "../../components/list/list-item-action/ListItemAction";
import Backdrop from "../../components/backdrop/Backdrop";
import Button from "../../components/buttons/Button";
import { RootState } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { mixResult } from "../../store/actions";
import { Product } from "../../interfaces";
import { useTranslation } from "react-i18next";
import { Box } from "@material-ui/core";

const MixProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.auth);
  const result = useSelector((state: RootState) => state.result);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const renderSelectedProduts = () => {
    return (
      <List subHeader={t('selectedProducts')}>
        {selectedProducts.map(item => <ListItemAction content={item.name} key={item.name} onClick={() => onDeleteListHandler(item)} />)}
      </List>
    );
  };

  const renderProducts = () => {
    return (
      <List subHeader={t('products')}>
        {products.data!.sort().map(item => (
          <ListItemComponent content={item.name} key={item.name} onClick={() => onListItemClickHandler(item)}
            disabled={(selectedProducts.some(x => x.name === item.name) || selectedProducts.length === 2) ? true : false}
          />
        ))}
      </List>
    );
  };

  const onListItemClickHandler = (item: Product): any => {
    setSelectedProducts(prevState => {
      const newArray = prevState.map(x => ({ ...x }));
      newArray.push({ ...item });
      return newArray;
    });
  };

  const onDeleteListHandler = (item: Product) => {
    setSelectedProducts(prevState => prevState.filter(x => x.name !== item.name));
  };

  const onClickCreateMixHandler = () => {
    dispatch(mixResult(user.data!.email, selectedProducts))
  };

  if (result.done) {
    return <Redirect to="/mix-result" />
  }

  return (
    <PageLayout>
      {products.data !== null ?
        <Box width={1}>
          <Backdrop open={result.loading} />
          {selectedProducts.length > 0 ? renderSelectedProduts() : null}
          {selectedProducts.length === 2 ? (
            <Box px={2}>
              <Button onClick={onClickCreateMixHandler}>{t('createMix')}</Button>
            </Box>
          ) : null}
          {products.data.length > 0 ? renderProducts() : null}
        </Box> : null}
    </PageLayout>
  );
};

export default MixProductsPage;
