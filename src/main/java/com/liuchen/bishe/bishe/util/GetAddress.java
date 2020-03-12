package com.liuchen.bishe.bishe.util;

import com.liuchen.bishe.bishe.dao.AddressMapper;
import com.liuchen.bishe.bishe.vo.AddressVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @program: bishe
 * @description: 得到用户的消息地址
 * @author: liuchen
 * @create: 2020-02-19 11:55
 **/
@Component
public class GetAddress {


    @Autowired
    private AddressMapper addressMapper;

    public   String getCustomerAddress(String address,String addressDetail){
        StringBuffer stringBuffer = new StringBuffer();
        if(address != null) {
            List<Integer> address1 = AddressUtil.dismantlingAddress(address);
            for (int a : address1) {
                if (a == -1) {
                    continue;
                }
                if(a == -2){
                    continue;
                }
                AddressVo addressVo = addressMapper.findAddressById(a);
                stringBuffer.append(addressVo.getText());
            }
            stringBuffer.append(addressDetail.trim());
        }else {
            stringBuffer.append(addressDetail.trim());
        }

        return  stringBuffer.toString();
    }



}
