import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getProyectsForAdmin } from '../../services/proyectos';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.action.hover,',
    },
  },
}))(TableRow);

const StyledTableHead = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      background: '#5AA123',
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row, presupuestoTotal, presupuestoGastado } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.titulo}
        </TableCell>
        <TableCell align="center">{row.director}</TableCell>
        <TableCell align="center">{row.fechaInicio.slice(0, -14)}</TableCell>
        <TableCell align="center">{row.Convocatoria.nombre}</TableCell>
        <TableCell align="center">{presupuestoTotal}</TableCell>
        <TableCell align="center">{presupuestoGastado}</TableCell>
        <TableCell align="center">
          {presupuestoTotal - presupuestoGastado}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: '#FBFBFB',
          }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Información general
              </Typography>
              <Table size="small" aria-label="info">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tipo</TableCell>
                    <TableCell align="center">Organismo</TableCell>
                    <TableCell align="center">
                      Linea de financiamiento
                    </TableCell>
                    <TableCell align="center">Unidad académica</TableCell>
                    <TableCell align="center">Área temática</TableCell>
                    <TableCell align="center">Fecha fin</TableCell>
                    <TableCell align="center">N° expediente</TableCell>
                    <TableCell align="center">N° resolución</TableCell>
                    <TableCell align="center">N° proyecto</TableCell>
                    <TableCell align="center">Codirector</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{row.tipo}</TableCell>
                    <TableCell align="center">{row.organismo}</TableCell>
                    <TableCell align="center">
                      {row.lineaFinanciamiento}
                    </TableCell>
                    <TableCell align="center">{row.unidadAcademica}</TableCell>
                    <TableCell align="center">{row.areaTematica}</TableCell>
                    <TableCell align="center">
                      {row.fechaFin.slice(0, -14)}
                    </TableCell>
                    <TableCell align="center">{row.numeroExpediente}</TableCell>
                    <TableCell align="center">{row.numeroResolucion}</TableCell>
                    <TableCell align="center">{row.numeroProyecto}</TableCell>
                    <TableCell align="center">{row.codirector}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <Typography variant="h6" component="div">
                Presupuesto
              </Typography>
              <Table size="small" aria-label="info">
                <TableHead>
                  <TableRow>
                    {row.SubsidiosAsignados.map((sub) => (
                      <TableCell
                        align="center"
                        size="small"
                        key={sub.id}
                        style={{ maxWidth: '200px' }}
                      >
                        {sub.Rubro.nombre}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {row.SubsidiosAsignados.map((sub) => (
                      <TableCell align="center" key={sub.id}>
                        {sub.montoAsignado}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ProyectsList = () => {
  const $ = useStyles();

  const [proyects, setProyects] = useState([]);

  useEffect(() => {
    async function getProyects() {
      const proyectos = await getProyectsForAdmin();

      setProyects(proyectos);
    }
    getProyects();
  }, []); //only de first render

  return (
    <>
      <h1>Proyectos</h1>
      <TableContainer className={$.container} component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHead>
            <StyledTableCell />
            <StyledTableCell className={$.textColor}>Proyecto</StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Convocatoria
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Director
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Presupuesto Total
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Gastado
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Remanente
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Fecha de Inicio
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Convocatoria
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Presupuesto total
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Gastado
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Remanente
            </StyledTableCell>
          </StyledTableHead>
          <TableBody>
            {proyects.map((proyecto) => (
              <StyledTableRow key={proyecto.id}>
                <StyledTableCell scope="row" to={'/proyectos'}>
                  {proyecto.titulo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {proyecto.director}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {proyecto.fechaInicio}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '95%',
  },
  textColor: {
    color: 'white',
    fontWeight: 'bold',
  },
  textColorHistoric: {
    fontWeight: 'bold',
  },
  tableCellContent: {
    maxWidth: '10vw',
  },
});

export default ProyectsList;
