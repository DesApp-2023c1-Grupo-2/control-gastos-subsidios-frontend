import React, { useState } from 'react';
import { makeStyles, TextField, Button, Divider } from '@material-ui/core';
import { postProveedor } from '../services/proveedores.js';
import { validateField } from '../utils/validaciones.js';

export default function PopUpProveedores(props) {
  const $ = useStyles();

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mail, setMail] = useState('');
  const [cuit, setCuit] = useState('');
  //Validate inputs
  const [errorTelefono, setErrorTelefono] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorCuit, setErrorCuit] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const canSubmit =
    cuit &&
    nombre &&
    telefono &&
    mail &&
    !errorNombre &&
    !errorEmail &&
    !errorCuit &&
    !errorTelefono &&
    !errorEmail;

  const submitForm = async () => {
    props.state(false);
    const data = {
      nombre: nombre,
      telefono: telefono,
      mail: mail,
      cuit: cuit,
    };

    const res = await postProveedor(data);
    console.log(
      `[PopUpProveedores component] create proveedor ${JSON.stringify(res)}`
    );
  };
  const submitHandle = (handle, value) => {
    handle(value);
  };
  const handleClose = () => {
    props.state(false);
  };

  return (
    <>
      <div className={$.modal}>
        <h2>Agregar nuevo proveedor</h2>
        <Divider />
        <div className={$.inputs}>
          <TextField
            label="Nombre completo"
            className={$.textField}
            onChange={(e) => submitHandle(setNombre, e.target.value)}
            onBlur={(e) =>
              validateField('string', e.target.value, setErrorNombre)
            }
            error={errorNombre}
          />
          <TextField
            label="Teléfono"
            className={$.textField}
            onChange={(e) => submitHandle(setTelefono, e.target.value)}
            onBlur={(e) =>
              validateField('int', e.target.value, setErrorTelefono)
            }
            error={errorTelefono}
          />
          <TextField
            label="CUIT"
            className={$.textField}
            onChange={(e) => submitHandle(setCuit, e.target.value)}
            onBlur={(e) => validateField('cuit', e.target.value, setErrorCuit)}
            error={errorCuit}
          />
          <TextField
            label="E-mail"
            className={$.textField}
            onChange={(e) => submitHandle(setMail, e.target.value)}
            onBlur={(e) =>
              validateField('email', e.target.value, setErrorEmail)
            }
            error={errorEmail}
          />
        </div>
        <div className={$.button}>
          <Button color="primary" className={$.botones} onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" disabled={!canSubmit} onClick={submitForm}>
            Agregar Proveedor
          </Button>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    width: '80vh',
    height: '30rem',
    boxShadow: '0px 0px 5px 1px grey',
    padding: theme.spacing(2, 4, 3),
    top: '55%',
    left: '55%',
    transform: 'translate(-50%,-50%)',
  },
  inputs: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
  },
  textField: {
    marginTop: '0.5rem',
  },
  button: {
    display: 'flex',
    position: 'fixed',
    bottom: '0',
    right: '0',
    height: '3rem',
    marginBottom: '2.3vh',
    marginRight: '2.3vh',
  },
}));
