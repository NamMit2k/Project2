  //Hiện
  function Giohang()
{
    var olist= document.getElementById('myModal')
    olist.style.display="block"; 
}

function product_click1()
{
     var list0= document.getElementById("listsp1")
     list0.style.display="block"; 
     var list3= document.getElementById("listsp2")
     list3.style.display="none"; 
     
} 
function product_click2()
{
     var list1= document.getElementById("listsp1")
     list1.style.display="none";
     var list2 =document.getElementById("listsp2")
     list2.style.display="block";


} 




// Modal
var modal = document.getElementById("myModal"); //Lấy thông tin dựa vào id
var btn = document.getElementById("cart");
var closex = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
 btn.onclick = function () {
  modal.style.display = "block"; //Nếu click vào btn thêm thì modal giỏ hàng sẽ hiển thị
}
closex.onclick = function () {
  modal.style.display = "none";//Nếu click vào X thì đóng modal giỏ hàng lại
}
close_footer.onclick = function () {
  modal.style.display = "none";
}
order.onclick = function () {
  alert("Cảm ơn bạn đã thanh toán đơn hàng") //Click vào thanh toán thì hiển thị ra bảng thông báo  đã thanh toán thành công
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// xóa cart
var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) { 
  var button = remove_cart[i] // Khai báo button= vị trí phần tử cần xóa
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()// Xóa các thông tin liên quan đến phần tử
    updatecart()//Load lại dữ liệu sau khi xóa
  })
}
// thay đổi số lượng
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { // nếu giá trị trong input <=0
      input.value = 1; // thì đưa về mặc định =1
    }
    updatecart()
  })
}

// Thêm vào giỏ
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {
    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src
    var title = product.getElementsByClassName("content-product-h3")[0].innerText
    var price = product.getElementsByClassName("price")[0].innerText
    addItemToCart(title, price, img)
    
    // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    modal.style.display = "block";
    updatecart()
  })
}

function addItemToCart(title, price, img) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {  // Duyệt phần tử nếu trùng tên thì đưa ra thông báo
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
      return
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column" style:"display: flex;" >
      <img class="cart-item-image img-3" src="${img}">
      <span class="cart-item-title t-3">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column s-1">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}
// update cart 
function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName("cart-price")[0]
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
    var price = parseFloat(price_item.innerText)
    var quantity = quantity_item.value
      total = total + (price * quantity)
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total  + 'VNĐ'
}