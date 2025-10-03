import { Card, Tree } from "antd"
import AdminDefaultLayout from "../layouts/default"
import { Ambulance, Bug, Building, ChartArea, User } from "lucide-react"

const Permisions = () => {
    return (
        <AdminDefaultLayout>
            <Card>

                <Tree showIcon defaultExpandAll checkable showLine selectable={false} treeData={[
                    {
                        title: "Admin",
                        key: "admin",
                        children: [
                            {
                                title: "Usuarios",
                                key: "users",
                                icon: <User size={20} />,
                                children: [
                                    {
                                        title: "Permisos",
                                        key: "permissions-1",
                                    },
                                    {
                                        title: "Grupos",
                                        key: "groups-1"
                                    },
                                    {
                                        title: "Usuarios",
                                        key: "users-1",
                                        children: [
                                            {
                                                title: "Crear usuarios",
                                                key: "create-users"
                                            },
                                            {
                                                title: "Eliminar usuarios",
                                                key: "delete-users"
                                            },
                                            {
                                                title: "Editar usuarios",
                                                key: "edit-users"
                                            },
                                            {
                                                title: "Ver usuarios",
                                                key: "view-users"
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                title: "Localizaciones",
                                key: "locations",
                                icon: <Building size={20} />
                            },
                            {
                                title: "Muestras",
                                key: "samples",
                                icon: <ChartArea size={20} />
                            },
                            {
                                title: "Organismos",
                                key: "organisms",
                                icon: <Bug size={20} />
                            },
                            {
                                title: "Servicios",
                                key: "services",
                                icon: <Ambulance size={20} />
                            }
                        ]
                    }
                ]} />
            </Card>
        </AdminDefaultLayout>
    )
}

export default Permisions