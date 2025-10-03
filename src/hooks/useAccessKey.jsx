import { startAuthentication, startRegistration } from "@simplewebauthn/browser"
import Swal from "sweetalert2"
import apiInstance from "../instances"
import useSignIn from "./auth/useSignIn"
import useUserData from "./auth/useUserData"

const useAccessKey = ({
    username = ""
}) => {

    const { user } = useUserData()
    const signIn = useSignIn()

    const register = async () => {
        try {
            const { data } = await apiInstance.post("/api/access-key/register-options", {
                user_id: user?.id,
                user_name: user?.username,
                rp_id: "localhost",
                rp_name: "depurador"
            })
            const credential = await startRegistration(data)

            await apiInstance.post("/api/access-key/register", {
                credential,
                user_name: data.user.name,
                rp_id: data.rp.id,
                challenge: data.challenge
            })
            Swal.fire("Exito", "Llave de acceso registrada", "success")
        } catch (error) {
            console.error(error)
            Swal.fire("Error", "Error al registrar la llave de acceso", "error")
        }
    }

    const authenticate = async () => {
        try {
            if (!username) {
                Swal.fire("Atención", "Ingrese un nombre de usuario", "warning")
                return
            }

            const { data } = await apiInstance.post("/api/access-key/authenticate-options", {
                username,
            })
            const assertion = await startAuthentication(data)

            console.log("assertion", assertion)

            const { data: result } = await apiInstance.post("/api/access-key/authenticate", assertion)

            Swal.fire("Exito", result.message, "success")

            signIn()
        } catch (error) {
            console.error(error)
            Swal.fire("Error", "Error al autenticar la llave de acceso", "error")
        }

    }

    return {
        register,
        authenticate,
    }
}

export default useAccessKey