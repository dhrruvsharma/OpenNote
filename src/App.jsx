import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dash from "./Components/Dash"
import "./App.css"
import Dashboard from "./Components/Dashboard/Dashboard"
import Create from "./Components/Create/Create"
import Test from "./Test"

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />}>
          <Route path="create" element={<Create />} />
          <Route path="" element={<Dash />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;