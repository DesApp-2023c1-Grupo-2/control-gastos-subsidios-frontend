# Repositorio Control Gastos de subsidios :seedling:

## comandos GIT

```
git branch -M dev # Cambia el nombre de la rama actual a dev
git remote add origin # Agrega el repositorio remoto
git push -u origin dev # publica los cambios al repositorio remoto
git pull origin dev # Descarga los cambios del repositorio remoto
git branch -d dev # Elimina la rama dev
git branch --nombreRama # Crea una rama
git branch -m "nombreRama viejo"  "nombreRama nuevo"# Cambia el nombre de la rama
git checkout "nombreRama" # Cambia a la rama nombreRama

```

### comandos GIT merge

```
git diff "rama1" "rama2" # Muestra las diferencias entre dos ramas
git merge --abort # Aborta el merge
para hacer un merge hay que estar parado en la rama desactualizada.
luego correr el comando git merge "rama-origen" "rama-destino"
git merge "rama-origen" "rama-destino" # Fusiona dos ramas
despues git add . y git commit -m "mensaje"
para commitear el merge
y despues git push origin HEAD:Dev
```

### Sacar las flechitas de los campos de numeros

```
se agrega el estilo en el useStyle:

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
```
