import { Botones } from './componentes/Botones'
import { TablaDataGrid } from './componentes/DataGrid'
import { Formularios } from './componentes/Formularios'
import { UsuariosApi } from './componentes/UsuariosApi'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'


const tema = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000'
    },
    secondary: {
      main: '#00FF00'
    },
    background: {
      default: '#000000'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#000000'
    },
  }
})

function App() {

  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Botones />
      <Formularios />
      <TablaDataGrid />
      <UsuariosApi />
      
    </ThemeProvider>
  )
}

export default App
