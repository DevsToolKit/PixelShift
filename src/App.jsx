import React, { useContext } from "react";
import DashBoard from "./app/DashBoard";
import { AppContext } from "./context/AppContext";
import AddNewDeviceModal from "./components/modal/AddNewDeviceModal";

function App() {
  const { showAddDeviceModal, setShowAddDeviceModal } = useContext(AppContext);
  return (
    <>
      <main className="">
        <DashBoard />
      </main>
      {showAddDeviceModal && <AddNewDeviceModal />}
    </>
  );
}

export default App;
