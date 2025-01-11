import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
<<<<<<< HEAD
import AddProporties from "./components/product/AddProporties";
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
        element: <Login />,
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
      {
        path: "/add-proporties/:productId",
        element: <AddProporties />,
      },
    ],
  },
]);
=======
>>>>>>> 3eaffb6b1257d1095793c9b1f4d8c58cb5e5469a

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin" element={<HomeLayout />}>
          <Route index element={<Landing />} />
          <Route path="landing-v2" element={<LandingV2 />} />
          <Route path="banners" element={<Banner />} />
          <Route path="banners/create-banner" element={<CreateBanner />} />
          <Route path="banners/:bannerId" element={<EditBanner />} />
          <Route path="partners" element={<Partners />} />
          <Route path="partners/create-partner" element={<CreatePartner />} />
          <Route path="partners/:partnerId" element={<EditPartner />} />
          <Route path="products" element={<Products />} />
          <Route path="rules" element={<Policy />} />
          <Route path="products/create-product" element={<CreateProduct />} />
          <Route path="products/:productId" element={<EditProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route
            path="categories/create-category"
            element={<CreateCategory />}
          />
          <Route path="categories/:categoryId" element={<EditCategory />} />
          <Route path="subcategories" element={<Subcategories />} />
          <Route
            path="subcategories/create-subcategory"
            element={<CreateSubCategory />}
          />
          <Route
            path="subcategories/:subcategoryId"
            element={<EditSubCategory />}
          />
          <Route path="segments" element={<Segment />} />
          <Route path="segments/create-segment" element={<CreateSegment />} />
          <Route path="segments/:segmentId" element={<EditSegment />} />
          <Route path="brands" element={<Brand />} />
          <Route path="brands/create-brand" element={<CreateBrand />} />
          <Route path="brands/:brandId" element={<EditBrand />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/create-order" element={<CreateOrder />} />
          <Route path="orders/1" element={<EditOrder />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/create-review" element={<CreateReview />} />
          <Route path="reviews/:id" element={<EditReview />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create-user" element={<CreateUser />} />
          <Route path="users/:id" element={<EditUser />} />
          <Route path="help-desk" element={<HelpDesk />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
