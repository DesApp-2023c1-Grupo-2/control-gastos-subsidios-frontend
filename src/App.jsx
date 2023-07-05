import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { DatosGenerales } from './components/DatosGenerales';
import { MisProyectos } from './components/MisProyectos';
import { Normativas } from './components/Normativas';
import {
  AssignmentInd,
  Help,
  Home,
  Info,
  PersonAdd,
  NoteAdd,
  ShoppingCart,
  LibraryBooks,
  LocalAtm,
  Receipt,
} from '@material-ui/icons';

import { Presupuestos } from './components/Presupuestos';
import { Compras } from './components/Compras';
import { Proveedores } from './components/Proveedores';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import CreateProyect from './components/screens/CreateProyect';
import CreateUser from './components/screens/CreateUser';
import ProyectsLists from './components/screens/ProyectsLists';

export default function App() {
  const $ = useStyles();
  const [loggedIn, setLoggedIn] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [rol, setRol] = useState();
  const [init, setInit] = useState(false);
  const [idProyecto, setIdProyecto] = useState(null);
  const userSideBarOptions = [
    { text: 'Proyectos', icon: <Home />, path: '/' },
    { text: 'Datos generales', icon: <Receipt />, path: '/proyectos' },
    {
      text: 'Presupuesto',
      icon: <LocalAtm />,
      path: '/proyectos/presupuestos',
    },
    {
      text: 'Proveedores',
      icon: <AssignmentInd />,
      path: '/proyectos/proveedores',
    },
    { text: 'Compras', icon: <ShoppingCart />, path: '/proyectos/compras' },
    { text: 'Normativas I+D', icon: <Info />, path: '/proyectos/normativas' },
    { text: 'Soporte', icon: <Help />, path: '/' },
  ];
  const adminSideBarOptions = [
    { text: 'Proyectos', icon: <LibraryBooks />, path: '/admin/proyects' },
    {
      text: 'Cargar proyecto',
      icon: <NoteAdd />,
      path: '/admin/createProyect',
    },
    { text: 'Cargar usuario', icon: <PersonAdd />, path: '/admin/createUser' },
  ];
  useEffect(() => {
    function checkLogin() {
      const loggedIn = sessionStorage.getItem('loggedIn');
      const usuario = sessionStorage.getItem('username');
      const role = sessionStorage.getItem('role');
      setRol(role);
      //Fix to first path to admin
      if (role === 'admin' && !window.location.href.endsWith('/admin/proyects'))
        window.location.href = '/admin/proyects';
      //Fix to first path to user
      if (role === 'user' && window.location.href.includes('/admin'))
        window.location.href = '/';

      setUserName(usuario);
      loggedIn === 'true' ? setLoggedIn(true) : setLoggedIn(false);
      setInit(true);
    }
    checkLogin();
  }, []);
  return (
    //ToDo: Como quitar espacio sobrante en el borde derecho.
    init ? (
      <>
        {!loggedIn ? (
          <Login
            userName={userName}
            password={password}
            setPassword={setPassword}
            setUserName={setUserName}
            setLoggedIn={setLoggedIn}
            rol={rol}
            setRol={setRol}
          />
        ) : rol === 'admin' ? (
          <>
            <Container maxWidth="xl" className={$.root}>
              <Router>
                <NavBar sideBarOptions={adminSideBarOptions} user={userName} />
                <div className={$.container}>
                  <Header setLoggedIn={setLoggedIn} userName={userName} />
                  <div className={$.content}>
                    <Switch>
                      <Route path="/login" component={Login} />
                      <Route
                        path="/admin/createProyect"
                        component={CreateProyect}
                      />
                      <Route path="/admin/createUser" component={CreateUser} />
                      <Route path="/admin/proyects" component={ProyectsLists} />
                    </Switch>
                  </div>
                </div>
              </Router>
            </Container>
          </>
        ) : (
          <Container maxWidth="xl" className={$.root}>
            <Router>
              <NavBar sideBarOptions={userSideBarOptions} user={userName} />
              <div className={$.container}>
                <Header setLoggedIn={setLoggedIn} userName={userName} />
                <div className={$.content}>
                  <Switch>
                    <Route path="/login" component={Login} />
                    <Route
                      path="/"
                      exact
                      component={() => (
                        <MisProyectos
                          userName={userName}
                          setIdProyecto={setIdProyecto}
                        />
                      )}
                    />
                    <Route
                      path="/proyectos"
                      exact
                      component={() => (
                        <DatosGenerales
                          idProyecto={idProyecto}
                          setIdProyect={setIdProyecto}
                        />
                      )}
                    />
                    <Route
                      path="/proyectos/presupuestos"
                      exact
                      component={() => (
                        <Presupuestos
                          idProyecto={idProyecto}
                          setIdProyecto={setIdProyecto}
                        />
                      )}
                    />
                    <Route
                      path="/proyectos/compras"
                      component={() => (
                        <Compras
                          idProyecto={idProyecto}
                          setIdProyecto={setIdProyecto}
                        />
                      )}
                    />
                    idProyecto
                    <Route
                      path="/proyectos/proveedores"
                      exact
                      component={Proveedores}
                    />
                    <Route path="/normativas" exact component={Normativas} />
                    <Route
                      path="/proyectos/normativas"
                      exact
                      component={Normativas}
                    />
                  </Switch>
                </div>
              </div>
            </Router>
          </Container>
        )}
        )
      </>
    ) : (
      <></>
    )
  );
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '1vh',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: 'white',
  },
  content: {
    paddingLeft: '2%',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '3vh',
  },
}));
