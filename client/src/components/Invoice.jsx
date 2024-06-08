import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { getInvoiceRequest } from '../../apiRequiest/apiRequiest';
import moment from 'moment';
const Invoice = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // get invoice api request
    const [invoice, setInvoice] = useState([]);
    useEffect(()=>{
        (async()=>{
            let result = await getInvoiceRequest();
            setInvoice(result)
        })()
    },[0])
    return (
        <div>
            <div className="col-12 btn d-flex">
                  <button onClick={handlePrint} style={{marginLeft:"18rem", marginTop:"10px"}}>Print / Download</button>
                    </div>

            <div ref={componentRef} className="invoice-container">
                <div className="container">
                    <div className="row pt-3 pb-3">
                        <div className="col-lg-6">
                            <img
                                style={{ width: '147px', height: '115px' }}
                                src={
                                    'https://www.logodesign.net/logo-new/car-in-collision-with-swoosh-in-the-center-8989ld.png?nwm=1&nws=1&industry=car&txt_keyword=All'
                                }
                                alt=""
                            />
                            <div className="cusInfo">
                                <h3>RENTER INFO</h3>
                                   <p>{invoice.firstName} {invoice.lastName}</p>
                                   <p>{invoice.email}</p>
                                   <p>Phone: {invoice.phone}</p>
                            </div>
                        </div>
                         
                        <div className="col-lg-6">
                        <div className="reservation-info">
                                <h3>Reservation</h3>
                                <h4>RA #0121</h4>
                                <span>REPAIR ORDER:</span>
                                <p>CLAIM:</p>
                                <p>Date/Time Out :  {moment(invoice.PickupDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                <p>Date/Time In : {moment(invoice.ReturnDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            </div>
                          
                            <div className="working-hours">
                                <p>Every Day : 9:00 AM–6:00 PM</p>
                            </div>
                        </div>
                        <div className="col-6 adition">
                            <h3>ADDITIONAL AUTHORIZED DRIVER(S)</h3>
                            <h3 className="pt-3">UNIT DETAILS</h3>
                            <p>Make : {invoice.Vehicle}</p>
                            <p>Vehicle Type : {invoice.VehicleType}</p>
                            <p className="pt-3">BILL TO :</p>
                            <p>Payment Type : Paid</p>
                            <p className="pb-3">AUTH : $0.00</p>
                            <p>Referral :</p>
                            <p>
                                NOTICE : Collision Insurance (CDW)- $7 per day limits
                                liability of damages to one's own vehicle up to $1000 in
                                the event of an accident.
                            </p>
                        </div>

                       

                        <div className="col-6">
                           
                            <div className="reservation-info charge-summary pt-3">
                                <h4>CHARGE SUMMARY</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{invoice.Duration}</td>
                                            <td>${invoice.charge}</td>
                                        </tr>
                                        <tr>
                                            <td>NYS State Tax 11.5%</td>
                                            <td>${invoice.RentalTax}</td>
                                        </tr>
                                        <tr>
                                            <td>Collision Damage Waiver</td>
                                            <td>${invoice.CollisionDamageWaiver}</td>
                                        </tr>
                                        <tr>
                                            <td>Liability Insurance</td>
                                            <td>${invoice.LiabilityInsurance}</td>
                                        </tr>
                                        <tr>
                                            <td>Discount</td>
                                            <td>${invoice.Discount}</td>
                                        </tr>
                                        <tr>
                                            <td>TOTAL CHARGES</td>
                                            <td>${invoice.Total}</td>
                                        </tr>
                                      
                                    </tbody>
                                </table>
                            </div>
                           
                           
                        </div>
                        <div className="col-12">
                        <div className="main d-flex pt-2">
                                <div className="invoiceText" style={{paddingLeft:"1rem"}}>
                                    <p>Renter's Signature </p>
                                    <p>----------------</p>
                                </div>
                                <div className="invoiceText" style={{paddingLeft:"14rem"}}>
                                    <p>Additional Driver 1</p>
                                    <p>----------------</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
