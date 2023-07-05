import React from 'react';
import { TextField, Grid } from '@material-ui/core';



const Rubro = (props) => {

  return (
    <Grid item xs>
      <TextField
        id={props.rubro.id}
        label={props.rubro.nombre}
        type="number"
        onBlur={(event) => { props.handleSubsidio({ id: event.target.id, monto: event.target.value }) }}
        variant="outlined"
        className={props.className}
      />
    </Grid>
  );
};

export default Rubro;