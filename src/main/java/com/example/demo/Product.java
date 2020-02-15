package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	
	String prod_name;
	String prod_category;
	double prod_price;
	
	Product() {}
	Product(String name, double price, String category) {
		this.prod_name = name;
		this.prod_price = price;
		this.prod_category = category;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getProd_name() {
		return prod_name;
	}
	public void setProd_name(String prod_name) {
		this.prod_name = prod_name;
	}
	public double getProd_price() {
		return prod_price;
	}
	public void setProd_price(double prod_price) {
		this.prod_price = prod_price;
	}
	public String getCategory() {
		return prod_category;
	}
	public void setCategory(String category) {
		this.prod_category = category;
	}
	
	@Override
	public String toString() {
		return "Product [id=" + id + ", prod_name=" + prod_name + ", prod_price=" + prod_price + "]";
	}
	
}
