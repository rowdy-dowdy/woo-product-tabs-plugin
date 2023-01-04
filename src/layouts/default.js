import Header from "../components/header";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation();
  console.log(location.pathname);
  return(
    <div className="ml-[-20px] w-full">
      <Header />
      <div className={`mt-12 ${location.pathname == '/three' ? '' : 'p-4'} `}>
        <Outlet />
      </div>
    </div>
  )
}