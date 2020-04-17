package com.liuchen.bishe.bishe.service.impl;

import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.dao.LoanMapper;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.IndexService;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @program: bishe
 * @description: IndexService
 * @author: liuchen
 **/
@Service
public class IndexServiceImpl implements IndexService {

    @Autowired
    private ConstractMapper constractMapper;

    @Autowired
    private LoanMapper loanMapper;

    @Override
    public Map<String, List<Integer>> findCustomerContractStatusWithMonth(String year) {

        //这里利用桶排序来补全
        int[] a = new int[12];
        int[] b = new int[12];
        int[] c = new int[12];

        //如果查询出来之后，月份不全 要补全
        Map<String,List<Integer>> maps = new HashMap<>();
        List<Integer> empty = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        List<CustomerContractMonthVo> constract1 = constractMapper.findCustomerConstractWithMonth(-1,year, ConstractEnum.CONSTRACT_ENUM_AN_SHI_MONEY.getName());
        List<CustomerContractMonthVo> constract2 = constractMapper.findCustomerConstractWithMonth(-1,year, ConstractEnum.CONSTRACT_ENUM_TI_QIAN_MONEY.getName());
        List<CustomerContractMonthVo> constract3 = constractMapper.findCustomerConstractWithMonth(-1,year, ConstractEnum.CONSTRACT_ENUM_YU_QI_MONEY.getName());
        List<Integer> anShi = new ArrayList<>();
        List<Integer> tiQian = new ArrayList<>();
        List<Integer> yuQi = new ArrayList<>();



        //如果按时还款没有数据
        if(true == constract1.isEmpty() || constract1 == null){
            //全为0
            anShi = empty;
        }else {
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                a[vo.getMonth()-1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                anShi.add(a[i]);
            }


        }


        if(true == constract2.isEmpty() || constract2 == null){
            tiQian = empty;
        }else{
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                b[vo.getMonth()-1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                tiQian.add(b[i]);
            }
        }



        if(true == constract3.isEmpty() || constract3 == null){
            yuQi = empty;
        }else{
            //有数据
            for (CustomerContractMonthVo vo : constract1) {
                c[vo.getMonth()-1] = vo.getCount();
            }
            for (int i = 0; i < a.length; i++) {
                yuQi.add(c[i]);
            }
        }
        maps.put("anShi",anShi);
        maps.put("tiQian",tiQian);
        maps.put("yuQi",yuQi);
        return maps;
    }




    @Override
    public int infoContract(String status) throws FindException {
        int count = constractMapper.countContractByStatus(status);
        if(count < 0){
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return count;
    }


    @Override
    public int infoLoanApplication() throws FindException {
        int count = loanMapper.countLoanApplicationWithStatus();
        if(count < 0) {
            throw new FindException(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND);
        }
        return count;
    }




}
