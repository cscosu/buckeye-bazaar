
const items = {
    "scott": {
        "title": "Eat Without Mask On",
        "description": "Valid at any Traditions location",
        "thumbnail": "static/img/scott.jpg",
        "cost": 500,
        "content": "ih\x1a\\_nq__h\x1amcjm"
    },
    "email": {
        "title": "Email from Kristina M. Johnson",
        "description": "Moral support when you need it most",
        "thumbnail": "static/img/email.png",
        "cost": 69,
        "content": "siol\x1amiof(\x1ab[h^\x1acn\x1aip_l"
    },
    "together": {
        "title": "#TogetherAsBuckeyes",
        "description": "Free! They have our best interests in mind :)",
        "thumbnail": "static/img/together.png",
        "cost": 0,
        "content": "loh"
    },
    "robot": {
        "title": "Food Robot Delivery",
        "description": "The AI overlords will not be pleased",
        "thumbnail": "static/img/robot.png",
        "cost": 20,
        "content": "q_\x1aqcff\x1al_nolh"
    },
    "walkways": {
        "title": "Fix Campus Walkways",
        "description": "Because who else is supposed to do it",
        "thumbnail": "static/img/walkways.png",
        "cost": 1500,
        "content": "sio\x1amb[ff\x1amfcj\x1ahi\x1afiha_l"
    },
    "chitt": {
        "title": "Undo Chitt Fest",
        "description": "We did it Patrick! We won the Spring Game!",
        "thumbnail": "static/img/chitt.png",
        "cost": 4000,
        "content": "q_\x1a^i\x1ahin\x1a]ih^ih_\x1ap[h^[fcmg"
    },
    "jon": {
        "title": "COVID-19 Testing Center North Ticket",
        "description": "Come spit in a tube while people watch you (it's free)",
        "thumbnail": "static/img/jon.jpg",
        "cost": 0,
        "content": "ko[l[hnch_"
    },
    "the": {
        "title": "Right to use THE®️",
        "description": "If you steal this word Kristina will sue you",
        "thumbnail": "static/img/the.png",
        "cost": 500,
        "content": "ibci\x1amn[n_\x1aohcp_lmcns"
    },
    "froge": {
        "title": "froge",
        "description": "ribbit",
        "thumbnail": "static/img/froge.jpg",
        "cost": 7500,
        "content": "lc\\\\cn"
    },
    "coffee": {
        "title": "Edge of Campus Starbucks Coffee",
        "description": "Tastes the same as any coffee on campus and only costs your life savings",
        "thumbnail": "static/img/covfefe.jpg",
        "cost": 3000,
        "content": "c!g\x1amncff\x1aaihh[\x1a\\os\x1acn\x1anbi"
    },
    "flag": {
        "title": "✨The Flag ✨",
        "description": "You literally can't afford me",
        "thumbnail": "static/img/flag.jpg",
        "cost": 10000000,
        "content": "`f[aup.f+^.1-YolY+hjo1w"
    }
};

var balance = 3000;
var cart = {};

function z(_0x4640bd){var _0x26db16='';for(var _0x2d2829=0x0;_0x2d2829<_0x4640bd['length'];_0x2d2829++){var _0x5342b2=_0x4640bd['charCodeAt'](_0x2d2829),_0x4f78a7=_0x5342b2+0x6;_0x26db16=_0x26db16+String['fromCharCode'](_0x4f78a7);}return _0x26db16;}

function populateListings() {
    var shop = document.getElementById("shop-content");
    var content = "";
    Object.keys(items).forEach(key => {
        var title = items[key]["title"];
        var thumb = items[key]["thumbnail"];
        var desc = items[key]["description"];
        var price = items[key]["cost"];
        content += "<div class='listing'>";
        content += `<div class="listing-title"><strong>${title}</strong></div>`;
        content += `<div class="listing-img" style="background-image: url('${thumb}');"></div>`;
        content += `<div class="listing-description">${desc}</div>`;
        content += `<div class="add-button button-enabled" onclick="addToCart('${key}')"><strong>Add to Cart | $${price}</strong></div>`;
        content += "</div>"
    });
    shop.innerHTML = content;
}

