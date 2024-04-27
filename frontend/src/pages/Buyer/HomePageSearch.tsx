import React, { useState } from "react";
import "./HomePageSearch.css";
import { InputGroup, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePageSearch: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [showMore, setShowMore] = useState(false);


    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };


    const sportsAndClubs = ["Football", "Basketball", "Soccer", "Volleyball", "Chess Club", "Math Team"];

    return (
        <div className="orangeGradient mainContent">
            <div className="content">
                <h3 className="header textCenter">Hersey Spiritwear</h3>
                <p className="header textCenter">Order JHHS Spiritwear for Sports and Clubs here!</p>
                <InputGroup>
                    <Input
                        placeholder="Search for spiritwear..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </InputGroup>
                {showMore && (
                    <div>
                        <p className="header textCenter">Direct Links:</p>
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
                )}
                <Button onClick={() => setShowMore(!showMore)} size="sm" marginTop="0.5rem">
                    {showMore ? "Show Less" : "Show More"}
                </Button>
            </div>
        </div>
    );
};
export default HomePageSearch;
