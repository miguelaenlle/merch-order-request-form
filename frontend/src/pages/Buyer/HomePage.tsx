import * as React from "react"
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import HomePageSearch from "./HomePageSearch";
import LatestReleases from "./LatestReleases";
const HomePage: React.FC<{}> = (props) => {
    return (
        <div>
            <BuyerNavbar />
            <HomePageSearch />
            <LatestReleases />
        </div>
    );
}
export default HomePage