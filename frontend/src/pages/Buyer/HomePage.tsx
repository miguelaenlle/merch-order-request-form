import * as React from "react";
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import HomePageSearch from "./HomePageSearch";
import LatestReleases from "./LatestReleases";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import ItemModal from "./ItemModal";
const HomePage: React.FC<{}> = (props) => {
    return (
        <div>
            <BuyerNavbar />
            <HomePageSearch />
            <ItemModal 
                itemId="660b6ef90991898511133d5d"
            />
            <LatestReleases />
        </div>
    );
}
export default HomePage