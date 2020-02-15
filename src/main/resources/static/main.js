var clicked = false;
var record;
var input = document.querySelector('input');
let cart = [];

const deleteCourse = (id) => {
	$.ajax({
		type: 'DELETE',
		url: `api/products/${id}`,
		success: () => loadData(input.value)
	});
}

const showCourse = (id) => {
	$.get({
		url: `api/products/${id}`,
		success: ({prod_name, prod_price, category}) => {
			let template = `<div class="col-12 d-flex justify-content-center">
                <div class="card" style="width: 18rem; margin: 1em 0;">
                <div class="card-body">
                    <h5 class="card-title">${prod_name}</h5>
                    <p class="card-text">INR ${prod_price}</p>
                    <p class="card-text category">${category}</p>
                    <button class="btn btn-primary" onclick="requestData()">Load All Courses</a>
                </div>
            </div>
        	</div>`
            $('#ProductDetailsContainer').html("");
			$('#ProductDetailsContainer').append(template);	
		}
	})
}

const addProductToCart = (id) => {
	$.get({
		url: `api/products/${id}`,
		success: (result) => {
			cart.push(result);
			console.log(cart);
		}
	})
	cart.push();
}

const removeProductFromCart = (prod_id) => {
	cart = cart.filter(({id}) => id !== prod_id );
	showCart();
}

const showCart = () => {
	$('#ProductDetailsContainer').html("");
	
//	cart && cart.map(({ id, prod_name, prod_price }) => {
//		let template = `<div class=" col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
//            <div class="card" style="width: 18rem; margin: 1em 0;">
//            <div class="card-body">
//                <h5 class="card-title">${prod_name}</h5>
//                <p class="card-text">₹ ${prod_price}</p>
//                <button class="btn btn-danger" onclick="removeProductFromCart(${id})" >Remove From Cart</button>
//            </div>
//        </div>
//    	</div>`
//        $('#ProductDetailsContainer').append(template)
//	})
	
	cart.length !== 0 ? cart && cart.map(({ id, prod_name, prod_price }) => {
		let template = `<div class=" col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <div class="card" style="width: 18rem; margin: 1em 0;">
            <div class="card-body">
                <h5 class="card-title">${prod_name}</h5>
                <p class="card-text">₹ ${prod_price}</p>
                <button class="btn btn-danger" onclick="removeProductFromCart(${id})" >Remove From Cart</button>
            </div>
        </div>
    	</div>`
        $('#ProductDetailsContainer').append(template)
	}) : $('#ProductDetailsContainer').append(`<div class="alert alert-danger w-100 text-center" role="alert">No Records Found In Cart</div>`);
}

const loadData = (productName) => {
    $.get({
        url: "api/products", success: function (result) {
            if(!productName) {
                record = result;
            } else {
                record = result.filter(data => data.category.toLowerCase().includes(productName));
            }
            $("#ProductDetailsContainer")[0].innerHTML = "";
            record.length != 0 ?
            	record.forEach(({ id, prod_name, prod_price, category}) => {
                let template = `<div class=" col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                        <div class="card" style="width: 18rem; margin: 1em 0;">
                        <div class="card-body">
                            <h5 class="card-title">${prod_name}</h5>
                            <p class="card-text">₹ ${prod_price}</p>
                            <p class="card-text category">${category}</p>
                            <button class="btn btn-dark" onclick="addProductToCart(${id})" >Add To Cart</button>
                        </div>
                    </div>
                	</div>`
                	$('#ProductDetailsContainer').append(template);
            	}) 
             : $('#ProductDetailsContainer').append(`<div class="alert alert-danger w-100 text-center" role="alert">No Records Found</div>`);
        }
    });
}

const requestData = (product) => {
    loadData(product);
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

requestData(input.value);

input.addEventListener('keyup', debounce(e => {
    if((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode !== 20) {
        loadData(input.value.toLocaleLowerCase());
    }
}, 500));