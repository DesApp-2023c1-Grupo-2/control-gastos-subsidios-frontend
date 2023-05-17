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
//Julian 16/5
import { listaProyectosAdmin } from '../../constants/constants';

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
          </StyledTableHead>
          <TableBody>
            {listaProyectosAdmin.map((listaProyectosAdmin) => (
              <StyledTableRow key={listaProyectosAdmin.titulo}>
                <StyledTableCell scope="row" className={$.tableCellContent}>
                  {listaProyectosAdmin.titulo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaProyectosAdmin.convocatoria}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaProyectosAdmin.director}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaProyectosAdmin.presupuestoTotal}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaProyectosAdmin.presupuestoGastado}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaProyectosAdmin.presupuestoRemanente}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaProyectosAdmin.fechaInicio}
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
