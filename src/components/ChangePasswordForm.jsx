/* eslint-disable react/prop-types */
import { Alert, Button, Card, Form, Input, Space } from "antd";
import useUserData from "../hooks/auth/useUserData";
import useAuth from "../hooks/useAuth";
import useStore from "../store/app";
import { passwordValidator } from "../validators";

const messages = {
  temp: "Se ha detectado que su contraseña es temporal, por favor debe cambiarla para poder continuar",
  exp: "Su contraseña ha expirado, por favor debe cambiarla para poder continuar",
};

const ChangePasswordForm = ({ temp = false }) => {
  const { form, context, changePassword } = useAuth();
  const { isPasswordExpired } = useUserData();
  const { loading } = useStore();

  return (
    <Card
      style={{
        width: "400px",
      }}
    >
      <Form layout="vertical" form={form} onFinish={changePassword}>
        {context}
        <Space
          direction="vertical"
          size="small"
          style={{
            width: "100%",
          }}
        >
          {temp || isPasswordExpired() ? (
            <Alert
              message="Cambiar contraseña"
              description={isPasswordExpired() ? messages.exp : messages.temp}
              type="warning"
            />
          ) : (
            <Form.Item
              label="Contraseña actual"
              name="old_password"
              rules={[
                {
                  validator: passwordValidator(form),
                },
              ]}
            >
              <Input.Password placeholder="Contraseña actual" autoFocus />
            </Form.Item>
          )}
          <Form.Item
            label="Nueva contraseña"
            name="new_password"
            rules={[
              {
                validator: passwordValidator(form),
              },
            ]}
          >
            <Input.Password placeholder="Nueva contraseña" autoFocus />
          </Form.Item>
          <Form.Item
            label="Confirmar contraseña"
            name="confirm_password"
            rules={[
              {
                validator: passwordValidator(form, true),
              },
            ]}
          >
            <Input.Password placeholder="Confirmar contraseña" />
          </Form.Item>

          <Button type="primary" block htmlType="submit" loading={loading}>
            Cambiar contraseña
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default ChangePasswordForm;
