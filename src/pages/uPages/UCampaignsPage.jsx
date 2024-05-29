import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import { Typography, Card, Divider } from "antd";

import EnhancedTable from "@/components/data-table/uCampaignsTable"

export default function UCampaignsPage() {

  return (
    <DashboardLayout>
    <>
      <Card
        title={<Typography.Title level={1}>
          Campaigns
          <Divider />
        </Typography.Title>}
        bordered={false}
        style={{
          width: '100%',
          borderBottom: '0 2px solid rgba(0, 0, 0, 0.1)', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div>
            <EnhancedTable/>
        </div>

      </Card>
    </>
    </DashboardLayout>
  )
}