function getTotalCartQuantity() {
    var totalQuantity = 0;
    var keys = Object.keys(cart);
    for(var i = 0; i < keys.length; i++) totalQuantity += cart[keys[i]]["quantity"];
    return totalQuantity;
}

function getTotalCartValue() {
    var totalValue = 0;
    var keys = Object.keys(cart);
    for(var i = 0; i < keys.length; i++) totalValue += cart[keys[i]]["quantity"] * items[keys[i]]["cost"];
    return totalValue;
}

function purchase() {
    var total = getTotalCartValue();

    var receipt = document.getElementById("receipt-content");
    var content = "<table>";
    var keys = Object.keys(cart);
    for(var i = 0; i < keys.length; i++) {
        var name = keys[i];
        var title = items[name]["title"];
        var price = items[name]["cost"];
        var amt = cart[keys[i]]["quantity"];
        var dat = items[name]["content"];
        if(amt > 0) content += `<tr><td>${amt}</td><td>${title}</td><td>$${price}</td></tr><tr><td>\t</td><td>${z(dat)}</td><td>$${price * amt}</td></tr>`
    }
    content += `<tr><th style="width:10%">Total</th><th style="width:70%"></th><th style="width:20%">$${total}</th></tr></table>`;
    receipt.innerHTML = content;

    balance -= total;
    cart = {};
    switchPage("receipt");
}

function updateCart() {
    var cc = document.getElementById("cart-content");
    var content = "<table><tr><th style='width:25%'></th><th style='width:50%'>Item</th><th style='width:10%'>Quantity</th><th style='width:15%'>Price</th></tr>";
    var keys = Object.keys(cart);
    for(var i = 0; i < keys.length; i++) {
        var name = keys[i];
        var title = items[name]["title"];
        var thumb = items[name]["thumbnail"];
        var price = items[name]["cost"];
        var amt = cart[keys[i]]["quantity"];
        content += `<tr><td><img src="${thumb}" /></td><td>${title}</td><td>`;
        content += `<input type="text" value="${amt}" size=3 onchange="setCartAmt('${name}', this.value)" />`
        content += `</td><td>$${price * amt}</td></tr>`;
    }
    content += "<tr><th>Total</th><th></th><th></th><th></th></tr></table>";
    cc.innerHTML = content;

    var button = document.getElementById("purchase-button");
    var value = getTotalCartValue();
    button.innerHTML = `Buy for $${value}`;
    if(value > balance) {
        button.classList.remove("button-enabled");
        button.classList.add("button-disabled");
        button.onclick = function (){};
    } else {
        button.classList.remove("button-disabled");
        button.classList.add("button-enabled");
        button.onclick = purchase;
    }
}

function refreshPage() {
    document.getElementById("cart-desc").innerHTML = `Cart (${getTotalCartQuantity()})`;
    document.getElementById("balance-desc").innerHTML = `Balance: $${balance}`;
    updateCart();
}

function addToCart(item) {
    if(item in cart) {
        cart[item]["quantity"] += 1;
    } else {
        cart[item] = { "quantity": 1 };
    }
    refreshPage();
}

function setCartAmt(item, amt) {
    const val = parseInt(amt);
    if(isNaN(val)) return;

    if(item in cart) {
        if(amt == 0) {
            delete cart[item];
        } else {
            cart[item]["quantity"] = amt;
        }
    }
    refreshPage();
}

function switchPage(pageName) {
    var pages = document.getElementsByClassName("page");
    Array.from(pages).forEach(element => {
        element.hidden = true;
    });

    var page = document.getElementById(pageName);
    page.hidden = false;
    refreshPage();
}

function onLoad() {
    populateListings();
    refreshPage();
}