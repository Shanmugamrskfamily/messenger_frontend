import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

function VerifyForgotPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/user/reset-password/${resetToken}`);
        console.log('ReserToken:',resetToken);
        console.log('Response',response);
        debugger;
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          navigate(`/change-password/${resetToken}`);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    verifyResetToken();
  }, [resetToken, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <CircularProgress />
      ) : null}
    </div>
  );
}

export default VerifyForgotPassword;
