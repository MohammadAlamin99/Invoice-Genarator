import axios from "axios";

let BaseURL = "http://localhost:5000";

// car list
export  async function carListApiRequest() {
    try {
        let result = await axios.get('https://exam-server-7c41747804bf.herokuapp.com/carsList');
        let data = result['data']['data']
        return data;
    }
    catch (e) {
        return false
    }
 }

// create invoice Request
 export  async function createInvoiceRequest(firstName,lastName,email,phone,address,PickupDate,ReturnDate,Duration,Discount,VehicleType,Vehicle,CollisionDamageWaiver,LiabilityInsurance,RentalTax,charge,Total) {
    try {
        let reqBody={firstName:firstName,lastName:lastName,email:email,phone:phone,address:address,PickupDate:PickupDate,ReturnDate:ReturnDate,Duration:Duration,Discount:Discount,VehicleType:VehicleType,Vehicle:Vehicle,CollisionDamageWaiver:CollisionDamageWaiver,LiabilityInsurance:LiabilityInsurance,RentalTax:RentalTax,charge:charge,Total:Total}
        let result = await axios.post(BaseURL+'/api/v1/invoice',reqBody);
        return result;
    }
    catch (e) {
        return false
    }
 }

// get invoice request
 export  async function getInvoiceRequest() {
    try {
        let result = await axios.get(BaseURL+'/api/v1/invoiceRead');
        let data = result['data']['data']
        return data;
    }
    catch (e) {
        return false
    }
 }




