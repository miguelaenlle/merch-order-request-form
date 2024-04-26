import * as React from "react";
import "./HomePageSearch.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAPIHook} from "../../components/shared/hooks/use-api-hook.ts";

interface IHomePageSearch {
    name: string;
}

const data: IHomePageSearch[] = [
    {
        name: "Hersey Hack Club"
    },
    {
        name: "Math Team"
    },
    {
        name: "Robotics"
    },
    {
        name: "etc"
    },
    {
        name: "etc"
    },
    {
        name: "etc"
    },
    {
        name: "etc"
    },
    {
        name: "etc"
    },
    {
        name: "etc"
    }
]


const HomePageSearch: React.FC<{}> = (props) => {

    const [showMore, setShowMore] = React.useState(false);
    const [itemsToShow, setItemsToShow] = React.useState(3);
    const [displayedItems, setDisplayedItems] = React.useState<IHomePageSearch[]>(data);

    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSetSearchQuery = (query: string) => {
        setSearchQuery(query);
    }


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const updateItemsToShow = () => {
        const width = window.innerWidth;
        const calculatedItemsToShow = Math.floor(width / 405);
        setItemsToShow(calculatedItemsToShow);
    };

    const apiHook = useAPIHook();
    const handleLoadItems = async () => {
        const buyerToken = await apiHook.generateBuyerToken();
        try {
            const response = await apiHook.get(
                'http://localhost:3000/api/groups/',
                buyerToken);
            console.log(response);
            setDisplayedItems(response as IHomePageSearch[]);
        } catch (error) {
            console.log('Server error', error);
        }
    }


    React.useEffect(() => {
        handleLoadItems(); 

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);

        return () => {
            window.removeEventListener('resize', updateItemsToShow);
        };
    }, []);
    return (
        <div className='searchMain'>
            <div>
                <h2 style={{ fontSize: "35px" }}>Hersey Spiritwear</h2>
                <h3>Order JHHS Spiritwear for Sports and Clubs here!</h3>
                <div style={{ display: "flex", width: "80%", gap: "5px", flexWrap: "wrap" }}>
                    <input value={searchQuery} className='searchInput' placeholder='Search for spiritwear...' onChange={(e) => {


                        handleSetSearchQuery(e.target.value);
                    }} />
                    {displayedItems.slice(0, showMore ? displayedItems.length : itemsToShow).map((item, index) => (
                        <h1 key={index} className='searchOptions'>{item.name}</h1>
                    ))}
                    {displayedItems.length > itemsToShow && !showMore &&
                        <button className="searchButton" onClick={toggleShowMore}>
                            {data.length - itemsToShow} more
                        </button>
                    }
                    {showMore &&
                        <button className="searchButton" onClick={toggleShowMore}>
                            Show less
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePageSearch