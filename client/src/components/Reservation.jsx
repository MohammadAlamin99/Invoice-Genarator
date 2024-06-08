import React, { useEffect, useState } from 'react';
import { carListApiRequest } from '../../apiRequiest/apiRequiest';

const Reservation = () => {
    const [data, setData] = useState([]);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [duration, setDuration] = useState('');
    const [totalCharge, setTotalCharge] = useState(0);
    const [additionalCharges, setAdditionalCharges] = useState({
        collisionDamageWaiver: 0,
        liabilityInsurance: 0,
        rentalTax: 0,
    });
    const [discount, setDiscount] = useState(0);
    // ===========
    const[rate, setRate] = useState(null);

    const rateFunction = ()=>{

    }

    
    // carList api 
    useEffect(() => {
        (async () => {
            let result = await carListApiRequest();
            setData(result);
        })();
    },[]);

    // Rates
    const hourRate = 5;
    const dayRate = 10;
    const weekRate = 50;
    const monthRate = 200;

    // Handle additional charges
    const handleAdditionalCharges = (chargeType, isChecked) => {
        const chargeAmounts = {
            collisionDamageWaiver: 33,
            liabilityInsurance: 33,
            rentalTax: 33,
        };
        setAdditionalCharges((prev) => ({
            ...prev,
            [chargeType]: isChecked ? chargeAmounts[chargeType] : 0
        }));
    };

    const totalAdditionalCharges = Object.values(additionalCharges).reduce((a, b) => a + b, 0);
    const grandTotal = totalCharge + totalAdditionalCharges-discount;

    // Set duration and calculate charge
    useEffect(() => {
        if (pickupDate && returnDate) {
            const start = new Date(pickupDate);
            const end = new Date(returnDate);
            const durationInMs = end - start;
            const durationInHours = durationInMs / (1000 * 60 * 60);
            const durationInDays = Math.floor(durationInHours / 24);

            let calculatedDuration;
            let calculatedCharge;

            if (durationInDays >= 30) {
                const durationInMonths = durationInDays / 30;
                calculatedDuration = `${Math.floor(durationInMonths)} month(s)`;
                calculatedCharge = Math.floor(durationInMonths) * monthRate;
            } else if (durationInDays >= 7) {
                const durationInWeeks = durationInDays / 7;
                calculatedDuration = `${Math.floor(durationInWeeks)} week(s)`;
                calculatedCharge = Math.floor(durationInWeeks) * weekRate;
            } else if (durationInDays >= 1) {
                const remainingHours = Math.floor(durationInHours % 24);
                calculatedDuration = `${Math.floor(durationInDays)} day(s) and ${remainingHours} hour(s)`;
                calculatedCharge = Math.floor(durationInDays) * dayRate + remainingHours * hourRate;
            } else {
                calculatedDuration = `${Math.floor(durationInHours)} hour(s)`;
                calculatedCharge = Math.floor(durationInHours) * hourRate;
            }

            setDuration(calculatedDuration);
            setTotalCharge(calculatedCharge);
        }
    }, [pickupDate, returnDate]);


    return (
        <div>
            <div className="container">
                <div className="row reserv p-0">
                    <h2>Reservation</h2>
                    
                    <div className="col-lg-3 mainReserv">
                        <h4>Reservation Details</h4>
                        <p>Reservation ID</p>
                        <input style={{borderColor:"#DFDFFF"}} type="text" />
                        <p>Pickup Date <span style={{color:"red"}}>*</span></p>
                        <input
                            type="datetime-local"
                            className="form-control"
                            style={{ width: "100%" }}
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                        />

                        <p>Return Date <span style={{color:"red"}}>*</span></p>
                        <input
                            type="datetime-local" 
                            className="form-control" 
                            style={{ width: "100%" }}
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />

                        <p>Duration</p>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={duration}
                            readOnly 
                        />
                        <p>Discount</p>
                        <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))}/>
                    </div>
                    <div className="col-lg-3 mainReserv">
                        <h4>Customer Information</h4>
                        <p>First Name <span style={{color:"red"}}>*</span></p>
                        <input type="text" />
                        <p>Last Name <span style={{color:"red"}}>*</span></p>
                        <input type="text" />
                        <p>Email <span style={{color:"red"}}>*</span></p>
                        <input type="text" />
                        <p>Phone <span style={{color:"red"}}>*</span></p>
                        <input type="text" />
                        <p>Address</p>
                        <input type="text" />
                    </div>
                    <div className="col-lg-4 charge">
                        <h3>Charges Summary</h3>
                        <table className="charges-table">
                            <thead className='tHead'>
                                <tr>
                                    <th>Charge</th>
                                    <th style={{paddingRight:"30px"}}>Unit</th>
                                    <th>Rate</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className='tBody'>
                                <tr>
                                    <td>Duration Charge</td>
                                    <td>{duration}</td>
                                    <td></td>
                                    <td>${totalCharge.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Collision Damage Waiver</td>
                                    <td></td>
                                    <td>$33.00</td>
                                    <td>${additionalCharges.collisionDamageWaiver.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Liability Insurance</td>
                                    <td></td>
                                    <td>$33.00</td>
                                    <td>${additionalCharges.liabilityInsurance.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Rental Tax</td>
                                    <td></td>
                                    <td>$33.00</td>
                                    <td>${additionalCharges.rentalTax.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            <tfoot className='tFoot'>
                                <tr>
                                    <td colSpan="3">Total</td>
                                    <td>${grandTotal.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    
                </div>
                <div className="row pb-5" style={{paddingLeft:"3rem", paddingTop:"18px", width:"81%"}}>
                    <div className="col-lg-4 mainReserv">
                        <h4>Vehicle Information</h4>
                        <p>Vehicle Type <span style={{color:"red"}}>*</span></p>
                        <select style={{color:"#828290", fontSize:"14px", fontFamily:"Poppins sans-serif"}} className="form-control vType">
                            {
                                data.length > 0 ? (
                                    data.map((item, i) => {
                                        return (
                                            <option key={i} value="">{item.type}</option>
                                        );
                                    })
                                ) : ("No Car Available")
                            }
                        </select>
                        <p>Vehicle <span style={{color:"red"}}>*</span></p>
                        <select 
                            style={{color:"#828290", fontSize:"14px", fontFamily:"Poppins sans-serif"}} 
                            className="form-control vType"
                            onChange={(e)=> setRate(e.target.value)}
                            >
                            {
                                data.length > 0 ? (
                                    data.map((item, i) => {
                                        return (
                                            <option key={i} value={item.value}>{item.make}</option>
                                        );
                                    })
                                ) : ("No Car Available")
                            }
                        </select>
                    </div>
                    <div className="col-lg-4 aditionalCharge">
                        <h3>Additional Charges</h3>
                        
                        <input type="checkbox" onChange={(e) => handleAdditionalCharges('collisionDamageWaiver', e.target.checked)} /> <label>Collision Damage Waiver <span>$33</span></label><br />
                        <input type="checkbox" onChange={(e) => handleAdditionalCharges('liabilityInsurance', e.target.checked)} /> <label>Liability Insurance <span>$33</span></label><br />
                        <input type="checkbox" onChange={(e) => handleAdditionalCharges('rentalTax', e.target.checked)} /> <label>Rental Tax <span>$33</span></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;

