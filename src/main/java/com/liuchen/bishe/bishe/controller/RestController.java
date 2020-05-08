package com.liuchen.bishe.bishe.controller;


import com.liuchen.bishe.bishe.dao.*;

import com.liuchen.bishe.bishe.entry.Customer;
import com.liuchen.bishe.bishe.entry.Score;
import com.liuchen.bishe.bishe.myEnum.ExceptionCodeEnum;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.service.SendEmail;
import com.liuchen.bishe.bishe.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.concurrent.ThreadLocalRandom;

/**
 * @program: bishe
 * @description: json控制器
 * @author: liuchen
 * @create: 2020-02-09 18:28
 **/
@Controller
@Slf4j
public class RestController {



    @Autowired
    private AddressMapper addressMapper;

    @Autowired
    private ConstractMapper constractMapper;


    @Autowired
    private ConstractService constractService;

    @Autowired
    private ScoreMapper scoreMapper;


    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private LoanMaxYearMapper loanMaxYearMapper;



    @Autowired
    private SendEmail sendEmail;




    //贷款申请 输入贷款金额，查询能贷款的最大年份
    @GetMapping("/loanMoney")
    @ResponseBody
    public ReturnT getLoanYear(String money){
            if(money.trim() != "" ){
                BigDecimal decimal = new BigDecimal(money);
                List<LoanMaxYearVo> money1 = loanMaxYearMapper.findByMoney(decimal);
                if(true == money1.isEmpty()){
                    return ReturnT.FAIL;
                }
                return  new ReturnT(money1.get(0));
            }
            return ReturnT.FAIL;
    }




    //地址联动下拉框
    @GetMapping("/address")
    @ResponseBody
    public List<AddressVo> searchAddress(Integer id){
        if(id == null){
            id=0;
        }
        List<AddressVo> addressList = addressMapper.searchAddress(id);
        System.out.println(addressList.size());
        return  addressList;
    }




    //用户贷款下拉框 得到用户贷款年份 最大和最小
    @GetMapping("/customerYear")
    @ResponseBody
    public ReturnT  getCustomerYear(int  customerId){
        log.info("----> 用户贷款下拉框  url:customerYear");
        List<Integer> years = constractMapper.selectConstractMinMaxYear(customerId);
        if(true == years.isEmpty()){
            log.info("----> 该用户 **没有 ** 贷款");
            return ReturnT.FAIL;
        }
        log.info("----> 该用户有贷款");
        ArrayList<Integer> integers = new ArrayList<>();
        if(years != null){
            integers.add(years.get(0));
            integers.add(years.get(1));
        }

        return new ReturnT(integers);
    }



    //用户信用分图
    @GetMapping("/CustomerScore")
    @ResponseBody
    public ReturnT getCustomerScore(Integer customerId){
        Score score = scoreMapper.findCustomerScoreByCustomerId(customerId);
        if(score == null){
           return ReturnT.FAIL;
        }
        return  new ReturnT(score);
    }



    //用户贷款情况折线图
    @GetMapping("/CustomerConstract")
    @ResponseBody
    public ReturnT getCustomerConstract(Integer customerId,String year){
        Map<String, List<Integer>> constractStatus = null;
        log.info("------> 用户贷款折线图：/CustomerConstract  {}  year{}",customerId,year);
        if(true == year.equals("-1")) {
            //默认查找用户最新的数据
            log.info("------> 默认查找用户最新的数据");

            List<Integer> years = constractMapper.selectConstractMinMaxYear(customerId);
            log.info("{} 的贷款年份有：{}",customerId,years);
            //如果years为null 那就说明这个用户并没有贷款，返回应该都是0。
            if (years.size()==0||years==null){
                //没有贷款。直接返回0
                List<Integer> empty = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                Map<String,List<Integer>> maps = new HashMap<>();
                maps.put("anShi",empty);
                maps.put("tiQian",empty);
                maps.put("yuQi",empty);
                return new ReturnT(maps);
            }
            //有数据
            year = Collections.max(years)+"";

        }
        //下拉框选择
        // returnT里面Content的  内容是map  key 是合同状态，value 是链表
        constractStatus = constractService.findCustomerContractStatusWithMonth(customerId,year.trim());
        return new ReturnT(constractStatus);
    }



