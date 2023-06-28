import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  FormControl,
  Paper,
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
import { getUsuarios } from '../../services/usuarios';
import { getAllConvocatorias } from '../../services/convocatorias';
import { getAllRubros } from '../../services/rubros';
import Rubro from '../dashboards/Rubro.jsx';

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
  textfieldClass: {
    margin: '0.5rem',
    minWidth: '11rem',
    display: 'flex',
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
  },

}));

const CreateProyect = () => {
  const classes = useStyles();
  const [titulo, setTitulo] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [organismo, setOrganismo] = useState(null);
  const [lineaFinanciamiento, setLineaFinanciamiento] = useState(null);
  //const [año, setAño] = useState(null); vuela
  const [unidadAcademica, setUnidadAcademica] = useState(null);
  const [areaTematica, setAreaTematica] = useState(null);
  //const [subsidio, setSubsidio] = useState([]); vuela
  const [subsidios, setSubsidios] = useState([]);// aca se guardan los el id y el monto de los subsidios por rubros.
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
  const [convocatoria, setConvocatoria] = useState(null);// en convocatoria guardo la convocatoria seleccionada en el combo.

  //Campos obligatorios
  const canSubmit =
    titulo &&
    tipo &&
    organismo &&
    lineaFinanciamiento &&
    //año && vuela
    unidadAcademica &&
    areaTematica &&
    //subsidio && vuela
    fechaInicio &&
    fechaFin &&
    numeroExpediente &&
    numeroResolucion &&
    director &&
    codirector &&
    usuario &&
    subsidios &&
    convocatoria;
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
      const date = moment(event).add(1, 'days').format('YYYY-MM-DD');
      setDate(date);
    }
  };
  const clearStates = () => {
    setTitulo('');
    setTipo('');
    setOrganismo('');
    setLineaFinanciamiento('');
    //setAño(''); vuela
    setUnidadAcademica('');
    setAreaTematica('');
    //setSubsidio(''); vuela
    setSubsidios([]);
    setFechaInicio(null);
    setFechaFin(null);
    setNumeroExpediente('');
    setNumeroResolucion('');
    setNumeroProyecto('');
    setDirector('');
    setCodirector('');
    setUsuario([]);
    setConvocatoria(null);
  };
  const submitForm = async () => {
    const proyecto = {
      titulo,
      tipo,
      organismo,
      lineaFinanciamiento,
      //año: moment().format(),// fecha del dia de hoy
      unidadAcademica,
      areaTematica,
      //subsidio: subsidios[0].monto, vuela subsidios
      fechaInicio,
      fechaFin,
      numeroExpediente,
      numeroResolucion,
      numeroProyecto,
      director,
      codirector,
      //usuario: usuario[0].usuario, vuela usuario
      convocatoria,
      usuario,
      subsidios,
    };

    //DATA TO TEST SUBMIT.
    //const proyecto = {
    //titulo,
    //tipo: "tipo",
    //organismo: "organismo",
    //lineaFinanciamiento: "unahur",
    //año: "2021/06/01",
    //unidadAcademica: "unidadAcademica,",
    //areaTematica: "areaTematica",
    //subsidio: 5777666,
    //fechaInicio: "2021/06/01",
    //fechaFin: "2022/06/01",
    //numeroExpediente: 1234,
    //numeroResolucion: 82171,
    //director: "Pedroza 3",
    //codirector: "Mafia 3",
    //usuario: "galosalerno",
    //};
    const objectValidate = Object.values(proyecto);
    //console.log(objectValidate);
    if (objectValidate.some((value) => !value)) {
      setHasError(true);
      return;
    } //Checkear que no haya ningun null
    const response = await createProyecto(proyecto);
    setHasChanges(true);
    clearStates();
    console.log(`Create-new-proyect-response: ${JSON.stringify(response)}`);
    //console.log(proyecto);
  };

  //Convocatorias fetch
  const [convocatorias, setConvocatorias] = useState([null]);
  useEffect(() => {
    async function fetchConvocatorias() {
      try {
        const convocatorias = await getAllConvocatorias();
        //const json = await convocatorias; vuela
        setConvocatorias(convocatorias);
      } catch (error) {
        console.log("error en el fetch de convocatorias" + error);
      }
    }
    fetchConvocatorias();
  }, []);

  //Usuarios fetch
  const [usuarios, setUsuarios] = useState([null]);
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const usuarios = await getUsuarios();
        const json = await usuarios.data;
        setUsuarios(json);
      } catch (error) {
        console.log("error en el fetch de usuarios" + error);
      }
    }
    fetchUsuarios();
  }, []);

  //actualiza el estado de subsidios
  const handleSubsidio = (newSubsidio) => {
    const index = subsidios.findIndex((item) => item.id === newSubsidio.id);
    if (subsidios[index]) {
      const newSubsidioss = [...subsidios];
      newSubsidioss[index] = newSubsidio;
      setSubsidios(newSubsidioss);
    } else {
      setSubsidios([...subsidios, newSubsidio]);
    }
  };

  //console.log(subsidios); // para volarlo



  //Rubros fetch
  const [rubros, setRubros] = useState([]);
  useEffect(() => {
    async function fetchRubros() {
      try {
        const rubros = await getAllRubros();
        const json = await rubros.data;
        setRubros(json);
      } catch (error) {
        console.log("error en el fetch de rubros" + error);
      }
    }
    fetchRubros();
  }, []);
  //console.log(rubros);
  //
  //const convocatoria = ['UNAHUR 1', 'UNAHUR 2', 'UNAHUR 3', 'UNAHUR 4'];
  //const usuarios = [{ nombre: 'julian' }, { nombre: 'galo' }, { nombre: 'pedroza' }, { nombre: 'mafia' }, { nombre: 'mariano' }, { nombre: 'Emir' }]
  return (

    <div>
      <h1>Crear proyecto</h1>
      <div>
        <Paper className={classes.formContainer}>
          <h2>Cargar datos</h2>

          <div className={classes.grid}>
            <h3> Informacion general</h3>
            <Divider />
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
              <Divider />
              <h3>Subsidio destinado por rubro</h3>
              <Divider />

              <Grid container spacing={1}>
                {rubros.map((rubro) => (
                  <Rubro
                    key={rubro.id}
                    rubro={rubro}
                    handleSubsidio={handleSubsidio}
                    className={classes.textfieldClass}
                  />
                ))}
              </Grid>
              <Divider />
              <h3>Convocatoria</h3>
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
                      format="dd/MM/yyyy"
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
                      format="dd/MM/yyyy"
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
                      onChange={(event, newValue) => {
                        event = newValue ? newValue : null
                        setConvocatoria(event);
                      }}

                      renderInput={(params) => <TextField {...params} label="Convocatoria" variant="outlined" />}
                    />
                    {console.log(convocatoria)/*para volar en el futuro*/}
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Divider />
              <h3>Identificadores</h3>
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
            <h3>Responsables</h3>
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
                    onChange={(event, newValue) => {
                      event = newValue ? newValue : null
                      setUsuario(event);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Usuarios responsables"
                        variant="outlined"
                      />
                    )}
                  />
                  {console.log(usuario.map((user) => user))/*para volar en el futuro*/}
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
          loadedProject &&
          (
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
//QUE TE MUEVAS
