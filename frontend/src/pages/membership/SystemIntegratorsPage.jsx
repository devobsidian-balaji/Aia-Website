import React from "react";
import MembershipAudiencePage from "../../components/membership/MembershipAudiencePage";
import { membershipAudienceData } from "../../data/membershipAudienceData";

export default function SystemIntegratorsPage() {
  return (
    <MembershipAudiencePage
      data={membershipAudienceData.systemIntegrators}
    />
  );
}