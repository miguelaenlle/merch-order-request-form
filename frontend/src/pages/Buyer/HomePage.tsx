import * as React from "react";
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import HomePageSearch from "./HomePageSearch";
import LatestReleases from "./LatestReleases";
import LoginComponent from "./LoginComponent";
const HomePage: React.FC<{}> = (props) => {
    return (
        <div>
            <BuyerNavbar />
            <HomePageSearch />
            <LoginComponent />
            <LatestReleases />
        </div>
    );
}
export default HomePage