    //用户身份证
    @GetMapping("/idPicture/{idCard}")
    public void getCustomerIdPicture(@PathVariable("idCard") String idCard, HttpServletResponse response) throws IOException {
        System.out.println("RestController.getCustomerPicture"+idCard);
        CustomerPictureVo customerPictureVo = customerMapper.selectCustomerPicture(idCard.trim());
        response.getOutputStream().write(customerPictureVo.getIdPicture());
    }


    /**
     * 获取用户头像的图片
     * @param idCard
     * @param response
     * @throws IOException
     */
    @GetMapping("/picture/{idCard}")
    public void getCustomerPicture(@PathVariable("idCard") String idCard, HttpServletResponse response) throws IOException {
        log.info("----> /picture/{}",idCard);
        log.info("-----> RestController.getCustomerPicture:{} ",idCard);
        CustomerPictureVo customerPictureVo = customerMapper.selectCustomerPicture(idCard.trim());
        //判断为null之后，本打算弹出提示框，发现不行
        if(customerPictureVo == null){
            log.info("----> 获取头像照片出错，该用户不存在 {}",idCard);
           return;
        }
        response.getOutputStream().write(customerPictureVo.getPicture());
    }






    @GetMapping("/validateLoanPeople")
    @ResponseBody
    //验证担保人是否存在
    public ReturnT validateLoanPeople(String loanName,String loanIdCard) {
        log.info("----> 验证担保人是否存在： url: validateLoanPeople  担保人姓名：{} 担保人身份证号:{}",loanName,loanIdCard);
        List<Customer> customers = customerMapper.findCustomerByIdCard(loanIdCard.trim(), null);
        if (true == customers.isEmpty()) {
            return new ReturnT(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_NOTFIND.getCode(), "该用户不存在");
        }
        if (false == customers.get(0).getName().equals(loanName)) {
            return new ReturnT(ExceptionCodeEnum.EXCEPTION_CODE_ENUM_USERNAME_NOT_EQUAL.getCode(), "用户名和身份证不匹配");
        }
        return ReturnT.SUCCESS;
    }


    @GetMapping("/isExist")
    @ResponseBody
    public ReturnT customerIsExist(String idCard){
        List<Customer> customerByIdCard = customerMapper.findCustomerByIdCard(idCard.trim(), null);
        if(customerByIdCard.size() == 0|| customerByIdCard==null){
            return ReturnT.FAIL;
        }else{
            return ReturnT.SUCCESS;
        }
    }

    /**
     * 忘记密码获取验证码
     */
    @GetMapping("/getRCode")
    @ResponseBody
    public ReturnT getRCode(String email, HttpSession session) throws ExecutionException, InterruptedException {
        log.info("----> URL：getRCode, email:{}",email);
        //生成rocde
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < 4; i++) {
            int j = ThreadLocalRandom.current().nextInt(10);
            stringBuffer.append(j);
        }
        String rcode = stringBuffer.toString();


        /**
         * 这里用callable来用,
         */

        session.setAttribute("rcode",rcode);
        log.info("-----> 生成的验证码:{}",rcode);
        log.info("-----> 开始给邮件发送验证码");

        FutureTask<Integer> sendEmailTask = new FutureTask<Integer>(() -> {
            try {
                sendEmail.sendEmail(email,rcode);
            } catch (Exception e) {
                log.info("发送失败");
                  return 500;
            }
            return 200;


        });
        Thread thread = new Thread(sendEmailTask,"发送邮件");
        thread.start();
        Integer result = sendEmailTask.get();
        if(result == 200){
            log.info("-----> 发送验证码 成功");
            return ReturnT.SUCCESS;
        }else{
            log.info("-----> 发送验证码 失败");
            return ReturnT.FAIL;
        }

        //发送邮件


    }





}
