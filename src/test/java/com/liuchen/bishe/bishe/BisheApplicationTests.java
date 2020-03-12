package com.liuchen.bishe.bishe;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.dao.ConstractMapper;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;
import com.liuchen.bishe.bishe.service.AdminService;
import com.liuchen.bishe.bishe.service.ConstractService;
import com.liuchen.bishe.bishe.service.CustomerService;
import com.liuchen.bishe.bishe.service.LoanService;
import com.liuchen.bishe.bishe.util.ConstractStatusWithYearUtil;
import com.liuchen.bishe.bishe.util.GetAddress;
import com.liuchen.bishe.bishe.util.PDFGenerator;
import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import com.lowagie.text.DocumentException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@SpringBootTest
class BisheApplicationTests {

    @Autowired
    private GetAddress getAddress;

    @Autowired
    private AdminService adminService;

    @Autowired
    private LoanService loanService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Resource
    private CustomerService customerService;

    @Autowired
    private ConstractMapper constractMapper;

    @Autowired
    private ConstractService constractService;



    @Test
    public void demo6(){
        PDFGenerator pdfGenerator = new PDFGenerator("templates/",".html");
        Map<String,Object> model = new HashMap<>();
        model.put("a","你好");
        model.put("b","2");
        model.put("c","3");
        model.put("d","4");

        File file = new File("/Users/liuchen/Desktop/1.pdf");

        try {
//file是要生成的文件名
//中间为modlViewName
//model传到页面的参数
            pdfGenerator.generate(file,"test",model);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }


    }


    @Test
    public void demo5(){


        java.util.Date date = new java.util.Date();
        Instant instant = date.toInstant();
        ZoneId zone = ZoneId.systemDefault();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zone);
        LocalDate date1 = localDateTime.toLocalDate();
        LocalDate date2 = date1.minusWeeks(3);
        System.out.println(date1.toEpochDay() - date2.toEpochDay());

//
//        try {
//            PageInfo pageinfo = constractService.findAllCusotmerByPage(0, 20, null, ConstractEnum.CONSTRACT_ENUM_XUQI);
//            System.out.println(pageinfo.getList().size());
//        } catch (FindException e) {
//            e.printStackTrace();
//        }

    }

    @Test
    public void demo4(){
        List<Integer> integers = constractMapper.selectConstractMinMaxYear(1001);
        System.out.println(integers.toString());


    }

    @Test
    public void demo3(){
        try {
            PageInfo allAdmin = adminService.getAllAdmin(0, 5, null);
            int size = allAdmin.getList().size();

            System.out.println(size);

        } catch (FindException e) {
            e.printStackTrace();
        }

    }


//    @Test
//    public void demo1() throws MessagingException {
//        System.out.println("开始发送");
//
//        MimeMessage message = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//        helper.setFrom("1178503733@qq.com");
//        helper.setTo("liuxiaocheng386@163.com");
//        helper.setSubject("❤");
//        helper.setText("<html><body><h1> <font color='red'>生日快乐：</font><h1><a href='http://www.baidu.com' ><img src='cid:imag1' style='width:500;height:500px '/></a></body></html>",true);
//
//        helper.addInline("imag1",new File("/Users/liuchen/Desktop/imag1.jpg"));
//
//        javaMailSender.send(message);
//        System.out.println("成功发送");
//    }



    @Test
    void contextLoads() {

        String customerAddress = getAddress.getCustomerAddress(null, " 陈村镇李家堡村32组 额饿饿");
        System.out.println(customerAddress);


//        String s = AddressUtil.spellingAddress("12312312", "3423432", "432423");
//        System.out.println(s);
//
//        List<Integer> integers = AddressUtil.dismantlingAddress(s);
//        for (Integer i:integers){
//            System.out.println(i);
//        }


    }





}
