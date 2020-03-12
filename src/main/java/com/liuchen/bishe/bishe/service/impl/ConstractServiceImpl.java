package com.liuchen.bishe.bishe.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.dao.CustomerMapper;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.util.ContractUtil;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: bishe
 * @description: ConstractService实现类
 * @author: liuchen
 * @create: 2020-02-16 11:29
 **/
@Service
public class ConstractServiceImpl implements ConstractService {

    @Autowired
    private  ConstractMapper constractMapper;

    @Autowired
    private CustomerMapper customerMapper;



    @Override
    public PageInfo findAllCusotmerByPage(int offset, int pageNumber, String idCard, ConstractEnum constractEnum) throws FindException {
        int customerId = -1;
        if(idCard != null){
            List<Customer> customers = customerMapper.findCustomerByIdCard(idCard, null);
            if(true == customers.isEmpty()){
                throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
            }
            if(customers.size() > 1){
                throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_FINDMANY);
            }
            customerId = customers.get(0).getId();

        }
        PageHelper.startPage(offset,pageNumber);
        List<Contract> contracts = constractMapper.listConstractByCustomerIdAndStatus(customerId, constractEnum.getName());
        if(contracts.isEmpty()){
            throw  new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        contracts= ContractUtil.overdure(contracts);
        return  new PageInfo<>(contracts);

    }




    @Override
    public Map<String, List<Integer>> findCustomerContractStatusWithMonth(int customerId,String year) {
        Map<String,List<Integer>> maps = new HashMap<>();
        List<Integer> empty = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        List<CustomerContractMonthVo> constract1 = constractMapper.findCustomerConstractWithMonth(customerId,year, ConstractEnum.CONSTRACT_ENUM_AN_SHI_MONEY.getName());
        List<CustomerContractMonthVo> constract2 = constractMapper.findCustomerConstractWithMonth(customerId,year, ConstractEnum.CONSTRACT_ENUM_TI_QIAN_MONEY.getName());
        List<CustomerContractMonthVo> constract3 = constractMapper.findCustomerConstractWithMonth(customerId,year, ConstractEnum.CONSTRACT_ENUM_YU_QI_MONEY.getName());
        List<Integer> anShi = null;
        List<Integer> tiQian = null;
        List<Integer> yuQi = null;
        if(true == constract1.isEmpty()){
            anShi = empty;
        }else {
            for (CustomerContractMonthVo vo :
                    constract1) {
                anShi.add(vo.getCount());
            }
        }

        if(true == constract2.isEmpty()){
            tiQian = empty;
        }else{
            for (CustomerContractMonthVo vo :
                    constract2) {
                tiQian.add(vo.getCount());
            }
        }

        if(true == constract3.isEmpty()){
            yuQi = empty;
        }else{
            for (CustomerContractMonthVo vo :
                    constract3) {
                yuQi.add(vo.getCount());
            }
        }
        maps.put("anShi",anShi);
        maps.put("tiQian",tiQian);
        maps.put("yuQi",yuQi);
        return maps;
    }




    @Override
    public void repayment(String no, ConstractEnum constractEnum,int assessingOfficerId) {
        constractMapper.updateContract(no,constractEnum.getName(),assessingOfficerId);
    }




    @Override
    public Contract getContractByNoAndStatus(String no, ConstractEnum constractEnum) throws FindException {
        Contract contract = constractMapper.getContractByno(no, constractEnum.getName());
        if(contract == null){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return contract;
    }
}
