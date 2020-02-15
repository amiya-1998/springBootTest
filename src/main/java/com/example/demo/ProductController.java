package com.example.demo;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	ProductRepo prodRepo;
	
	@GetMapping("/test")
	public String test() {
		return "Test";
	}
	
	@GetMapping("/products")
	public List<Product> getAllProducts(HttpServletResponse httpResponse) {
		httpResponse.setStatus(200);
		return prodRepo.findAll();
	}
	
	@GetMapping("/products/{id}")
	public Product getProductById(@PathVariable int id) {
		return prodRepo.findById(id).get();
	}
	
	@PostMapping("/products")
	public void addProduct(@RequestParam Map<String, String> body, HttpServletResponse httpResponse) {
		prodRepo.save(new Product(body.get("prod_name"), Double.parseDouble(body.get("prod_price")), body.get("prod_category")));
		httpResponse.setStatus(201);
		try {
			httpResponse.sendRedirect("/admin.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping("/products/{id}")
	public void updateProduct(@PathVariable("id") int id, @RequestParam Map<String, String> body, HttpServletResponse httpResponse) {
		Product product = getProductById(id);
		product.prod_name = body.get("prod_name");
		product.prod_price = Double.parseDouble(body.get("prod_price"));
		product.prod_category = body.get("prod_category");
		prodRepo.save(product);
		try {
			httpResponse.sendRedirect("/admin.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@DeleteMapping("/products/{id}")
	public void deleteProduct(@PathVariable("id") int id) {
		prodRepo.deleteById(id);
	}
}
