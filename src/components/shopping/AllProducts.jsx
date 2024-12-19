import ShoppingProductTile from "@/pages/shopping-view/ProductTileShopping";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { sortOptions } from "@/config/Index";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductTileShop from "@/pages/shopping-view/ProductTileShop";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState("price-low-high"); // Default sort value
  const [category, setCategory] = useState(""); // Optional: Set initial category if needed
  const  {toast} = useToast();


  // Handle sort option changes and fetch sorted products
  const handleSort = (value) => {
    setSort(value);
    dispatch(fetchAllFilteredProducts({ category, sort: value }));
  };

  

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`); // Navigate to the product detail page
    // console.log(`Navigating to: /product/${getCurrentProductId}`);
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title : "Product is added to cart",
        })
      }
    });
  }

  // Fetch products on initial load with default sort and category
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category, sort }));
  }, [dispatch, category, sort]);

  return (
    // #252525 this is the background color we're meant to use for the background
    <div className="bg-[#252525] h-auto flex flex-col justify-center w-full">
      <div className="p-7 flex justify-center items-center">
        <span className="text-3xl font-bold text-white">All Products</span>
        <h1 ></h1>
      </div>
      <div className="flex justify-between text-white items-center px-7">
        {/* Sort Dropdown */}
        <div className="flex justify-start text-white py-7 gap-2">
          <h3>Sort By</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-end gap-1 w-[6rem] bg-black text-white border">
                <RiArrowDropDownLine className="text-lg" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Count */}
        {/* <div className="flex gap-2 justify-center items-center">
        
          <div className="flex gap-4 text-sm font-bold text-[#ffdb8a]">
            {Array.from({ length: totalPages }, (_, i) => (
              <p
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`hover:text-green-900 px-3 py-2 cursor-pointer ${
                  currentPage === i + 1 ? "text-green-500" : ""
                }`}
              >
                {i + 1}
              </p>
            ))}
          </div>

          <div>{productList.length} Products</div>
        </div> */}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-7 md:gap-y-10">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              // <ShoppingProductTile
              //   key={index}
              //   product={productItem}
              //   handleGetProductDetails={handleGetProductDetails}
              //   handleAddtoCart={handleAddtoCart}
              // />
              <ProductTileShop
                key={index}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AllProducts;
