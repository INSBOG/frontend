import useNotification from "antd/es/notification/useNotification";

const useAlert = () => {
  const [api, contextHolder] = useNotification();

  const defaultValues = {
    duration: 3,
    placement: "topRight",
  };

  const showSuccessMessage = (message, options = {}) => {
    api.success({
      ...defaultValues,
      ...options,
      message,
    });
  };

  const showErrorMessage = (message, options = {}) => {
    api.error({
      ...defaultValues,
      ...options,
      message,
    });
  };

  const showWarningMessage = (message, options = {}) => {
    api.warning({
      ...defaultValues,
      ...options,
      message,
    });
  };

  const showInfoMessage = (message, options = {}) => {
    api.info({
      ...defaultValues,
      ...options,
      message,
    });
  };

  return {
    showSuccessMessage,
    showErrorMessage,
    showWarningMessage,
    showInfoMessage,
    context: contextHolder,
  };
};

export default useAlert;
