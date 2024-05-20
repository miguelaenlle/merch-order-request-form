import * as React from "react";
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import SearchFilters from "./SearchFilters";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";
import SearchResultItem from "../../components/shared/SearchResultItem";
import "./Search.css";
import { Flex, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Option } from "../../types/Option";
import { useLoadErrorHook } from "../../components/shared/hooks/use-load-error-hook";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook";
import { AuthContext } from "../../components/shared/context/AuthContext";
import { Item } from "../../types/Item";


const sizeList = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

let SIZE_FILTER_OPTIONS: Option[] = [
    {
        key: "all",
        text: "All"
    }
]

sizeList.forEach((size) => {
    SIZE_FILTER_OPTIONS.push({
        key: size,
        text: size
    })
})

const SORT_OPTIONS: Option[] = [
    {
        key: "name",
        text: "Name"
    },
    {
        key: "price",
        text: "Price"
    }
]


const Search: React.FC = () => {
    const navigate = useNavigate();

    const [items, setItems] = React.useState<Item[]>([]);

    const [query, setQuery] = React.useState("");
    const [nameFilter, setNameFilter] = React.useState("");
    const [sortBy, setSortBy] = React.useState("name");
    const [sizeFilter, setSizeFilter] = React.useState("all");

    const loadErrorHook = useLoadErrorHook();
    const apiHook = useAPIHook();

    const handleLoadQuery = () => {
        const query = new URLSearchParams(window.location.search).get("query");
        if (query) {
            setQuery(query);
            setNameFilter(query)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setQuery(nameFilter);
            navigate(`/search?query=${encodeURIComponent(nameFilter)}`);
        }
    };

    const handleLoadSpiritwearItems = async () => {
        loadErrorHook.handleStartLoading();
        try {
            let url = `http://localhost:3000/api/items/search?sortedBy=${sortBy}`
            if (sizeFilter !== "all") {
                url += `&size=${sizeFilter}`
            }
            if (query !== "") {
                url += `&name=${nameFilter}`
            }
            const response = await apiHook.get(
                url
            );
            console.log("Response", response);
            setItems(response.findItems as Item[]);
            loadErrorHook.handleStopLoading();

        } catch (error: any) {
            loadErrorHook.handleError("Failed to load spiritwear items");
        }
    }

    React.useEffect(() => {
        handleLoadQuery();
    }, [])

    React.useEffect(() => {
        handleLoadSpiritwearItems();
    }, [sizeFilter, query, sortBy])


    return (
        <div>
            <BuyerNavbar />
            <div className="content">
                <br />
                <Flex>
                    <h3 className="header">Search: {query || "All"}</h3>
                </Flex>

                <Input
                    placeholder="Search for spiritwear..."
                    value={nameFilter}
                    onChange={(e) => {
                        setNameFilter(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                    variant="filled"
                    mb={3}
                />
                <Flex gap={3}>
                    <VStack w="100%" alignItems={"flex-start"}>
                        <Text>Size Filter</Text>
                        <Select
                            value={sizeFilter}
                            onChange={(event) => {
                                setSizeFilter(event.target.value);
                            }}
                        >
                            {SIZE_FILTER_OPTIONS.map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.text}
                                </option>
                            ))}
                        </Select>
                    </VStack>

                    <VStack w="100%" alignItems={"flex-start"}>
                        <Text>Sort By</Text>
                        <Select
                            value={sortBy}
                            onChange={(event) => {
                                setSortBy(event.target.value);
                            }}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.text}
                                </option>
                            ))}
                        </Select>
                    </VStack>
                </Flex>
                <br />
                <div className="searchResults">
                    {items.map((item) => (
                        <SearchResultItem
                            key={`search-result-item-${item._id}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
