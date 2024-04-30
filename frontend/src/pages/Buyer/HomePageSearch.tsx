import React, { useState } from "react";
import "./HomePageSearch.css";
import { InputGroup, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";

interface IHomePageSearch {
    name: string;
}

const HomePageSearch: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [itemsToShow, setItemsToShow] = React.useState(3);
    const [displayedItems, setDisplayedItems] = React.useState<IHomePageSearch[]>([]);
    const [showMore, setShowMore] = useState(false);

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

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };


    const updateItemsToShow = () => {
        const width = window.innerWidth;
        const calculatedItemsToShow = Math.floor(width / 405);
        setItemsToShow(calculatedItemsToShow);
    };


    React.useEffect(() => {
        handleLoadItems();

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);

        return () => {
            window.removeEventListener('resize', updateItemsToShow);
        };
    }, []);

    return (
        <div className="orangeGradient mainContent">
            <div className="content">
                <h2 style={{ fontSize: "35px" }}>Hersey Spiritwear</h2>
                <h3>Order JHHS Spiritwear for Sports and Clubs here!</h3>
                <div style={{ display: "flex", width: "80%", gap: "5px", flexWrap: "wrap" }}>
                    <InputGroup>
                        <Input
                            placeholder="Search for spiritwear..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            variant="filled"
                            mt={3}
                        />
                    </InputGroup>
                    {displayedItems.slice(0, showMore ? displayedItems.length : itemsToShow).map((item, index) => (
                        <h1 key={index} className='searchOptions' onClick={() => {
                            navigate(`/search?query=${encodeURIComponent(item.name)}`);
                        }}>{item.name}</h1>
                    ))}
                    {displayedItems.length > itemsToShow && !showMore &&
                        <button className="searchButton" onClick={toggleShowMore}>
                            {displayedItems.length - itemsToShow} more
                        </button>
                    }
                    {showMore &&
                        <button className="searchButton" onClick={toggleShowMore}>
                            Show less
                        </button>
                    }
                    {/* {showMore && (
                    <div>
                        {sportsAndClubs.map((item, index) => (
                            <Button
                                key={index}
                                colorScheme="blue"
                                size="sm"
                                onClick={() => {
                                    navigate(`/search?query=${encodeURIComponent(item)}`);
                                }}
                                marginRight="0.5rem"
                                marginBottom="0.5rem"
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                )} */}
                    {showMore &&
                        <button className="searchButton" onClick={toggleShowMore}>
                            Show less
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};
export default HomePageSearch;
