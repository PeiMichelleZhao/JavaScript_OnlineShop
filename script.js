/** 1. read data from json file
 *  2. render data to UI
 *  3. refresh UI when selected option change
 */
var data;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//read data from json file
readTextFile("./products.json", function (text) {
    data = JSON.parse(text);
    for (var i = 0; i < data.length; i++) {
        //render data to UI
        addListItem(data[i]);
    }
});

function addListItem(obj) {
    var html, newHtml;

    if (obj.isSale) {
        html = `<div class="item"><div class="item__image"><img src="./Products/%productImage% " class="image__size"></div><div class="item__isSale">Sale</div><div class="item__product item__name">%productName%</div><div class="item__product item__price">%price%</div></div>`;
    } else if (obj.isExclusive) {
        html = `<div class="item"><div class="item__image"><img src="./Products/%productImage%" class="image__size"></div><div class="item__isExclusive">Exclusive</div><div class="item__product item__name">%productName%</div><div class="item__product item__price">%price%</div></div>`;
    } else {
        html = `<div class="item"><div class="item__image"><img src="./Products/%productImage%" class="image__size"></div><br><div class="item__product item__name">%productName%</div><div class="item__product item__price">%price%</div></div>`;
    }

    // replace the placeholder text with some actual data
    newHtml = html.replace('%productImage%', obj.productImage);
    newHtml = newHtml.replace('%isSale%', obj.isSale);
    newHtml = newHtml.replace('%isExclusive%', obj.isExclusive);
    newHtml = newHtml.replace('%productName%', obj.productName);
    newHtml = newHtml.replace('%price%', obj.price);

    // insert the html into the DOM
    document.querySelector('.container').insertAdjacentHTML('beforeend', newHtml);
};

//refresh UI when selected option change
function changeSize() {
    //clear container
    document.querySelector('.container').textContent = "";


    var selectSize = document.getElementById('size').value;
    if (selectSize === "ALL") {
        for (var i = 0; i < data.length; i++) {
            //show all data to UI
            addListItem(data[i]);
        }
    } else {
        var objSize = [];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].size.length; j++)
                if (data[i].size[j] === selectSize) {
                    objSize.push(data[i])
                }
        }
        for (var i = 0; i < objSize.length; i++) {
            //only show data includes selcted size
            addListItem(objSize[i])
        }
    }
};