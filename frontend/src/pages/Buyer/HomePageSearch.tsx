import * as React from "react";
import "./HomePageSearch.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


interface IHomePageSearch {
    name: { name: string }[]
}

const data: IHomePageSearch = {
    name: [
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
}

const HomePageSearch: React.FC<{}> = (props) => {

    const [showMore, setShowMore] = React.useState(false);
    const [itemsToShow, setItemsToShow] = React.useState(3);

    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSetSearchQuery = (query: string) => {
        setSearchQuery(query);
    }


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    React.useEffect(() => {
        const updateItemsToShow = () => {
            const width = window.innerWidth;
            const calculatedItemsToShow = Math.floor(width / 405);
            setItemsToShow(calculatedItemsToShow);
        };

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
                    {data.name.slice(0, showMore ? data.name.length : itemsToShow).map((item, index) => (
                        <h1 key={index} className='searchOptions'>{item.name}</h1>
                    ))}
                    {data.name.length > itemsToShow && !showMore &&
                        <button className="searchButton" onClick={toggleShowMore}>
                            {data.name.length - itemsToShow} more
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