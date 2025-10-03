import { Ambulance, Bug, Building, LayoutDashboard, SwatchBook, User } from "lucide-react"
import { useState } from "react"
import MenuItem from "../components/MenuItem"
import "./layout.css"

const items = [
    {
        label: "Dashboard",
        to: "/admin",
        icon: <LayoutDashboard size={18} />
    },
    {
        label: "Usuarios",
        icon: <User size={18} />,
        children: [
            {
                label: "Grupos",
                to: "/admin/users/groups",
            },
            {
                label: "Permisos",
                to: "/admin/users/permissions",
            },
            {
                label: "Usuarios",
                to: "/admin/users/users",
            },
        ]
    },
    {
        label: "Localizaziones",
        to: "/admin/locations",
        icon: <Building size={18} />
    },
    {
        label: "Muestras",
        to: "/admin/samples",
        icon: <SwatchBook size={18} />
    },
    {
        label: "Organismos",
        to: "/admin/organisms",
        icon: <Bug size={18} />
    },
    {
        label: "Servicios",
        to: "/admin/services",
        icon: <Ambulance size={18} />
    },

]

// eslint-disable-next-line react/prop-types
const AdminDefaultLayout = ({ children }) => {

    const [openIndex, setOpenIndex] = useState(null)

    const toggleMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <main>
            <header className="bg-white border-b p-4">
                <h1>Admin</h1>
            </header>
            <aside className="bg-white border-r p-4 overflow-y-auto">
                <div className="bg-white flex flex-col gap-2">
                    {items.map((item, index) => (
                        <MenuItem
                            open={openIndex === index}
                            item={item}
                            index={index}
                            key={index}
                            onClick={toggleMenu}
                        />
                    ))}
                </div>
            </aside>
            <section className="bg-gray-100 p-8 overflow-y-auto">{children}</section>
            <footer className="bg-white border-t p-4 text-center">todos los derechos reservados</footer>
        </main>
    )
}

export default AdminDefaultLayout