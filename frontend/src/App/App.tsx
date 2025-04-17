import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/publicRoutes";
import { privateRoutes } from "./routes/privateRoutes";
import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "@/utils/auth";
import Error404 from "@/modules/errorPages/Error404";

import MainLayout from "@/Layouts/MainLayout";
import AppInfoView from "@/components/AppInfoView";
import TanstackQueryProvider from "@/lib/TanstackQueryProvider";

function App() {
  return (
    <>
      <TanstackQueryProvider>
        <BrowserRouter>
          <Routes>
            {isAuthenticated()
              ? privateRoutes.map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <MainLayout>
                        <PrivateRoute isAuthenticated={isAuthenticated()}>
                          {element}
                        </PrivateRoute>
                      </MainLayout>
                    }
                  />
                ))
              : publicRoutes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}

            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <AppInfoView />
      </TanstackQueryProvider>
    </>
  );
}

export default App;
