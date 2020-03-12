package com.liuchen.bishe.bishe.entry;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Objects;


/**
 * @program: bishe
 * @description: customer
 * @author: liuchen
 * @create: 2020-02-08 17:31
 **/
@Component
public class Customer implements Serializable {
    private int id;
    private String name;
    private String idCard;
    private int sex;
    private String password;
    private  String phone;
    private String email;
    private String address;
    private String addressDetail;
    private String role;
    private byte[] picture;
    private byte[] idPicture;

    @Value(value = "1")
    private  int   isDelete = 1;

    public Customer(){}


    public Customer(int id, String name, String idCard, int sex, String password, String phone, String email, String address, String addressDetail, String role, byte[] picture, byte[] idPicture) {
        this.id = id;
        this.name = name;
        this.idCard = idCard;
        this.sex = sex;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.addressDetail = addressDetail;
        this.role = role;
        this.picture = picture;
        this.idPicture = idPicture;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public byte[] getIdPicture() {
        return idPicture;
    }

    public void setIdPicture(byte[] idPicture) {
        this.idPicture = idPicture;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", idCard='" + idCard + '\'' +
                ", sex=" + sex +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", addressDetail='" + addressDetail + '\'' +
                ", role='" + role + '\'' +
                ", isDelete=" + isDelete +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return id == customer.id &&
                sex == customer.sex &&
                isDelete == customer.isDelete &&
                Objects.equals(name, customer.name) &&
                Objects.equals(idCard, customer.idCard) &&
                Objects.equals(password, customer.password) &&
                Objects.equals(phone, customer.phone) &&
                Objects.equals(email, customer.email) &&
                Objects.equals(address, customer.address) &&
                Objects.equals(addressDetail, customer.addressDetail) &&
                Objects.equals(role, customer.role) &&
                Arrays.equals(picture, customer.picture) &&
                Arrays.equals(idPicture, customer.idPicture);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, name, idCard, sex, password, phone, email, address, addressDetail, role, isDelete);
        result = 31 * result + Arrays.hashCode(picture);
        result = 31 * result + Arrays.hashCode(idPicture);
        return result;
    }
}
