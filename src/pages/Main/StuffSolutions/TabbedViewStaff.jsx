import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import StaffingSolutions from "./StaffingSolutions";

const { TabPane } = Tabs;

export default function TabbedViewStaff() {
  // const navigate = useNavigate();

  return (
    <>
      {/* <div className="flex justify-end mr-4">
        <button
          onClick={() => navigate(`/add-staff`)}
          className="text-white border bg-primary rounded-full px-6 py-2"
        >
          +Create
        </button>
      </div> */}
      <Tabs defaultActiveKey="1" centered>
        <TabPane
          tab={<span className="font-bold text-xl">Staffing Solutions</span>}
          key="1"
        >
          <StaffingSolutions type="statting_solutions" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Workforce Management</span>}
          key="2"
        >
          <StaffingSolutions type="workforce_solutions" />
        </TabPane>
      </Tabs>
    </>
  );
}
