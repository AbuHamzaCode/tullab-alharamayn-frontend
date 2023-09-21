import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';
import Main from './pages';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'PlusJakartaText',
      textTransform: 'none',
    },
  },
  palette: {
    mode: 'light',
    secondary: {
      light: '#757575',
      main: '#2E2A40',
      dark: '#0C0407',
      contrastText: '#fff',
    },
    primary: {
      light: '#BBA0F3',
      main: '#AE8EF1',
      dark: '#7842E8',
      contrastText: '#fff',
    },
    error: {
      light: '#FD7561',
      main: '#FC372D',
      dark: '#780828',
      contrastText: '#fff',
    },
    success: {
      light: '#78E672',
      main: '#46D64B',
      dark: '#0D6630',
      contrastText: '#fff',
    },
    info: {
      light: '#6692FB',
      main: '#3469F9',
      dark: '#091B77',
      contrastText: '#fff',
    },
    warning: {
      light: '#FFCD3F',
      main: '#FFB600',
      dark: '#7A4800',
      contrastText: '#fff',
    }

  }
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router basename={'/'}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Main />
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
