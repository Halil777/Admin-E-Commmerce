import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Categories,
  CreateOrder,
  CreateProduct,
  CreateReview,
  CreateUser,
  EditCategory,
  EditOrder,
  EditProduct,
  EditReview,
  EditUser,
  HelpDesk,
  HomeLayout,
  Landing,
  LandingV2,
  Login,
  Notifications,
  Orders,
  Products,
  Profile,
  Register,
  Reviews,
  Subcategories,
  Users,
} from "./pages";
import CreateCategory from "./components/category/CreateCategory";
import Policy from "./pages/rules/Policy";
import CreateSubCategory from "./components/subcategory/CreateSubCategory";
import Segment from "./pages/segment/Segment";
import CreateSegment from "./components/segment/CreateSegment";
import Brand from "./pages/brand/Brand";
import CreateBrand from "./components/brand/CreateBrand";
import EditBrand from "./components/brand/EditBrand";
import EditSegment from "./components/segment/EditSegment";
import EditSubCategory from "./components/subcategory/EditSubCategory";
import Banner from "./pages/banner/Banner";
import CreateBanner from "./components/banner/CreateBanner";
import EditBanner from "./components/banner/EditBanner";
import Partners from "./pages/partners/Partners";
import CreatePartner from "./components/partners/CreatePartner";
import EditPartner from "./components/partners/EditPartner";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/landing-v2",
        element: <LandingV2 />,
      },
      {
        path: "/banners",
        element: <Banner />,
      },
      {
        path: "/banners/create-banner",
        element: <CreateBanner />,
      },
      {
        path: "/banners/:bannerId",
        element: <EditBanner />,
      },
      {
        path: "/partners",
        element: <Partners />,
      },
      {
        path: "/partners/create-partner",
        element: <CreatePartner />,
      },
      {
        path: "/partners/:partnerId",
        element: <EditPartner />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/rules",
        element: <Policy />,
      },
      {
        path: "/products/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/products/:productId",
        element: <EditProduct />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/create-category",
        element: <CreateCategory />,
      },
      {
        path: "/categories/:categoryId",
        element: <EditCategory />,
      },
      {
        path: "/subcategories",
        element: <Subcategories />,
      },

      {
        path: "/segments",
        element: <Segment />,
      },

      {
        path: "/segments/:segmentId",
        element: <EditSegment />,
      },

      {
        path: "/segments/create-segment",
        element: <CreateSegment />,
      },

      {
        path: "/subcategories/create-subcategory",
        element: <CreateSubCategory />,
      },

      {
        path: "/subcategories/:subcategoryId",
        element: <EditSubCategory />,
      },

      {
        path: "/brands",
        element: <Brand />,
      },

      {
        path: "/brands/create-brand",
        element: <CreateBrand />,
      },

      {
        path: "/brands/:brandId",
        element: <EditBrand />,
      },

      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/create-order",
        element: <CreateOrder />,
      },
      {
        path: "/orders/1",
        element: <EditOrder />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/reviews/:id",
        element: <EditReview />,
      },
      {
        path: "/reviews/create-review",
        element: <CreateReview />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <EditUser />,
      },
      {
        path: "/users/create-user",
        element: <CreateUser />,
      },
      {
        path: "/help-desk",
        element: <HelpDesk />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
