import { useEffect, useState, useRef } from 'react';
import { carListApiRequest, createInvoiceRequest } from '../../apiRequiest/apiRequiest';
import { Link } from 'react-router-dom';
const Reservation = () => {
    const [data, setData] = useState([]);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [duration, setDuration] = useState('');
    const [totalCharge, setTotalCharge] = useState(0);
    const selectRef = useRef(null);
    const [additionalCharges, setAdditionalCharges] = useState({
        collisionDamageWaiver: 0,
        liabilityInsurance: 0,
        rentalTax: 0,
    });
    const [discount, setDiscount] = useState(0);
    const [hourRate, setHourRate] = useState(null);
    const [dayRate, setDayRate] = useState(null);
    const [weekRate, setWeekRate] = useState(null);
    const monthRate = 2000;

    const rateFunction = (value,data)=>{
        if(value){
            data.map((v)=>{
                if(v?.make == value){
                    setHourRate(v?.rates["hourly"]);
                    setDayRate(v?.rates["daily"]);
                    setWeekRate(v?.rates["weekly"]);
                }
            })
        }
    }
    
    // carList api 
    useEffect(() => {
        (async () => {
            let result = await carListApiRequest();
            setData(result);
            rateFunction(selectRef.current.value,result);
        })();
    },[]);

    // Handle additional charges
    const handleAdditionalCharges = (chargeType, isChecked) => {
        const chargeAmounts = {
            collisionDamageWaiver: 9,
            liabilityInsurance: 15,
            rentalTax: 11.5/100*grandTotal,
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
                calculatedDuration =` ${Math.floor(durationInMonths)} month(s)`;
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
    }, [pickupDate, returnDate,hourRate, dayRate, weekRate]);


    // creating Invoice api Request

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const typeRef = useRef()
    const onInvoiceHanlder = async()=>{
        const collisionDamageWaiver= additionalCharges.collisionDamageWaiver.toFixed(2);
       const liabilityInsurance =  additionalCharges.liabilityInsurance.toFixed(2)
       const rentalTax = additionalCharges.rentalTax.toFixed(2);
       const charge = totalCharge.toFixed(2);
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const address = addressRef.current.value;
        const Vehicle = selectRef.current.value;
        const VehicleType = typeRef.current.value;
        let res = await createInvoiceRequest(firstName,lastName,email, phone, address,pickupDate,returnDate,duration,discount,VehicleType,Vehicle,collisionDamageWaiver,liabilityInsurance,rentalTax,charge,grandTotal);
        window.location.href="/invoice"
    }

    return (
        <div>
            <div className="container">
                <div className="row reserv p-0">
                    <div className="col-12 btn d-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
                    <h2>Reservation</h2>
                <button onClick={onInvoiceHanlder}>Print / Download</button>
                    </div>

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
                        <input ref={firstNameRef} type="text" />
                        <p>Last Name <span style={{color:"red"}}>*</span></p>
                        <input ref={lastNameRef} type="text" />
                        <p>Email <span style={{color:"red"}}>*</span></p>
                        <input ref={emailRef} type="text" />
                        <p>Phone <span style={{color:"red"}}>*</span></p>
                        <input ref={phoneRef} type="text" />
                        <p>Address</p>
                        <input ref={addressRef} type="text" />
                    </div>
                    <div className="col-lg-5 charge">
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
                                    <td>$9.00</td>
                                    <td>${additionalCharges.collisionDamageWaiver.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Liability Insurance</td>
                                    <td></td>
                                    <td>$15.00</td>
                                    <td>${additionalCharges.liabilityInsurance.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Rental Tax</td>
                                    <td></td>
                                    <td>11.5%</td>
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
                <div className="row pb-5" style={{paddingTop:"18px", width:"81%"}}>
                    <div className="col-lg-4 mainReserv">
                        <h4>Vehicle Information</h4>
                        <p>Vehicle Type <span style={{color:"red"}}>*</span></p>
                        <select ref={typeRef} style={{color:"#828290", fontSize:"14px", fontFamily:"Poppins sans-serif"}} className="form-control vType">
                            {
                                data.length > 0 ? (
                                    data.map((item, i) => {
                                        return (
                                            <option key={i} value={item.type}>{item.type}</option>
                                        );
                                    })
                                ) : ("No Car Available")
                            }
                        </select>
                        <p>Vehicle <span style={{color:"red"}}>*</span></p>
                        <select 
                            ref={selectRef}
                            style={{color:"#828290", fontSize:"14px", fontFamily:"Poppins sans-serif"}} 
                            className="form-control vType"
                            onChange={(e)=> rateFunction(e.target.value,data)}
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
                        <input type="checkbox" onChange={(e) => handleAdditionalCharges('collisionDamageWaiver', e.target.checked)} /> <label>Collision Damage Waiver <span style={{paddingLeft:"39px"}}>$9</span></label><br />
                        <input type="checkbox" onChange={(e) => handleAdditionalCharges('liabilityInsurance', e.target.checked)} /> <label>Liability Insurance <span style={{paddingLeft:"85px"}}>$15</span></label><br />
                        <input type="checkbox" onChange={(e) => handleAdditionalCharges('rentalTax', e.target.checked)} /> <label>Rental Tax <span style={{paddingLeft:'131px'}}>11.5%</span></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;