"use client";

import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/ui/core/description-list";
import { Heading } from "@/components/ui/core/heading";
import { Badge } from "@/components/ui/core/badge";

export default function BasicDescriptionList() {
  return (
    <div>
      <Heading>Deployment Details</Heading>
      <DescriptionList>
        <DescriptionTerm>Project Name</DescriptionTerm>
        <DescriptionDetails>LibravelLabs API Service</DescriptionDetails>

        <DescriptionTerm>Project ID</DescriptionTerm>
        <DescriptionDetails>libravel-api-prod-3f92c1</DescriptionDetails>

        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>
          <Badge tone="success">Active</Badge>
        </DescriptionDetails>

        <DescriptionTerm>Created At</DescriptionTerm>
        <DescriptionDetails>June 22, 2024</DescriptionDetails>

        <DescriptionTerm>Last Deployment</DescriptionTerm>
        <DescriptionDetails>October 9, 2025 at 16:45 UTC</DescriptionDetails>

        <DescriptionTerm>Region</DescriptionTerm>
        <DescriptionDetails>Asia Pacific (Singapore)</DescriptionDetails>

        <DescriptionTerm>Environment</DescriptionTerm>
        <DescriptionDetails>Production</DescriptionDetails>
      </DescriptionList>
    </div>
  );
}
