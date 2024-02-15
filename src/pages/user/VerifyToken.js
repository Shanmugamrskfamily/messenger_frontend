import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyToken() {
  const { activationtoken } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activationtoken) {
      // Token not found in params
      toast.error("Activation token not found.");
      navigate("/");
      return;
    }

    fetch(`https://messenger-backend-nr0d.onrender.com/user/activate`, {
      method: "POST",
      headers: {
        activationtoken:`${activationtoken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Activation failed.");
        }
        return response.json();
      })
      .then((data) => {
        // Activation successful
        toast.success(data.message);
        navigate("/");
      })
      .catch((error) => {
        // Error during activation
        toast.error("Activation failed.");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activationtoken, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return null; 
}

export default VerifyToken;
