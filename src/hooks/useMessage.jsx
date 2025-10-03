import { message } from "antd";

const useMessage = () => {
  const [api, context] = message.useMessage();

  const params = {
    duration: 5,
  };

  const showErrorMessage = (msg) => {
    api.error({
      ...params,
      content: msg,
      type: "error",
    });
  };

  const showSuccessMessage = (msg) => {
    api.success({
      ...params,
      content: msg,
      type: "success",
    });
  };

  return {
    context,
    showErrorMessage,
    showSuccessMessage,
  };
};

export default useMessage;
