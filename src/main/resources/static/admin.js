var clicked = false;
var record;
var input = document.querySelector('input');

const deleteProduct = (id) => {
	$.ajax({
		type: 'DELETE',
		url: `api/products/${id}`,
		success: () => loadData(input.value)
	});
}

const showProduct = (id) => {
	$.get({
		url: `api/products/${id}`,
		success: ({prod_name, prod_price, category}) => {
			let template = `<form action=${`api/products/${id}`} method="POST" class="w-100">
        		<div class="form-group">
        			<label for="prod_name">Product Name: </label>
        			<input type="text" class="form-control" id="prod_name" placeholder="Enter Product Name" name="prod_name" value=${prod_name} required>
        		</div>
        		<div class="form-group">
        			<label for="prod_price">Product Price: </label>
        			<input type="number" class="form-control" id="prod_price" placeholder="Enter Product Price" name="prod_price" value=${prod_price} required>
        		</div>
        		<div class="form-group">
    				<label for="prod_category">Product Category</label>
					<select name="prod_category" class="form-control" id="prod_category" required>
						<option disabled>Select Product Category</option>
      					<option value="eatables" ${category === "eatables" ? "selected" : null}>Eatables</option>
					    <option value="electronics" ${category === "electronics" ? "selected" : null}>Electronics</option>
					    <option value="clothes" ${category === "clothes" ? "selected" : null}>Clothes</option>
					    <option value="kids" ${category === "kids" ? "selected" : null}>kids</option>
    				</select>
  				</div>
        		<input type="submit" class="btn btn-primary">
        	</form>`
            $('#ProductDetailsContainer').html("");
			$('#ProductDetailsContainer').append(template);	
		}
	})
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
                            <button class="btn btn-danger" onclick="deleteProduct(${id})" >Delete</button>
                            <button class="btn btn-primary" onclick="showProduct(${id})" >Edit</button>
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