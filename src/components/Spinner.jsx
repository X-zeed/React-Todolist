import { BarLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <BarLoader color="#3b82f6" size={20} loading={loading} />
    </div>
  );
};

export default Spinner;
