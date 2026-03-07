"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Button } from "@/components/ui/core/button";

export default function ActionableCard() {
  return (
    <Card variant="gradient" className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          Manage and view customer details with available actions aligned to the
          right.
        </CardDescription>
        <CardAction>
          <Button size="sm" tone="outline">
            + Add Customer
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
