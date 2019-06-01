let template = $('#my-template').html();
let productHolder = $('#product-holder');
let buyBtn;
let buyCounter = localStorage.getItem("buyCounter");
let shopBag = $('.shopCart').html(buyCounter);
let rg = new RegExp('{{productTitle}}', 'gi');
let md = new RegExp('{{model}}', 'gi');



let id = localStorage.getItem("id");
id = JSON.parse(id);


let imgSrc = "product".concat(id)
let text = '';



$.ajax({
    url: 'https://raw.githubusercontent.com/Robertusto/cxx/master/xd.json',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(res) {
    res.forEach(function(el) {
      if (el.imgSrc === imgSrc) {
        text += template.replace('{{imgSrc}}', el.imgSrc)
          .replace(rg, el.productTitle)
          .replace(md, el.model)
          .replace('{{price}}', el.price)

      }
    })
    productHolder.append(text);
    $('.thumbnail').on('click', function(e) {
      e.preventDefault()
      let src = $(this).attr('src');
      $('.placeholder').attr('src', src);
    })

    buyBtn = $('.product-item-btn');
    buyBtn.on('click', function(res) {
      addTocart(res)

    })
  })

function addTocart(res) {
  $(shopBag).html(buyCounter);
  buyCounter++;

  $(shopBag).animate({
    height: '23px',
    width: '23px'
  }, 50);
  $(shopBag).animate({
    height: '19px',
    width: '19px'
  }, 50);
  $(shopBag).html(buyCounter);
  localStorage.setItem('buyCounter', JSON.stringify(buyCounter));
}


let clearCart = $('[data-cart="clear"]');


clearCart.on('click', function(res) {
  localStorage.removeItem('buyCounter');
  location.reload();
})


if (buyCounter >= 1) {
  $(shopBag).css('display', "inline-block");
}



$('#toTop').on('click', function(event) {

  var target = $(this.getAttribute('href'));

  if (target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top
    }, 1000);
  }
});



function changeImageOnClick(event) {
  event = event || window.event;
  var targetElement = event.target || event.srcElement;

  if (targetElement.tagName == "IMG") {
    mainImage.src = targetElement.getAttribute("src");
  }
}
