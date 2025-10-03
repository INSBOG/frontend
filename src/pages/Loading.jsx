import { Spin } from "antd"

const Loading = () => {
  return (
    <main className="absolute w-full h-screen z-10 bg-white flex justify-center items-center">
        <Spin size="large" tip="Cargando, por favor espere..." />
    </main>
  )
}

export default Loading