import React, { useEffect, useState } from 'react'

interface HomePageSearch {
    name: { name: string }[]
}

const data: HomePageSearch = {
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

export const HomePageSearch = () => {
    const [showMore, setShowMore] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(3);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        const updateItemsToShow = () => {
            const width = window.innerWidth;
            // Calculate the number of items to show based on the width
            const calculatedItemsToShow = Math.floor(width / 405); // Adjust the divisor as per your design
            setItemsToShow(calculatedItemsToShow);
        };

        updateItemsToShow(); // Initial call to set the initial number of items based on the width
        window.addEventListener('resize', updateItemsToShow);

        return () => {
            window.removeEventListener('resize', updateItemsToShow);
        };
    }, []);
    return (
        <div className='searchMain'>
            <div>
                <h2 style={{fontSize: "35px"}}>Hersey Spiritwear</h2>
                <h3>Order JHHS Spiritwear for Sports and Clubs here!</h3> 
                <div style={{ display: "flex", width: "80%", gap: "5px", flexWrap: "wrap" }}>
                <input className='searchInput' type="text" placeholder='Search for spiritwear...' /> 
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
