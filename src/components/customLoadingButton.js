import { useEffect } from "react";

function CustomLoadingButton({ isLoading, setIsLoading, buttonComponent }) {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        buttonComponent
      )}
    </>
  );
}

export { CustomLoadingButton };
