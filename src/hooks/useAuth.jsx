import { Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTurnstile } from "react-turnstile";
import useCaptcha from "../hooks/useCaptcha";
import apiInstance from "../instances";
import useStore from "../store/app";
import InvalidCaptchaError from "../types/invalidCaptchaError";
import useSignIn from "./auth/useSignIn";
import useUserData from "./auth/useUserData";
import useMessage from "./useMessage";

/**
 *
 * @param {import("antd").FormInstance} form
 * @returns
 */
const useAuth = () => {
  const [form] = Form.useForm();
  const { context, showErrorMessage, showSuccessMessage } = useMessage();
  const { setLoading } = useStore();
  const { user, checkSession } = useUserData();
  const { handleValidate, SITE_KEY, captchaRef, setToken, token } =
    useCaptcha();
  const turnstile = useTurnstile();

  const signIn = useSignIn();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const onUsernameChange = (changedValues) => {
    if (changedValues.username) setUsername(changedValues.username);

  }

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const { success } = await handleValidate();

      if (!success) throw new InvalidCaptchaError("Captcha inválido");

      await apiInstance.post("/api/login", values);
      await signIn();
      form.resetFields();
    } catch (err) {
      const message =
        err instanceof InvalidCaptchaError
          ? err.toString()
          : err.response?.data?.error;
      showErrorMessage(message);
      await turnstile.reset();
      form.setFieldValue("password", "");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    const data = form.getFieldsValue();
    setLoading(true);
    apiInstance
      .put("/api/change-password", {
        user_id: user?._id || user?.id,
        new_password: data.new_password,
        old_password: data.old_password,
      })
      .then(async ({ data }) => {
        form.resetFields();
        await checkSession();
        navigate("/dashboard");
        showSuccessMessage(data?.message);
      })
      .catch((error) => {
        showErrorMessage(error.response.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    form,
    context,
    user,
    onSubmit,
    changePassword,
    handleValidate,
    SITE_KEY,
    captchaRef,
    turnstile,
    setToken,
    token,
    username,
    onUsernameChange
  };
};

export default useAuth;
