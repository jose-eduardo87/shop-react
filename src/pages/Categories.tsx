import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, PageLayout } from "components/common/index";
import { SidebarFilter } from "components/ui/index";
import { ProductsOnCategories } from "components/sections/index";
import { PaginationProvider } from "store";
import { ITEMS } from "helpers/constants";

const Categories = () => {
  const { categoriesId } = useParams<{ categoriesId: string }>();
  const [productsByCategory, setProductsByCategory] = useState(ITEMS);

  useEffect(() => {
    setProductsByCategory(
      categoriesId
        ? ITEMS.filter((item) => item.category === categoriesId)
        : ITEMS
    );
  }, [categoriesId]);

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
        <PaginationProvider paginate={productsByCategory}>
          <ProductsOnCategories />
        </PaginationProvider>
      </div>
    </PageLayout>
  );
};

export default Categories;
