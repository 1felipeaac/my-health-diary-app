import LayoutMain from "./pages/layout-main"
import {BrowserRouter, Routes, Route} from "react-router"
import PageDB from "./pages/page-db"
import PageHistory from "./pages/page-history"
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route index element={<PageDB/>}/>
          <Route path="/historico" element={<PageHistory/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

