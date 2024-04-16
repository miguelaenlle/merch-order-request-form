import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { Select, Button, Input } from "@chakra-ui/react";
const ItemModal: React.FC<{
    itemId: string;
}> = (props) => {

    const [inputsExpanded, setInputsExpanded] = React.useState(false);
    const [myName, setMyName] = React.useState("");
    const [myEmail, setMyEmail] = React.useState("");
    const [myCustomerType, setMyCustomerType] = React.useState("");
    const [numShirts, setNumShirts] = React.useState<number | undefined>(undefined);

    const handleExpandInputs = () => {
        setInputsExpanded(true);
    }

    const handleCloseInputs = () => {
        setInputsExpanded(false);
    }

    const handleOrder = async () => {

    }

    return (
        <CustomModal
            buttonText="Single Item View"
            content={<div className="modalContent">

                <div className="img"></div>

                <div className="container">
                    <strong className="strong">Hack Club T-Shirt</strong>


                    <p style={{ marginTop: '10px', backgroundColor: '#d3e0e8', padding: '5px', borderRadius: '6px', width: 'fit-content', fontSize: 'small' }}>JHHS Merch</p>


                    <p style={{ paddingTop: '15px', paddingBottom: '15px' }}>Sold by <strong> Mr. Brown</strong></p>

                    <p>The all-new Hack Club 2024 T-Shirt. Pickup from 3:00-5:00pm on Fridays at John Hersey High
                        School, Room 158</p>

                    <strong style={{ fontSize: 'xx-large' }}>$10.0</strong>


                    {!inputsExpanded && (
                        <>
                            <div style={{ marginTop: '20px', width: '350px' }}>
                                <Select placeholder='Size' width='full'>
                                    <option value='option1'>Small</option>
                                    <option value='option2'>Medium</option>
                                    <option value='option3'>Large</option>
                                </Select>
                            </div>

                            <div style={{ marginTop: '10px', width: '350px' }}>
                                <Select placeholder='Colors' width='full'>
                                    <option value='option1'>Black</option>
                                </Select>
                            </div>
                            <div style={{ marginTop: '10px', width: '350px' }}>
                                <Input
                                    value={numShirts}
                                    placeholder="Number of Shirts"
                                    size="md"
                                    onChange={(e) => {
                                        setNumShirts(parseFloat(e.target.value) || undefined)
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {inputsExpanded && (
                        <>
                            <div style={{ marginTop: '20px', width: '350px' }}>
                                <Input
                                    value={myName}
                                    placeholder="Name"
                                    size="md"
                                    onChange={(e) => {
                                        setMyName(e.target.value)
                                    }}
                                />
                            </div>

                            <div style={{ marginTop: '10px', width: '350px' }}>
                                <Input
                                    value={myEmail}
                                    placeholder="Email"
                                    size="md"
                                    onChange={(e) => {
                                        setMyEmail(e.target.value)
                                    }}
                                />
                            </div>

                            <div style={{ marginTop: '10px', width: '350px' }}>
                                <Select placeholder='Customer Type' width='full'>
                                    <option value='option1'>Student</option>
                                    <option value='option1'>Alumni</option>
                                    <option value='option2'>Parent</option>
                                    <option value='option3'>Teacher</option>
                                </Select>
                            </div>
                        </>
                    )}

                    {inputsExpanded ? (
                        <div style={{ "display": "flex", width: '350px', gap: "5px" }}>
                            <Button onClick={handleCloseInputs} colorScheme='blue' variant="outline" width='full' marginTop='10px'>Back</Button>
                            <Button onClick={handleOrder} colorScheme='blue' width='full' marginTop='10px'>Place Order</Button>
                        </div>
                    ) : (
                        <div style={{ width: '350px' }}>
                            <Button onClick={handleExpandInputs} colorScheme='blue' width='full' marginTop='10px'>Place Order</Button>
                        </div>
                    )}

                </div>

            </div>}
            onAction={() => {
            }}
            disableDefaultButtons
            extraLong
        />
    );
}
export default ItemModal