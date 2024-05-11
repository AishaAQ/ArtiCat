const purchaseForm = document.querySelector("#purchase-form");

const cancel = document.querySelector("#cancel-btn");

// const users = localStorage.users
// const user = JSON.parse(users)
// const foundUser = user.find((u) => u.username === localStorage.currentUser)

document.addEventListener("DOMContentLoaded", showFormFields);
purchaseForm.addEventListener("submit", confirmedPurchase);

cancel.addEventListener("click", cancelPurchase);

async function showFormFields() {
  const response1 = await fetch(`api/${localStorage.currentUser}`, {
    method: "GET",
  });
  const user = await response1.json();
  if (user.customer.shippingAddress) {
    purchaseForm.elements["name"].value = user.customer.name;
    purchaseForm.elements["surname"].value = user.customer.surname;
    purchaseForm.elements["phoneNumber"].value = user.customer.phoneNumber;
    purchaseForm.elements["address"].value =
      user.customer.shippingAddress.split(",")[0];
    purchaseForm.elements["country"].value =
      user.customer.shippingAddress.split(",")[1];
  }
}

async function confirmedPurchase(e) {
  e.preventDefault();

  let updatedItem = {};
  let updatedCustomer = {};
  const response2 = await fetch(`api/items/${localStorage.currentItemId}`, {
    method: "GET",
  });
  const item = await response2.json();

  const response1 = await fetch(`api/${localStorage.currentUser}`, {
    method: "GET",
  });
  const user = await response1.json();
  const swalWithBootstrapButtons = Swal.mixin();

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure about your purchase?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d65f83",
      cancelButtonColor: "#d65f83",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        const purchaseDetails = formToObject(e.target);

        const totalPrice = item.price * localStorage.custQuantity;

        //update PUT
        quantity = item.quantity;
        quantity -= localStorage.custQuantity;
        // item.quantity -= localStorage.custQuantity;
        updatedItem.quantity = quantity;

        //update
        //update customer
        // user.customer.moneyBalance -= totalPrice;
        balance = user.customer.moneyBalance;
        balance -= totalPrice;
        updatedCustomer.moneyBalance = balance;
        // user.customer.name = purchaseDetails.name;
        updatedCustomer.name = purchaseDetails.name;
        // user.customer.surname = purchaseDetails.surname;
        updatedCustomer.surname = purchaseDetails.surname;
        // user.customer.phoneNumber = purchaseDetails.phoneNumber;
        updatedCustomer.phoneNumber = purchaseDetails.phoneNumber;
        // user.customer.shippingAddress = `${purchaseDetails.address}, ${purchaseDetails.city}`;
        updatedCustomer.shippingAddress = `${purchaseDetails.address},${purchaseDetails.country}`;

        console.log(updatedCustomer.shippingAddress);

        addPurchase(user.customer, item);

        // localStorage.users = JSON.stringify(user)
        // localStorage.items = JSON.stringify(item)

        console.log(updatedItem);
        console.log(updatedCustomer);

        const updatedData = async () => {
          const response3 = await fetch(
            `api/items/${localStorage.currentItemId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedItem),
            }
          );
          // const responseData3 = await response3.json();

          //customer PUT

          const response4 = await fetch(`api/${user.username}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCustomer),
          });
          // const responseData4 = await response4.json();
        };

        updatedData()

        swalWithBootstrapButtons
          .fire({
            title: "Purchase Confirmed!",
            text: "Your purchase has been confirmed and added to purchase history.",
            icon: "success",
            confirmButtonColor: "#d65f83",
          })
          .then(() => {
            window.location.href = "mainpage.html";
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your attempt to purchase has been cancelled.",
          icon: "error",
          confirmButtonColor: "#d65f83",
        });
      }
    });
}

function formToObject(form) {
  const formData = new FormData(form);
  const data = {};

  // the name in html will become the key
  for (const [key, value] of formData) {
    data[key] = value;
  }

  return data;
}

async function addPurchase(foundUser, foundItem) {
  let purchase = {};

  // const purchaseNo = JSON.parse(localStorage.purchases).length + 1
  // purchase.purchaseId = `P${purchaseNo}`;

  purchase.quantity = JSON.parse(localStorage.custQuantity);

  // const { seller, ...item } = foundItem; //?
  // const sellerCompany = seller.companyName;
  // item.seller = sellerCompany;
  // purchase.item = { ...item };
  purchase.itemId = foundItem.itemId;

  // const { purchases, ...customer } = foundUser;
  // purchase.customer = { ...customer };

  const totalPrice = foundItem.price * localStorage.custQuantity;
  purchase.totalPrice = totalPrice;

  purchase.date = new Date();
  purchase.customerUN=localStorage.currentUser

  // const updatedPurchases = JSON.parse(localStorage.purchases);
  // updatedPurchases.push(purchase)
  // localStorage.purchases = JSON.stringify(updatedPurchases)

  //use the post
  
  console.log(purchase);

  const response = await fetch("api/purchases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase),
  });
  const responseData = await response.json();

  // delete purchase.totalPrice;
  // foundUser.purchases.push(purchase); //?

  delete localStorage.custQuantity;
  delete localStorage.currentItemId;
}

function cancelPurchase() {
  window.location.href = `itemdetail.html?item=${localStorage.currentItemId}`;

  delete localStorage.custQuantity;
  delete localStorage.currentItemId;
}
