import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PersistGate } from 'redux-persist/integration/react';

import './App.scss';
import Main from './pages';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'PlusJakartaText',
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#607d8b',
    },
    background: {
      default: '#fff',
      paper: '#ffffff',
    },
  },
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
