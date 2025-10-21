"use client";

import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/ui/description-list";
import { Heading } from "@/components/ui/heading";

export function BasicDescriptionListBase() {
  return (
    <div>
      <Heading>Deployment Details</Heading>
      <DescriptionList>
        <DescriptionTerm>Project Name</DescriptionTerm>
        <DescriptionDetails>LibraLabs API Service</DescriptionDetails>

        <DescriptionTerm>Project ID</DescriptionTerm>
        <DescriptionDetails>libra-api-prod-3f92c1</DescriptionDetails>

        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>Active</DescriptionDetails>

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

export const BasicDescriptionListCode = `"use client";

import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/ui/description-list";

export function BasicDescriptionList() {
  return (
    <div>
      <Heading>Deployment Details</Heading>
      <DescriptionList>
        <DescriptionTerm>Project Name</DescriptionTerm>
        <DescriptionDetails>LibraLabs API Service</DescriptionDetails>

        <DescriptionTerm>Project ID</DescriptionTerm>
        <DescriptionDetails>libra-api-prod-3f92c1</DescriptionDetails>

        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>Active</DescriptionDetails>

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
`;
