import React, { useState } from 'react';
import './App.css';
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import Dogs from './components/Dogs'
import { LandingPage } from './components/LandingPage'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from './auth'
import { withCookies, useCookies } from 'react-cookie'
import Axios from 'axios';


function App(props) {
  const [username, setUsername] = useState([''])
  const [email, setEmail] = useState([''])
  const [password, setPassword] = useState([''])
  const [loggedin, setLoggedin] = useState(auth.isAuthenticated())
  const [cookies, setCookie, removeCookie] = useCookies(['username'])
  const [toHome, setToHome] = useState(false)

  const logOutUser = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.get('http://localhost:8000/user/logout', { withCredentials: true })
      console.log(res)
      removeCookie('username', { path: '/' })
      auth.logout(() => {
        setLoggedin(auth.isAuthenticated())
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const submitUser = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.post(`http://localhost:8000/user/login`, {
        username: username,
        email: email,
        password: password
      }, { withCredentials: true })
      setCookie('username', res.data.data.username, { path: '/' })
      auth.login(() => {
        setLoggedin(auth.isAuthenticated())
      })
      setTimeout(() => setToHome(true), 2000)
    }
    catch (err) {
      console.log(err)
    }
  }

  const createUser = async (e) => {
    console.log(e)
    e.preventDefault()
    try {
      const res = await Axios.post(`http://localhost:8000/user/register`, {
        username: username,
        email: email,
        password: password
      }, { withCredentials: true })
      console.log(res)
      setCookie('username', res.data.data.username, { path: '/' })
      auth.login(() => {
        setLoggedin(auth.isAuthenticated())
      })
      setTimeout(() => setToHome(true), 2000)
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="light" variant="light
        " className="justify-content-between">
          {props.cookies.cookies.username ?
            <button onClick={logOutUser}>LOGOUT</button> :
            null
          }
          <Navbar.Brand>PUPPERS</Navbar.Brand>
          {props.cookies.cookies.username ?
            <Nav className="mr-sm-2">
              <Navbar.Brand>Hello {props.cookies.cookies.username}</Navbar.Brand>
            </Nav>
            :
            <Nav className="mr-sm-2">
              <Nav.Link href="/login">login</Nav.Link>
              <Nav.Link href="/register">register</Nav.Link>
            </Nav>
          }
        </Navbar>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/dogs' render={() => <Dogs cookies={props.cookies} />} />
          <Route
            exact path='/register'
            render={() => <UserRegister
              cookies={props.cookies}
              setLogin={setLoggedin}
              setUsername={setUsername}
              username={username}
              setEmail={setEmail}
              email={email}
              setPassword={setPassword}
              password={password}
              createUser={createUser}
              toHome={toHome}
            />} />
          <Route
            exact path='/login'
            render={() => <UserLogin
              cookies={props.cookies}
              setLogin={setLoggedin}
              setUsername={setUsername}
              username={username}
              setEmail={setEmail}
              email={email}
              setPassword={setPassword}
              password={password}
              submitUser={submitUser}
              toHome={toHome}
            />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withCookies(App);
