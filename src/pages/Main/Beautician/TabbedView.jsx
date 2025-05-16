import { Tabs } from "antd";
import React from "react";
import Beautician from "./Beautician";

const { TabPane } = Tabs;

export default function TabbedView() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<span className="font-bold text-xl">Pending</span>}
          key="1"
        >
          <Beautician status="pending" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Approved</span>}
          key="2"
        >
          <Beautician status="approved" />
        </TabPane>
      </Tabs>
    </div>
  );
}
