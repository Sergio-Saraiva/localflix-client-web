import { NavLink, Outlet } from 'react-router-dom'

export default function LayoutComponent() {
  return (
    <div>
        <nav className="bg-gray-800 text-white p-4">
          <NavLink to="/" className="text-xl font-bold">LocalFlix</NavLink>
        </nav>
        <Outlet />
    </div>
  )
}

