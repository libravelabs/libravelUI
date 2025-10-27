"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/ui/description-list";
import { Badge } from "@/components/ui/badge";

export default function CardDescriptionList() {
  return (
    <Card className="min-w-xl">
      <CardHeader>
        <CardTitle>Deployment: container-api-prod</CardTitle>
        <CardDescription>
          Live deployment info on production cluster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DescriptionList>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <Badge variant="success">Running</Badge>
          </DescriptionDetails>

          <DescriptionTerm>Cluster</DescriptionTerm>
          <DescriptionDetails>gke-prod-europe-west1</DescriptionDetails>

          <DescriptionTerm>Image</DescriptionTerm>
          <DescriptionDetails>
            ghcr.io/myorg/api@sha256:72f9c...
          </DescriptionDetails>

          <DescriptionTerm>Replicas</DescriptionTerm>
          <DescriptionDetails>5 desired / 5 available</DescriptionDetails>

          <DescriptionTerm>Last Deployed</DescriptionTerm>
          <DescriptionDetails>
            2025-10-13 09:41 UTC (by @dev.mika)
          </DescriptionDetails>

          <DescriptionTerm>Environment Variables</DescriptionTerm>
          <DescriptionDetails>
            <ul>
              <li>NODE_ENV=production</li>
              <li>SENTRY_DSN=******</li>
              <li>LOG_LEVEL=info</li>
            </ul>
          </DescriptionDetails>

          <DescriptionTerm>Health Check</DescriptionTerm>
          <DescriptionDetails>/healthz (HTTP 200)</DescriptionDetails>
        </DescriptionList>
      </CardContent>
    </Card>
  );
}
