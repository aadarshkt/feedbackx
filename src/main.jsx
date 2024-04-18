import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App.jsx";
import ErrorPage from "./error-page.jsx";
import { Auth0ProviderWithNavigate } from "./utilities/auth0-provider-with-navigation.jsx";
import { Provider } from "react-redux";
import { store } from "./store/configureStore.js";

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
