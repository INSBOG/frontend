const passwordValidator = (form, confirm = false) => {
  return (rule, value) => {
    if (!value) return Promise.reject("Este valor es requerido");

    if (/\w{8,}/.exec(value) === null) {
      return Promise.reject("La contraseña debe tener al menos 8 caracteres");
    }

    if (value !== form.getFieldValue("new_password") && confirm) {
      return Promise.reject("Las contraseñas no coinciden");
    }

    return Promise.resolve();
  };
};

export { passwordValidator };
