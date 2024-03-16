import * as React from "react";
import "./HomePageSearch.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePageSearch: React.FC<{}> = (props) => {
    const navigate = useNavigate();

    return (
        <div className="orangeGradient mainContent">
            <div className="content">
                <h3>Hersey Spiritwear</h3>
                {/* TODO: Add remaining components to this */}
                <br />
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        navigate("/search")
                    }}
                    fontSize={"sm"}
                >
                    Search
                </Button>
            </div>

        </div>
    );
}
export default HomePageSearch