import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { Select, Button } from "@chakra-ui/react";
const ItemModal: React.FC<{}> = (props) => {
    return (
        <CustomModal
            buttonText="Single Item View"
            content={<div className="modalContent">

                <div className="img"></div>

                <div className="container">
                    <strong className="strong">Hack Club T-Shirt</strong>


                        <p style={{ marginTop: '10px', backgroundColor: '#d3e0e8', padding: '5px', borderRadius: '6px', width: 'fit-content', fontSize: 'small'}}>JHHS Merch</p>


                    <p style={{paddingTop: '15px', paddingBottom: '15px'}}>Sold by <strong> Mr. Brown</strong></p>

                    <p>The all-new Hack Club 2024 T-Shirt. Pickup from 3:00-5:00pm on Fridays at John Hersey High
                        School, Room 158</p>

                    <strong style={{fontSize: 'xx-large'}}>$10.0</strong>

                    <div style={{marginTop: '20px', width: '350px' }}>
                        <Select placeholder='Size' width = 'full'>
                            <option value='option1'>Small</option>
                            <option value='option2'>Medium</option>
                            <option value='option3'>Large</option>
                        </Select>
                    </div>

                    <div style={{ marginTop: '10px', width: '350px' }}>
                    <Select placeholder='Colors' width = 'full'>
                            <option value='option1'>Black</option>
                        </Select>
                    </div>

                    <div style = {{width: '350px'}}>
                        <Button colorScheme='blue' width='full' marginTop = '10px'>Place Order</Button>
                    </div>

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