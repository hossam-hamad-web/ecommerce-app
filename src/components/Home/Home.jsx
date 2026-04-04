import Style from "./Home.module.css";
import RecentProduct from "../RecentProduct/RecentProduct";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home </title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider></CategoriesSlider>
      <RecentProduct></RecentProduct>
    </>
  );
}
