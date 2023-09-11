import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:3/5 lg:w-2/5 bg-white shadow rounded-md px-10 py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
