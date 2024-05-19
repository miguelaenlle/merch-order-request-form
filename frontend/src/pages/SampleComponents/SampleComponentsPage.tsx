import * as React from "react"
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import "./SampleComponentsPage.css"
import { Button, HStack, Input, Tag } from "@chakra-ui/react";
import { AddIcon, CalendarIcon, ChevronRightIcon, CloseIcon, DownloadIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { JHHS_HACK_CLUB, JHHS_LOGO, JHHS_SWEATER } from "../../constants/placeholder-data";

const SampleComponentsPage: React.FC<{}> = (props) => {

    const TAGS = [
        "Tag 1", "Tag 2", "Tag 3", "Tag 4"
    ]

    const [inputText, setInputText] = React.useState<string>("");

    const handleUpdateInputText = (newText: string) => {
        setInputText(newText);
    }


    const handleButtonOneAction = () => {
        console.log("Button One Action!")
    }

    return (
        <div className="dashboard">
            <BuyerNavbar />
            <div className="content">
                <h3 className="header">Sample Component List</h3>
                <p>Reference these throughout the development of your feature. The CSS styles are either in SampleComponentPage.css or App.css. If they are in SampleComponentPage.css, you must transfer them to your component's CSS file. Otherwise, you can use those classes anywhere.</p>

                <br />

                <h3 className="header borderBottom">Text</h3>
                <h3 className="large">Large, Bold Text (Use for large headers)</h3>
                <p className="medium">Medium Text (Use for most of your content)</p>
                <p className="small">Small Text (Use as a subheader)</p>
                <p className="medium green">Green Text (See the CSS file for implementation)</p>
                <p className="medium red">Red Text</p>
                <p>
                    <a className="blue" href="https://www.google.com/search?q=color+picker&rlz=1C1CHBF_enUS1010US1010&oq=color+picker&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiPAjIGCAIQRRg8MgYIAxBFGDzSAQc4NjVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8" target="_blank">
                        {"Click Here "}
                    </a>
                    for a color picker
                </p>
                <br />
                <h3 className="header borderBottom">Buttons</h3>
                <div>
                    <Button colorScheme="blue" mr={3} onClick={handleButtonOneAction}>
                        Blue Button with Background
                    </Button>
                    <Button colorScheme="red" mr={3} onClick={handleButtonOneAction}>
                        Red Button with Background
                    </Button>

                    <Button colorScheme="blue" mr={3} onClick={handleButtonOneAction} rightIcon={<ChevronRightIcon />}>
                        Blue Button with Right Chevron
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={handleButtonOneAction} rightIcon={<AddIcon />}>
                        Blue Button with Add Icon
                    </Button>
                    <Button colorScheme="red" mr={3} onClick={handleButtonOneAction} rightIcon={<CloseIcon />}>
                        Red Button with Close Icon
                    </Button>
                </div>


                <p>
                    <a className="blue" href="https://chakra-ui.com/docs/components/icon" target="_blank">
                        {"Click Here "}
                    </a>
                    for the full list of Chakra icons.
                </p>

                <br />
                <h3 className="header borderBottom">Inputs</h3>
                <p>What you type will show here: {inputText}</p>
                <Input
                    value={inputText}
                    placeholder="Large Input"
                    size="md"
                    onChange={(e) => {
                        handleUpdateInputText(e.target.value)
                    }}
                />
                <Input
                    value={inputText}
                    placeholder="Basic Input"
                    size="md"
                    onChange={(e) => {
                        handleUpdateInputText(e.target.value)
                    }}
                />
                <Input
                    value={inputText}
                    placeholder="Small Input"
                    size="sm"
                    onChange={(e) => {
                        handleUpdateInputText(e.target.value)
                    }}
                />
                <br />
                <br />

                <h3 className="header borderBottom">Flexboxes</h3>
                <div className="orangeGradient">
                    <p>Item with an orange gradient</p>
                </div>

                <br />
                <div className={"flexbox"}>
                    <div className="flexItem">
                        <p>One Half</p>

                    </div>
                    <div className="flexItem orangeGradient">
                        <p>Another Half</p>

                    </div>

                </div>
                <br />


                <div className={"flexbox"}>
                    <div className="flexItem">
                        <p>One Third</p>
                    </div>
                    <div className="flexItem">
                        <p>Second Third</p>
                    </div>
                    <div className="flexItem">
                        <p>Third Third</p>
                    </div>
                </div>
                <br />

                <h3 className="header borderBottom">Tags</h3>
                <p>Large Tags:</p>
                <HStack key={Math.random().toString()} spacing={4}>
                    {TAGS.map((tag) => (
                        <Tag size={"lg"} key={Math.random().toString()} variant='solid' colorScheme='gray'>
                            {tag}
                        </Tag>
                    ))}
                </HStack>
                <br />

                <p>Medium Tags:</p>
                <HStack key={Math.random().toString()} spacing={4}>
                    {TAGS.map((tag) => (
                        <Tag size={"md"} key={Math.random().toString()} variant='solid' colorScheme='gray'>
                            {tag}
                        </Tag>
                    ))}
                </HStack>
                <br />

                <p>Small Tags:</p>
                <HStack key={Math.random().toString()} spacing={4}>
                    {TAGS.map((tag) => (
                        <Tag size={"sm"} key={Math.random().toString()} variant='solid' colorScheme='gray'>
                            {tag}
                        </Tag>
                    ))}
                </HStack>
                <br />

                <h3 className="header borderBottom">Icons</h3>
                <CalendarIcon pr={"5px"} color={"gray"} />
                <DownloadIcon pr={"5px"} color={"gray"} />
                <InfoOutlineIcon pr={"5px"} color={"gray"} />
                <EditIcon color="gray" />
                <br />

                <h3 className="header borderBottom">Images</h3>
                <br />

                <div className="images">
                    <img className={"logo"} src={JHHS_LOGO} />
                    <img className={"mediumImage"} src={JHHS_SWEATER} />
                    <img className={"mediumImage"} src={JHHS_HACK_CLUB} />
                </div>

                <br />
                <br />

            </div>
        </div>
    );
}
export default SampleComponentsPage