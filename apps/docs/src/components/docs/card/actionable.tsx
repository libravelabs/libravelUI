"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ActionableCard() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          Manage and view customer details with available actions aligned to the
          right.
        </CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            + Add Customer
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
