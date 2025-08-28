import { Tabs } from "antd";
import StaffingSolutions from "./StaffingSolutions";

const { TabPane } = Tabs;

export default function TabbedViewStaff() {
  return (
    <>
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
