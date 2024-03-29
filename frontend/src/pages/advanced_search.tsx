import { useState } from "react";
import AdvancedSearchContent from "../components/advanced_search/advanced_search_content";
import AdvancedSearchForm from "../components/advanced_search/advanced_search_form";
import BackdropComponent from "../components/backdrop_component";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function AdvancedSearch() {
  const [queries, setQueries] = useState<string[]>([]);
  const [queriesWithID, setQueriesWithID] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  useHandleSection({ section: "advanced-search" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} />
        <SectionTitle
          title="Advanced Search"
          description="Advanced Search for the Peptipedia Database."
        />

        <AdvancedSearchForm
          queries={queries}
          setQueries={setQueries}
          queriesWithID={queriesWithID}
          setQueriesWithID={setQueriesWithID}
          counts={counts}
          setCounts={setCounts}
          setOpenBackdrop={setOpenBackdrop}
        />

        {queries.length > 0 && (
          <AdvancedSearchContent
            counts={counts}
            queries={queries}
            queriesWithID={queriesWithID}
            setOpenBackdrop={setOpenBackdrop}
            setCounts={setCounts}
            setQueries={setQueries}
            setQueriesWithID={setQueriesWithID}
          />
        )}
      </>
    </Layout>
  );
}
