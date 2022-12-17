import { RouterProvider } from "react-router-dom";
import { createContext } from '@wordpress/element';
import { router } from "./router";
import { store } from './store'
import { Provider } from 'react-redux'

export const AppLocalizeContext = createContext(window.wptAppLocalizer);

const App = () => {
  return(
    <AppLocalizeContext.Provider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppLocalizeContext.Provider>
  )
}

export default App