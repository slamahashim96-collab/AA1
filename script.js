// ===============================
// AI WADA AIRLINE APP SCRIPT
// ===============================

let data = {};

// ===============================
// PAGE NAVIGATION
// ===============================
function openPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display = "none";
});

document.getElementById(page).style.display = "block";
}

// ===============================
// PRICE SYSTEM (NIGERIA ROUTES)
// ===============================
function getPrice(from, to, airline){

let price = 50000;

// ROUTES
if(from.includes("Lagos") && to.includes("Abuja")) price = 60000;
if(from.includes("Lagos") && to.includes("Kano")) price = 75000;
if(from.includes("Abuja") && to.includes("Enugu")) price = 50000;
if(from.includes("Abuja") && to.includes("Port")) price = 55000;
if(from.includes("Kano") && to.includes("Lagos")) price = 75000;

// AIRLINE EFFECT
if(airline === "Air Peace") price += 5000;
if(airline === "Ibom Air") price += 8000;
if(airline === "Arik Air") price += 3000;

return price;
}

// ===============================
// SEARCH FLIGHT
// ===============================
function search(){

let name = document.getElementById("name").value;
let from = document.getElementById("from").value;
let to = document.getElementById("to").value;
let airline = document.getElementById("airline").value;
let date = document.getElementById("date").value;
let adult = document.getElementById("adult").value || 1;
let child = document.getElementById("child").value || 0;

// GENERATE SEAT
let seat = "SEAT-" + Math.floor(Math.random() * 200);

// PRICE CALCULATION
let total = getPrice(from, to, airline);

// SAVE DATA
data = {
name,
from,
to,
airline,
date,
adult,
child,
seat,
total
};

// SHOW RESULT
document.getElementById("result").innerHTML = `
<h3>Flight Found ✔</h3>
<p><b>From:</b> ${from}</p>
<p><b>To:</b> ${to}</p>
<p><b>Airline:</b> ${airline}</p>
<p><b>Seat:</b> ${seat}</p>
<p><b>Total Price:</b> ₦${total}</p>

<br>

<button class="btn" onclick="openPage('passenger')">
Next
</button>
`;
}

// ===============================
// PASSENGER VALIDATION
// ===============================
function goPayment(){

let pname = document.getElementById("pname").value;
let phone = document.getElementById("phone").value;
let email = document.getElementById("email").value;
let cemail = document.getElementById("cemail").value;

// VALIDATION
if(!pname || !phone || !email || !cemail){
alert("Please fill all passenger details");
return;
}

if(email !== cemail){
alert("Emails do not match!");
return;
}

// STORE PASSENGER DATA
data.pname = pname;
data.phone = phone;
data.email = email;

// GO TO PAYMENT PAGE
openPage("payment");

// PAYMENT UI
document.getElementById("paybox").innerHTML = `
<h3>Payment</h3>

<p><b>Name:</b> ${data.pname}</p>
<p><b>Phone:</b> ${data.phone}</p>
<p><b>Route:</b> ${data.from} → ${data.to}</p>
<p><b>Airline:</b> ${data.airline}</p>
<p><b>Seat:</b> ${data.seat}</p>
<p><b>Total:</b> ₦${data.total}</p>

<input placeholder="Card Number">
<input placeholder="Expiry Date">
<input placeholder="CVV">

<button class="btn" onclick="payNow()">Pay Now</button>
`;
}

// ===============================
// PAYMENT SUCCESS
// ===============================
function payNow(){

openPage("ticket");

// SHOW TICKET
document.getElementById("ticketbox").innerHTML = `
<h2>Ticket Confirmed ✔</h2>

<p><b>Name:</b> ${data.pname}</p>
<p><b>Email:</b> ${data.email}</p>
<p><b>Phone:</b> ${data.phone}</p>
<p><b>Route:</b> ${data.from} → ${data.to}</p>
<p><b>Airline:</b> ${data.airline}</p>
<p><b>Seat:</b> ${data.seat}</p>
<p><b>Total Paid:</b> ₦${data.total}</p>

<br>

<p style="color:green">
✔ Payment Successful<br>
✔ Ticket Generated<br>
✔ Email Sent (Demo)<br>
✔ WhatsApp Sent (Demo)
</p>
`;
}
