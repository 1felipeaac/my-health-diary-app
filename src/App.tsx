import LayoutMain from "./pages/layout-main"
import PageComponents from "./pages/page-componets"
import {BrowserRouter, Routes, Route} from "react-router"
import PageHome from "./pages/page-home"
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route index element={<PageHome/>}/>
          <Route path="/componentes" element={<PageComponents/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

