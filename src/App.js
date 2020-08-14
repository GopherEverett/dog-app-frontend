import React, { useState } from 'react';
import './App.css';
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import Dogs from './components/Dogs'
import SingleDog from './components/SingleDog'
import { LandingPage } from './components/LandingPage'
import AddDogForm from './components/AddDogForm'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
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
  const [toDogs, setToDogs] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [redirLogout, setRedirLogout] = useState(false)

  const logOutUser = async (e) => {
    e.preventDefault()
    try {
      await Axios.get('http://localhost:8000/user/logout', { withCredentials: true })
      removeCookie('username', { path: '/' })
      removeCookie('userid', { path: '/' })
      auth.logout(() => {
        setLoggedin(auth.isAuthenticated())
      })
      setRedirLogout(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  const submitUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await Axios.post(`http://localhost:8000/user/login`, {
        username: username,
        email: email,
        password: password
      }, { withCredentials: true })
      setCookie('username', res.data.data.username, { path: '/' })
      setCookie('userid', res.data.data.id, { path: '/' })
      auth.login(() => {
        setLoggedin(auth.isAuthenticated())
      })
      setTimeout(() => setToDogs(true), 2000)
    }
    catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const createUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await Axios.post(`http://localhost:8000/user/register`, {
        username: username,
        email: email,
        password: password
      }, { withCredentials: true })
      console.log(res)
      setCookie('userid', res.data.data.id, { path: '/' })
      setCookie('username', res.data.data.username, { path: '/' })
      auth.login(() => {
        setLoggedin(auth.isAuthenticated())
      })
      setTimeout(() => setToDogs(true), 2000)
    }
    catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }
  return (
    <div className="App">
      <Navbar bg="light" variant="light
        " className="justify-content-between">
        {props.cookies.cookies.username ?
          <Link to='/login'><Button onClick={logOutUser}>LOGOUT</Button></Link> :
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
        {redirLogout ?
          <Redirect to='/login'/> :
          null
        }
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dogs' render={() => <Dogs cookies={props.cookies} />} />
        <Route
          exact path='/register'
          render={() => <UserRegister
            {...props}
            cookies={props.cookies}
            setLogin={setLoggedin}
            setUsername={setUsername}
            username={username}
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            createUser={createUser}
            toDogs={toDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
            toDogs={toDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />} />
        <Route exact path='/dogs/:id' render={() => <SingleDog cookies={props.cookies} />} />
        <Route exact path='/adddog' render={() => <AddDogForm {...props} />} />
      </Switch>
    </div>
  );
}

export default withCookies(App);
