import { useParams } from "react-router-dom";
import { Breadcrumb, PageLayout } from "components/common/index";
import { SidebarFilter } from "components/ui/index";
import { ProductsOnCategories } from "components/sections/index";
import { PaginationProvider } from "store";

const Categories = () => {
  const { categoriesId } = useParams<{ categoriesId: string }>();
  const breadcrumb = categoriesId
    ? [
        {
          name: "Home",
          path: "/home",
        },
        {
          name: "Categories",
          path: "/categories",
        },
        {
          name: categoriesId,
          path: "",
        },
      ]
    : [
        {
          name: "Home",
          path: "/home",
        },
        {
          name: "Categories",
          path: "",
        },
      ];

  return (
    <PageLayout>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div style={{ display: "flex" }}>
        <SidebarFilter category={categoriesId} />
        <PaginationProvider>
          <ProductsOnCategories />
        </PaginationProvider>
      </div>
    </PageLayout>
  );
};

export default Categories;
