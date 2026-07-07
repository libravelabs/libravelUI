"use client";

import * as React from "react";
import { Badge } from "@/components/ui/core/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import {
  Boxes,
  CircleDollarSign,
  Package,
  TriangleAlert,
  TrendingUp,
} from "lucide-react";
import type { Product } from "../products";

export function CardsSection({ data: products }: { data: Product[] }) {
  const stats = React.useMemo(() => {
    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, product) => sum + product.stock,
      0,
    );

    const inventoryValue = products.reduce(
      (sum, product) => sum + product.stock * product.price,
      0,
    );

    const categories = new Set(products.map((product) => product.category))
      .size;

    const lowStockItems = products.filter(
      (product) => product.stock < 500,
    ).length;

    const averageStock =
      totalProducts > 0 ? Math.round(totalStock / totalProducts) : 0;

    return {
      totalProducts,
      totalStock,
      inventoryValue,
      categories,
      lowStockItems,
      averageStock,
    };
  }, [products]);

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalProducts.toLocaleString()}
          </CardTitle>

          <CardAction>
            <Badge tone="outline">
              <Package className="size-3.5" />
              {stats.categories} Categories
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Active catalog inventory
            <TrendingUp className="size-4" />
          </div>

          <div className="text-muted-foreground">
            Distributed across {stats.categories} categories
          </div>
        </CardFooter>
      </Card>

      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Total Stock</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalStock.toLocaleString()}
          </CardTitle>

          <CardAction>
            <Badge tone="outline">
              <Boxes className="size-3.5" />
              Avg {stats.averageStock.toLocaleString()}
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Inventory ready for fulfillment
          </div>

          <div className="text-muted-foreground">
            Average {stats.averageStock.toLocaleString()} units per product
          </div>
        </CardFooter>
      </Card>

      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Inventory Value</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currency.format(stats.inventoryValue)}
          </CardTitle>

          <CardAction>
            <Badge tone="outline">
              <CircleDollarSign className="size-3.5" />
              Assets
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Estimated inventory valuation
          </div>

          <div className="text-muted-foreground">
            Based on current stock and unit prices
          </div>
        </CardFooter>
      </Card>

      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Low Stock Risk</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.lowStockItems.toLocaleString()}
          </CardTitle>

          <CardAction>
            <Badge tone={stats.lowStockItems > 10 ? "destructive" : "outline"}>
              <TriangleAlert className="size-3.5" />
              Attention
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Products below reorder threshold
          </div>

          <div className="text-muted-foreground">
            Items with stock lower than 500 units
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
