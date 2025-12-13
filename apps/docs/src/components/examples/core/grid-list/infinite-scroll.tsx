import {
  GridList,
  GridListCollection,
  GridListItem,
  GridListLoadMore,
} from "@/components/ui/core/grid-list";
import { ProgressSpinner } from "@/components/ui/core/progress";
import { useAsyncList } from "react-stately";

interface Planets {
  name: string;
}

export default function InfiniteScroll() {
  const list = useAsyncList<Planets>({
    async load({ signal, cursor }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      const res = await fetch(
        cursor || `https://swapi.py4e.com/api/planets/?search=`,
        {
          signal,
        }
      );
      const json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <GridList multiple aria-label="Async loading ListView example">
      <GridListCollection items={list.items}>
        {(item) => <GridListItem id={item.name}>{item.name}</GridListItem>}
      </GridListCollection>
      <GridListLoadMore
        onLoadMore={list.loadMore}
        isLoading={list.loadingState === "loadingMore"}
      >
        <ProgressSpinner
          className="mx-auto my-4"
          isIndeterminate
          aria-label="Loading more..."
        />
      </GridListLoadMore>
    </GridList>
  );
}
