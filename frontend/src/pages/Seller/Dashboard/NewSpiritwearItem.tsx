import * as React from "react";
import CustomModal from "../../../components/shared/CustomModal";
import { Input, Select } from "@chakra-ui/react";
import { useState } from "react";

const NewSpiritwearItem: React.FC<{}> = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');

    const [rows, setRows] = useState([
        { size: 'XXS', amount: '', price: '' },
        { size: 'XS', amount: '', price: '' },
        { size: 'S', amount: '', price: '' },
        { size: 'M', amount: '', price: '' },
        { size: 'L', amount: '', price: '' },
        { size: 'XL', amount: '', price: '' },
        { size: 'XXL', amount: '', price: '' }
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

    const timeEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
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

    const handleCreateSpiritwearItem = async (itemId, size, amount, price) => {
        try{
            const response = await fetch('http://localhost:3000/api/inventory-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemId: itemId,
                    size: size,
                    amount: amount,
                    price: 100.00
                })
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log('New inventory item was created successfully:', responseData)
            } else if (response.status === 400) {
                const errorData = await response.json()
                console.error('Validation error:', errorData)
            } else if (response.status === 404) {
                console.error('Item not found')
            } else {
                console.error('Failed to create inventory item:', response.statusText)
            }
        }catch (error){
            console.error('Error creating spiritwear item:', error)
        }
    }

    return (
        <div>
            <CustomModal

                buttonText="Create Spiritwear Item"
                content={

                    <div>

                        <div style={{ fontSize: "25px", marginTop: "20px" }}>
                            <strong>New Spiritwear Item</strong>
                        </div>

                        <Input
                            marginTop='10px'
                            height='23px'
                            placeholder='Name'
                            value={name}
                            onChange={nameEntered}
                        />

                        <Input
                            marginTop='5px'
                            height='80px'
                            placeholder='Description'
                            value={description}
                            onChange={descriptionEntered}
                        />

                        <div>
                            <Input
                                marginTop="5px"
                                width="50%"
                                height="23px"
                                placeholder="Pickup Location"
                                value={location}
                                onChange={locationEntered}
                            />

                            <Input
                                marginTop="5px"
                                width="50%"
                                height="23px"
                                placeholder="Pickup Time"
                                value={time}
                                onChange={timeEntered}
                            />
                        </div>

                        <div style={{ marginTop: "20px" }}><strong>Group</strong></div>

                        <div style={{ marginTop: "5px", width: "60%" }}>
                            <Select>
                                <option value='option1'>Hersey Hack Club</option>
                            </Select>
                        </div>

                        <div style={{ marginTop: "20px" }}><strong>Inventory</strong></div>

                        <div>
                            <table className="my-table">
                                <thead>
                                    <tr style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                                        <th style={{ padding: '2px' }}>Size</th>
                                        <th style={{ padding: '2px' }}>Amount</th>
                                        <th style={{ padding: '2px' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr
                                            style={{ border: '1px solid #ccc' }}
                                            key={index}
                                        >
                                            <td>{row.size}</td>
                                            <td>
                                                <input
                                                    style={{ width: "120px", border: '1px solid #ccc' }}
                                                    type="number"
                                                    value={row.amount}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                    placeholder="# of items"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: "120px", border: '1px solid #ccc' }}
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

                        <p style={{ fontSize: "small", marginTop: "10px", fontStyle: "italic" }}>Inventory will auto-update as you sell items.</p>

                    </div>
                }

                closeText="Cancel"
                actionText="Create Item"
                onAction={handleCreateSpiritwearItem}
            />
        </div>
    );
}
export default NewSpiritwearItem