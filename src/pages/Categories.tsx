import { useParams } from "react-router-dom";
import { Breadcrumb, PageLayout } from "components/common/index";
import { SidebarFilter } from "components/ui/index";

const Categories = () => {
  const { categoriesId } = useParams<{ categoriesId: string }>();

  return (
    <PageLayout>
      <Breadcrumb
        breadcrumb={[
          { name: "Home", path: "/home" },
          { name: categoriesId!, path: "" },
        ]}
      />
      <SidebarFilter category={categoriesId} />
    </PageLayout>
  );
};

export default Categories;
