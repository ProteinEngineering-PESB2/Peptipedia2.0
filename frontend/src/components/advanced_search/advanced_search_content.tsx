import { useEffect } from "react";

interface Props {
  queries: string[];
  queriesWithID: string[];
  counts: number[];
}

export default function AdvancedSearchContent({
  counts,
  queries,
  queriesWithID,
}: Props) {
  useEffect(() => {
    console.log(counts);
    console.log(queries);
    console.log(queriesWithID);
  }, [queries, queriesWithID, counts]);

  return <></>;
}
