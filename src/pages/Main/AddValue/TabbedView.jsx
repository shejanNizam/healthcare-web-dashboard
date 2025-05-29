import { Tabs } from "antd";
import AddValue from "./AddValue";

const { TabPane } = Tabs;

export default function TabbedView() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<span className="font-bold text-xl">Category</span>}
          key="1"
        >
          {/* <AvailableSession type="available" /> */}
          <AddValue type="Category" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Profession</span>}
          key="2"
        >
          {/* <AvailableSession type="expired" /> */}
          <AddValue type="Profession" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Discipline</span>}
          key="3"
        >
          {/* <AvailableSession type="available" /> */}
          <AddValue type="Discipline" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Specialty</span>}
          key="4"
        >
          {/* <AvailableSession type="expired" /> */}
          <AddValue type="Specialty" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">License type</span>}
          key="5"
        >
          {/* <AvailableSession type="expired" /> */}
          <AddValue type="License" />
        </TabPane>
      </Tabs>
    </div>
  );
}
