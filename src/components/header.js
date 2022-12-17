import { NavLink } from "react-router-dom";

const headerStyle = {
  width: 'calc(100% - 160px)',
  height: '48px',
  top: '32px',
  zIndex: 1001
}

const activeStyle = {
  color: 'rgb(37, 99, 235)',
  borderColor: 'rgb(37, 99, 235)'
}

export default () => {
  return (
    <div className="fixed flex items-center space-x-4 border-b-2 border-white px-4 py-4 bg-white shadow" style={headerStyle}>
      <NavLink
        to="/"
        className="font-semibold text-base"
        style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/settings"
        className="font-semibold text-base"
        style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }
      >
        Settings
      </NavLink>

      <NavLink
        to="/three"
        className="font-semibold text-base"
        style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }
      >
        Three
      </NavLink>
    </div>
  )
}