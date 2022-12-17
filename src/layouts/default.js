import Header from "../components/header";
import { Outlet } from "react-router-dom";

export default () => {
  return(
    <div className="ml-[-20px] w-full">
      <Header />
      <div className="mt-12 p-4">
        <Outlet />
      </div>
    </div>
  )
}