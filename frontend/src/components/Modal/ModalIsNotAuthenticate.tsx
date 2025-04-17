import { Button } from "antd";
import useAuthStore from "@/store/auth";
import ModalWrapper from "./ModalWrapper";
import Logo from "../../assets/icon/401.svg";

const ModalIsNotAuthenticate = () => {
  const { logout, isNotAuthenticate } = useAuthStore((state) => state);

  const handleLogout = async () => {
    logout();
  };

  return (
    <ModalWrapper
      onClose={() => {}}
      open={isNotAuthenticate}
      closable={false}
      title=""
    >
      <div className="flex flex-col justify-center items-center gap-4 my-5">
        <img src={Logo} alt={Logo} className="w-52 h-52" />
        <div className="text-center">
          <p className="text-3xl font-semibold">Your Session has expired</p>
          <p>Please login again, your credentials is expired</p>
        </div>

        <Button size="large" type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ModalIsNotAuthenticate;
