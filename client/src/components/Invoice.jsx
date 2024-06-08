import React from 'react';

const Invoice = () => {
    return (
        <div>
            <div className="container">
                    <div className="row pt-3 pb-3">
                            <div className="row">
                            <div className="col-lg-6">
                               <div className="row">
                                <div className="col-lg-6">
                                    <img style={{width:"147px", height:"115px"}} src={"https://www.logodesign.net/logo-new/car-in-collision-with-swoosh-in-the-center-8989ld.png?nwm=1&nws=1&industry=car&txt_keyword=All"} alt="" />
                                    <div className="cusInfo">
                                    <h3>RENTER INFO</h3>
                                    <p>Shihab Ahmed<br />test@gmail.com<br />Ph: 05945469</p>
                                </div>
                               </div>
                               <div className="col-lg-6">
                                    <div className="company-info">
                                        <h3>CH Car Place Inc</h3>
                                        <p>162 Bergen St<br />Brooklyn, NY 11213<br />PH#</p>
                                    </div>

                                    <div className="working-hours">
                                            <p>Monday 9:00 AM–6:00 PM</p>
                                            <p>Tuesday 9:00 AM–6:00 PM</p>
                                            <p>Wednesday 9:00 AM–6:00 PM</p>
                                            <p>Thursday 9:00 AM–6:00 PM</p>
                                            <p>Friday 9:00 AM–6:00 PM</p>
                                            <p>Saturday 9:00 AM–6:00 PM</p>
                                            <p>Sunday 9:00 AM–6:00 PM</p>
                                    </div>
                               </div>
                               <div className="row">
                                <div className="col-12 adition">
                                    <h3>ADDITONAL AUTHORIZED DRIVER(S)</h3>
                                    <h3 className='pt-3'>UNIT DETAILS</h3>
                                    <p>Unit : NISSAN ROGUE BLACK</p>
                                    <p>Make & Model   : NISSAN ROGUE BLACK</p>
                                    <p className='pt-3'>BILL TO : </p>
                                    <p>Payment Type : Paid</p>
                                    <p className='pb-3'>AUTH : $0.00</p>
                                    <p>Refferal :</p>
                                    <p>NOTICE : Collision Insurance (CDW)- $7 per day limits liability of damages to one's own vehicle up to $1000 in the event of an accident.</p>
                                    <p>Rental service may be refused anyone who done in the best interest of the renting company or customer.</p>
                                    <p>Rates do not include gasoline. Reserved the right to collect deposit covering estimated rental charges.</p>
                                </div>
                               </div>
                                </div>
                            </div>






                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-12">
                                    <div className="reservation-info">
                                        <h3>Reservation</h3>
                                        <h4>RA #0121</h4>
                                        <span>REPAIR ORDER:</span>
                                        <p>CLAIM:</p>
                                        <p>Date/Time Out : 03/25/2024 12:33 AM</p>
                                        <p>Date/Time In : 03/29/2024 01:33 AM</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
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
              <td>Hourly</td>
              <td>$0.50</td>
            </tr>
            <tr>
              <td>NYS State Tax 11.5%</td>
              <td>$0.06</td>
            </tr>
            <tr>
              <td>EST TOTAL TIME & MILAGE</td>
              <td>$0.56</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>$0.56</td>
            </tr>
            <tr>
              <td>Damages</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>Traffic tickets</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>TOTAL ESTIMATED CHARGES</td>
              <td>$0.56</td>
            </tr>
            <tr>
              <td>Renter Payments</td>
              <td>$0.56</td>
            </tr>
          </tbody>
        </table>
                                    </div>
                                    </div>
                                </div>
                                <div className="row invoiceText pt-3">
                                    <p>Rent reminder text messages are concise notifications property managers can send to tenants to alert them of upcoming or overdue rent payments. Of course, they also help ensure you receive timely and consistent payments.</p>
                                </div>
                               <div className="main d-flex">
                               <div className="row invoiceText">
                                    <p>Renter's Signature </p>
                                    <p>-------------------</p>
                                </div>
                                <div className="row invoiceText">
                                    <p>Additional Driver 1</p>
                                    <p>---------------------</p>
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