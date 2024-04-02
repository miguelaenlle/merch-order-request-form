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
            <LoginComponent />
            <SignupComponent />
            <ItemModal />
            <LatestReleases />
        </div>
    );
}
export default HomePage