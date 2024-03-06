import ChangePassword from "../../components/ChangePassword";

function PasswordResetPage() {
  
  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-5">Lets Change your Password</h1>
      <div className="bg-white rounded-lg p-5 max-w-md w-full">
        <img src='/images/logo.gif' alt="Messenger App" className="w-full mb-1" />
        <ChangePassword />
      </div>
    </div>
  );
}

export { PasswordResetPage };
