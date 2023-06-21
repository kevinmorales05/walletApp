import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './reactRedux';
import {AlertContextProvider, LoadingContextProvider} from './context';
import NavContainer from './routes/NavContainer';
import './i18n';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LoadingContextProvider>
        <AlertContextProvider>
          <NavContainer />
        </AlertContextProvider>
      </LoadingContextProvider>
    </PersistGate>
  </Provider>
);

export default App;
