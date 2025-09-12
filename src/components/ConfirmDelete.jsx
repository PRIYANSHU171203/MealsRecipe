import { toast } from "react-hot-toast";

export const ConfirmDeleteToast = ({ onConfirm, message = "Are you sure you want to delete?" }) => {
  return toast.custom(
    (t) => (
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg w-80 mx-auto text-center">
        <p className="font-medium">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={async () => {
              await onConfirm();
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,   // stays until user clicks
      position: "top-center",
    }
  );
};
