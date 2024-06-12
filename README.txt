
Live Link=  https://deploy-invoice-generator-3e6p.vercel.app/


change directory to client- cd client
change directory to server - cd server

client side start= npx vite
server side start = npm start


====================================================
Ans: 
    Hourly rate calculation: 6 hours * $10/hour = $60

This means that the customer would pay $60 if they rented the Tesla for six hours at the hourly rate. However, the daily rate is $50, which is less than the amount calculated using the hourly rate for six hours.

To ensure that customers are not charged more than the daily rate for renting a car for less than a day, we can implement a pricing strategy that caps the maximum charge at the daily rate. Here’s how you can handle the issue for hourly, daily, and weekly rate systems:

    Hourly and Daily Rate Cap:
        Calculate the cost using the hourly rate.
        Compare this cost with the daily rate.
        Charge the customer the lower of the two amounts.

    For example, for a six-hour rental:
        Hourly cost: $60
        Daily cost: $50
        Charge: $50 (since $50 < $60)

    Daily and Weekly Rate Cap:
        If a customer rents the car for multiple days, compare the total daily charges with the weekly rate (if a weekly rate is available).
        If the total daily charges exceed the weekly rate, charge the weekly rate.

    Suppose the weekly rate is $300:
        If a customer rents the car for 7 days, the daily charge would be 7 * $50 = $350.
        Since $350 > $300, the customer should be charged $300.

Implementation of the Pricing Strategy

Here's how you can structure the pricing logic:

    Determine the total rental duration.
    Calculate the cost for each pricing tier (hourly, daily, weekly).
    Select the minimum cost from the applicable tiers.

Example Calculation for Various Durations:

    Less than a day (e.g., 6 hours):
        Hourly cost: hours×hourly ratehours×hourly rate
        Daily cost: daily ratedaily rate
        Charge: min⁡(hourly cost,daily cost)min(hourly cost,daily cost)

    Multiple days but less than a week (e.g., 3 days):
        Daily cost: days×daily ratedays×daily rate
        Weekly cost (if applicable): weekly rateweekly rate
        Charge: min⁡(daily cost,weekly cost)min(daily cost,weekly cost)

    More than a week (e.g., 10 days):
        Weekly cost: ⌊days7⌋×weekly rate⌊7days​⌋×weekly rate
        Remaining days: days%7days%7
        Daily cost for remaining days: remaining days×daily rateremaining days×daily rate
        Total cost: weekly cost+daily cost for remaining daysweekly cost+daily cost for remaining days
        Compare this total cost with daily charges for all days: days×daily ratedays×daily rate
        Charge: min⁡(total cost,days×daily rate)min(total cost,days×daily rate)