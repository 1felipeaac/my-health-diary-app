import LayoutMain from "./pages/layout-main"
import {BrowserRouter, Routes, Route} from "react-router"
import PageDB from "./pages/page-db"
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route index element={<PageDB/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

