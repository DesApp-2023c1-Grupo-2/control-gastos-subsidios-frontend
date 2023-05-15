import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Container,
  Grid,
} from '@material-ui/core';
import { createProyecto } from '../../services/proyectos';
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { validateField } from '../../utils/validaciones';
import * as moment from 'moment';
//import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    boxShadow: '0 5px 10px -2px #333',
    backgroundColor: '#fafafa',
    padding: '0 1rem 1rem 1rem',
    margin: 'auto',
    borderTop: '1rem solid #5AA123',
    borderRadius: '17px 17px 0 0',
    minWidth: '17rem',
  },
  field: {
    margin: '0.5rem',
    minWidth: '11rem',
    display: 'flex',
  },
  submitButton: {
    margin: '0.5rem',
    backgroundColor: '#5AA123',
  },
  column: {
    flexDirection: 'column',
  },
  loading: {
    width: '20rem',
    marginLeft: '30rem',
    marginTop: '3rem',
  },
  error: {
    width: '25rem',
    marginLeft: '30rem',
    marginTop: '3rem',
  },
  grid: {
    display: 'grid',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem',
    width: '97%',
  },
  width30: {
    width: '30%',
    margin: '0.5rem',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const CreateProyect = () => {
  const classes = useStyles();
  const [titulo, setTitulo] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [organismo, setOrganismo] = useState(null);
  const [lineaFinanciamiento, setLineaFinanciamiento] = useState(null);
  const [año, setAño] = useState(null);
  const [unidadAcademica, setUnidadAcademica] = useState(null);
  const [areaTematica, setAreaTematica] = useState(null);
  const [subsidio, setSubsidio] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [numeroExpediente, setNumeroExpediente] = useState(null);
  const [numeroResolucion, setNumeroResolucion] = useState(null);
  const [numeroProyecto, setNumeroProyecto] = useState(null);
  const [director, setDirector] = useState(null);
  const [codirector, setCodirector] = useState(null);
  const [usuario, setUsuario] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [loadedProject, setLoadedProject] = useState(false);
  const [errorNumeroExpediente, setErrorNumeroExpediente] = useState(false);
  const [errorNumeroResolucion, setErrorNumeroResolucion] = useState(false);
  const [errorNumeroProyecto, setErrorNumeroProyecto] = useState(false);
  const [añoValue, setAñoValue] = useState(); //Fix to datapicker - se meustra un año menos que el valor que tiene el state
  const [hasError, setHasError] = useState(false);
  //Campos obligatorios
  const canSubmit =
    titulo &&
    tipo &&
    organismo &&
    lineaFinanciamiento &&
    año &&
    unidadAcademica &&
    areaTematica &&
    subsidio &&
    fechaInicio &&
    fechaFin &&
    numeroExpediente &&
    numeroResolucion &&
    director &&
    codirector;
  const timer = useRef();

  useEffect(() => {
    function setChanges() {
      timer.current = setTimeout(() => {
        setLoadedProject(false);
      }, 2000);
      setLoadedProject(true);
    }

    if (hasChanges) {
      setChanges();
      setHasChanges(false);
    }
  }, [hasChanges]);

  useEffect(() => {
    function setError() {
      timer.current = setTimeout(() => {
        setHasError(false);
      }, 2000);
      setHasError(true);
    }
    if (hasError) {
      setError();
      setHasChanges(false);
    }
  }, [hasError]);

  //Handle events
  const handleChange = (event, setState, isAutocomplete = false) => {
    if (isAutocomplete) {
      setState(event);
    } else {
      setState(event.target.value);
    }
  };

  const handlePicker = (event, setDate, onlyYear = false) => {
    if (onlyYear) {
      const year = moment(event).format('YYYY');
      const yearToValue = moment(year);

      setDate(year);
      setAñoValue(yearToValue);
    } else {
      const date = moment(event).format('YYYY-MM-DD');
      setDate(date);
    }
  };
  const clearStates = () => {
    setTitulo('');
    setTipo('');
    setOrganismo('');
    setLineaFinanciamiento('');
    setAño('');
    setUnidadAcademica('');
    setAreaTematica('');
    setSubsidio('');
    setFechaInicio('');
    setFechaFin('');
    setNumeroExpediente('');
    setNumeroResolucion('');
    setDirector('');
    setCodirector('');
    setUsuario('');
  };
  const submitForm = async () => {
    const proyecto = {
      titulo,
      tipo,
      organismo,
      lineaFinanciamiento,
      año,
      unidadAcademica,
      areaTematica,
      subsidio,
      fechaInicio,
      fechaFin,
      numeroExpediente,
      numeroResolucion,
      numeroProyecto,
      director,
      codirector,
      usuario,
    };
    //DATA TO TEST SUBMIT.
    // const proyecto = {
    // titulo:"titulo",
    // tipo:"tipo",
    // organismo:"organismo",
    // lineaFinanciamiento:"unahur",
    // año:"2021/06/01",
    // unidadAcademica:"unidadAcademica,",
    // areaTematica:"areaTematica",
    // subsidio:5777666,
    // fechaInicio:"2021/06/01",
    // fechaFin:"2022/06/01",
    // numeroExpediente:1234,
    // numeroResolucion: 82171,
    // director:"Pedroza 3",
    // codirector:"Mafia 3",
    // usuario :"galosalerno",
    // }
    const objectValidate = Object.values(proyecto);
    if (objectValidate.some((value) => !value)) {
      setHasError(true);
      return;
    } //Checkear que no haya ningun null
    const response = await createProyecto(proyecto);
    setHasChanges(true);
    clearStates();
    console.log(`Create-new-proyect-response: ${JSON.stringify(response)}`);
  };


  //Convocatorias prueba
  const [convocatorias, setConvocatorias] = useState([null]);

  useEffect(() => {
    fetch('http://localhost:3001/api/convocatorias/')
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        //console.log(typeof response.data[0].nombre);
        //console.log(response.data[0].nombre);
        //onst lista = response.data.map(elem => elem.nombre);
        //console.log(lista);
        setConvocatorias(response);

      })

  }, []);
  //const convocatoria = ['UNAHUR 1', 'UNAHUR 2', 'UNAHUR 3', 'UNAHUR 4'];
  const usuarios = [{ nombre: 'julian' }, { nombre: 'galo' }, { nombre: 'pedroza' }, { nombre: 'mafia' }, { nombre: 'mariano' }, { nombre: 'Emir' }]
  return (
    <div>
      <h1>Crear proyecto</h1>
      <div>
        <Paper className={classes.formContainer}>
          <h2>Cargar datos</h2>
          <div className={classes.grid}>
            <div className={classes.grid}>
              <TextField
                id="outlined-name"
                label="Título"
                value={titulo}
                onChange={(e) => handleChange(e, setTitulo)}
                variant="outlined"
                className={classes.field}
              />
              <TextField
                id="outlined-name"
                label="Tipo"
                value={tipo}
                onChange={(e) => handleChange(e, setTipo)}
                variant="outlined"
                className={classes.field}
              />
              <TextField
                id="outlined-name"
                label="Organismo"
                value={organismo}
                onChange={(e) => handleChange(e, setOrganismo)}
                variant="outlined"
                className={classes.field}
              />
              <TextField
                id="outlined-name"
                label="Línea de financiamiento"
                value={lineaFinanciamiento}
                type="text"
                onChange={(e) => handleChange(e, setLineaFinanciamiento)}
                variant="outlined"
                className={classes.field}
              />
              <TextField
                id="outlined-name"
                label="Unidad académica"
                value={unidadAcademica}
                type="text"
                onChange={(e) => handleChange(e, setUnidadAcademica)}
                variant="outlined"
                className={classes.field}
              />

              <TextField
                id="outlined-name"
                label="Área temática"
                value={areaTematica}
                type="text"
                onChange={(e) => handleChange(e, setAreaTematica)}
                variant="outlined"
                className={classes.field}
              />

              <TextField
                id="outlined-name"
                label="Subsidio"
                value={subsidio}
                type="text"
                onChange={(e) => handleChange(e, setSubsidio)}
                variant="outlined"
                className={classes.field}
              />
              <Divider />
            </div >
            <div className={classes.root}>
              <Grid container spacing={1}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs>
                    <KeyboardDatePicker
                      className={classes.field}
                      variant="outlined"
                      id="date-picker-dialog"
                      label="Fecha inicio"
                      format="MM/dd/yyyy"
                      minDate={moment()}
                      value={fechaInicio}
                      onChange={(e) => handlePicker(e, setFechaInicio)}
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <KeyboardDatePicker
                      className={classes.field}
                      minwidth="30%"
                      id="date-picker-dialog"
                      label="Fecha fin"
                      format="MM/dd/yyyy"
                      minDate={moment().add(6, 'month')} //6 meses es el minimo de duracion de un proyecto
                      value={fechaFin}
                      onChange={(e) => handlePicker(e, setFechaFin)}
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      className={classes.field}
                      options={convocatorias}
                      getOptionLabel={(option) => option.nombre}

                      renderInput={(params) => <TextField {...params} label="Convocatoria" variant="outlined" />}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Divider />
            </div>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Número expediente"
                    value={numeroExpediente}
                    onBlur={(e) =>
                      validateField(
                        'int',
                        e.target.value,
                        setErrorNumeroExpediente
                      )
                    }
                    type="text"
                    onChange={(e) => handleChange(e, setNumeroExpediente)}
                    variant="outlined"
                    className={classes.field}
                    error={errorNumeroExpediente}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Número resolución"
                    value={numeroResolucion}
                    onBlur={(e) =>
                      validateField(
                        'int',
                        e.target.value,
                        setErrorNumeroResolucion
                      )
                    }
                    type="text"
                    onChange={(e) => handleChange(e, setNumeroResolucion)}
                    variant="outlined"
                    className={classes.field}
                    error={errorNumeroResolucion}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Número proyecto"
                    value={numeroProyecto}
                    onBlur={(e) =>
                      validateField('int', e.target.value, setErrorNumeroProyecto)
                    }
                    type="text"
                    onChange={(e) => handleChange(e, setNumeroProyecto)}
                    variant="outlined"
                    className={classes.field}
                    error={errorNumeroProyecto}
                  />
                </Grid>
              </Grid>
            </div>
            <Divider />
            <TextField
              id="outlined-name"
              label="Director"
              value={director}
              type="text"
              onChange={(e) => handleChange(e, setDirector)}
              variant="outlined"
              className={classes.field}
            />
            <TextField
              id="outlined-name"
              label="Codirector"
              value={codirector}
              type="text"
              onChange={(e) => handleChange(e, setCodirector)}
              variant="outlined"
              className={classes.field}
            />
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs>

                  <Autocomplete
                    className={classes.field}
                    multiple
                    id="tags-outlined"
                    options={usuarios}
                    getOptionLabel={(option) => option.nombre}
                    defaultValue={[]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Usuarios responsables"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
          <Button
            onClick={() => submitForm()}
            color="primary"
            variant="contained"
            className={classes.submitButton}
            disable={!canSubmit}
          >
            Cargar proyecto
          </Button>
        </Paper>
        {
          loadedProject && (
            <Alert className={classes.loading}>Proyecto cargado con exito</Alert>
          )
        }
        {
          hasError && (
            <Alert severity="error" className={classes.error}>
              Hubo un problema al procesar su solicitud
            </Alert>
          )
        }
      </div >
    </div >
  );
};
//LOKO
export default CreateProyect;
//PANA
