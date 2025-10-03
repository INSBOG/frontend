import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import Turnstile from "react-turnstile";
import useAccessKey from "../hooks/useAccessKey";
import useAuth from "../hooks/useAuth";
import useStore from "../store/app";
import { passwordValidator } from "../validators";

// eslint-disable-next-line react/prop-types
const LoginForm = () => {
  const { loading } = useStore();
  const { form, context, onSubmit, SITE_KEY, setToken, token, onUsernameChange, username } = useAuth();

  const { authenticate } = useAccessKey({
    username
  })

  return (
    <Card
      style={{
        width: "348px",
      }}
    >
      <Form
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        className="w-full"
        onValuesChange={onUsernameChange}
      >
        {context}
        <Typography.Title level={3} className="text-center block my-8">
          Iniciar sesión
        </Typography.Title>

        <Form.Item
          label="Usuario"
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su usuario",
            },
          ]}
        >
          <Input
            autoComplete="off"
            placeholder="Usuario"
            autoFocus
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              validator: passwordValidator(form, false),
            },
          ]}
        >
          <Space direction="vertical" className="w-full">
            <Input.Password placeholder="Contraseña" size="large" />
            <div className="text-right mt-3 bg-green-600 block p-2">
              <Link to="/forgot-password">Olvidé mi contraseña</Link>
            </div>
          </Space>
        </Form.Item>


        <Space direction="vertical" className="w-full">
          <Button
            type="primary"
            block
            htmlType="submit"
            loading={loading}
            size="large"
            className="mt-4"
            disabled={!token}
          >
            Ingresar
          </Button>
          {window.PublicKeyCredential &&
            <Button
              className="mt-4"
              block size="large"
              icon={<KeyRound />}
              onClick={authenticate}
              disabled={!token}
            >
              Ingresar con llave de acceso
            </Button>
          }
        </Space>
        <Divider />
        <Turnstile theme="light" sitekey={SITE_KEY} onVerify={setToken} />
      </Form>
      {/* <Link to="/forgot-password" className="text-blue-400 block mb-4">
        Olvidé mi contraseña
      </Link> */}
    </Card>
  );
};

export default LoginForm;
