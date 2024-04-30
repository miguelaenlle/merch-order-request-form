import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import {useState} from "react";
import {Input, Select, Textarea, Button, Icon} from "@chakra-ui/react";
import { AiOutlineClose } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
const EditSpiritwearItem: React.FC<{}> = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [rows, setRows] = useState([
        { size: 'XXS', amount: '', price: '', change: '' },
        { size: 'XS', amount: '', price: '', change: '' },
        { size: 'S', amount: '', price: '', change: '' },
        { size: 'M', amount: '', price: '', change: '' },
        { size: 'L', amount: '', price: '', change: '' },
        { size: 'XL', amount: '', price: '', change: '' },
        { size: 'XXL', amount: '', price: '', change: '' }
    ]);

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const descriptionEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const locationEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, idx) => {
            if (idx === index) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
    };

    return (
        <div>

            <CustomModal
                buttonText="Edit Spiritwear Item"
                content={<div>

                    <div style={{fontSize: "25px", marginTop: "20px"}}>
                        <strong>Edit Spiritwear Item</strong>
                    </div>

                    <Input
                        padding='8px'
                        marginTop='10px'
                        height='23px'
                        placeholder='Name'
                        value={name}
                        onChange={nameEntered}
                    />

                    <Textarea
                        style={{marginTop: "5px", height: "80px", width: "100%", border: "1px solid #ccc"}}
                        placeholder='Description'
                        value={description}
                        onChange={descriptionEntered}
                    />

                    <Input
                        padding='8px'
                        marginTop="5px"
                        height="23px"
                        placeholder="Pickup Location"
                        value={location}
                        onChange={locationEntered}
                    />

                    <div style={{marginTop: "20px"}}><strong>Group</strong></div>

                    <div style={{marginTop: "5px", width: "60%"}}>
                        <Select>
                            <option value='option1'>Hersey Hack Club</option>
                        </Select>
                    </div>

                    <div style={{marginTop: "20px"}}><strong>Inventory</strong></div>

                    <div>
                        <table className="my-table">
                            <thead>
                            <tr style={{border: '1px solid #ccc', fontWeight: 'bold', textAlign: 'left'}}>
                                <th>Size</th>
                                <th className="inventory">Inventory Change</th>
                                <th>Current #</th>
                                <th>New #</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, index) => (
                                <tr
                                    style={{border: '1px solid #ccc'}}
                                    key={index}
                                >
                                    <td>{row.size}</td>
                                    <td>
                                        <input
                                            style={{width: "120px"}}
                                            type="number"
                                            value={row.change}
                                            onChange={(e) => handleInputChange(index, 'change', e.target.value)}
                                            placeholder="2"
                                        />
                                    </td>
                                    <td>10</td>
                                    <td>12</td>
                                    <td>
                                        <input
                                            style={{width: "120px"}}
                                            type="number"
                                            value={row.price}
                                            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                            placeholder="Price"
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <p style={{fontSize: "small", marginTop: "10px", fontStyle: "italic"}}>Inventory will
                        auto-update as you sell items.</p>

                    <div style = {{marginTop: "40px", marginBottom: "20px"}}>
                    <Button color="blue.400" variant="unstyled" leftIcon={<Icon as={AiOutlineClose}/>}>Cancel</Button>
                    <Button colorScheme='blue' style={{marginLeft: "160px"}} rightIcon={<Icon as={BsChevronRight}/>}>Save Changes</Button>
                    </div>

                </div>}
                closeText="Cancel"
                actionText="Create Item"
                onAction={() => {
                }}
                disableDefaultButtons
            />
        </div>
    );
}
export default EditSpiritwearItem