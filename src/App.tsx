import { Outlet } from "react-router"
import CommonLayouts from "./components/Layouts/CommonLayouts"

const App = () => {
  return (
    <CommonLayouts>
      <Outlet/>
    </CommonLayouts>
  )
}

export default App