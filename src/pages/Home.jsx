import ChangePasswordForm from "../components/ChangePasswordForm";
import LoginForm from "../components/LoginForm";
import useUserData from "../hooks/auth/useUserData";
import DefaultLayout from "./layouts/default";

const HomePage = () => {
  const { user } = useUserData();
  return (
    <DefaultLayout>
      <section className="flex-1 flex justify-center items-center">
        {user?.temp_password ? <ChangePasswordForm temp /> : <LoginForm />}
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
