import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/types'

import { initialAuthCheckAndSetup } from './store/actions/index'

import RegisterPage from './pages/register-page/RegisterPage'
import LoginPage from './pages/login-page/LoginPage'
import LoadingPage from './pages/loading-page/LoadingPage'
import HomePage from './pages/home-page/HomePage'
import MixPorductsPage from './pages/mix-products-page/MixProductsPage'
import MixResultPage from './pages/mix-result-page/MixResultPage'
import AddProductPage from './pages/add-product-page/AddProductPage'
import UserResultPage from './pages/user-results-page/UserResultsPage'
import AllUsersPage from './pages/all-users-page/AllUsersPage'
import AllProductsPage from './pages/all-products-page/AllProductsPage'

const App: React.FC = () => {
  const authSelected = (state: RootState) => state.auth
  const user = useSelector(authSelected)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialAuthCheckAndSetup())
  }, [dispatch])

  return <Switch>
    <Route exact path="/" component={LoadingPage} />
    <Route path="/login">
      {user.data === null ? <LoginPage /> : <Redirect to='/home' />}
    </Route>
    <Route path="/register">
      {user.data === null ? <RegisterPage /> : <Redirect to='/home' />}
    </Route>
    <Route path="/home">
      {user.data === null ? <Redirect to='/login' /> : <HomePage />}
    </Route>
    <Route path="/mix-products">
      {user.data === null ? <Redirect to='/login' /> : <MixPorductsPage />}
    </Route>
    <Route path="/mix-result">
      {user.data === null ? <Redirect to='/login' /> : <MixResultPage />}
    </Route>
    <Route path="/add-product">
      {user.data === null ? <Redirect to='/login' /> : <AddProductPage />}
    </Route>
    <Route path="/user-mix-results">
      {user.data === null ? <Redirect to='/login' /> : <UserResultPage />}
    </Route>
    <Route path="/all-users">
      {user.data === null ? <Redirect to='/login' /> : <AllUsersPage />}
    </Route>
    <Route path="/all-products">
      {user.data === null ? <Redirect to='/login' /> : <AllProductsPage />}
    </Route>
  </Switch>
}

export default App