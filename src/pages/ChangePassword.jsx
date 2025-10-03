import ChangePasswordForm from "../components/ChangePasswordForm";
import DefaultLayout from "./layouts/default";

const ChangePasswordPage = () => {
  return (
    <DefaultLayout
      breadcrumbs={[
        {
          title: "Inicio",
          href: "/dashboard",
        },
        {
          title: "Cambiar contraseña",
          // href: "/change-password",
        },
      ]}
    >
      <section className="flex-1 flex justify-center items-center">
        <ChangePasswordForm />
      </section>
    </DefaultLayout>
  );
};

export default ChangePasswordPage;
