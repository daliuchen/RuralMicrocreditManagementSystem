package com.liuchen.bishe.bishe.controller;

import com.liuchen.bishe.bishe.util.PDFGenerator;
import com.lowagie.text.DocumentException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * @program: bishe
 * @description: 测试
 * @author: liuchen
 * @create: 2020-02-28 21:22
 **/
@Controller
public class TestController {

    @GetMapping("/test111")
    public String index(){
        return "testMain";
    }


    @GetMapping("/test")
    public void test(HttpServletResponse response){

        System.out.println("111111111++++++++++++++++++++=");
        PDFGenerator pdfGenerator = new PDFGenerator("templates/",".html");
        Map<String,Object> model = new HashMap<>();
        model.put("a","《Everythings for Sale》");
        model.put("b","《Kamikaze》");
        model.put("c","《Before I Self Destruct》");
        model.put("d","《Curtain Call: The Hits》");

        File file = new File("/Users/liuchen/Desktop/2.pdf");

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





        System.out.println("------------------------+++++++++++________++++++++++++_______+++++++_");

        InputStream in = null;
        OutputStream out = null;

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/pdf;charset=utf-8");

        try {
            in = new FileInputStream("/Users/liuchen/Desktop/2.pdf");
            byte[] b = new byte[1024];
            out = response.getOutputStream();
            int n = 0;
            while ( (n=in.read(b)) != -1 ){
                out.write(b,0,n);
            }
            out.flush();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(in == null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        File f = new File("/Users/liuchen/Desktop/2.pdf");
        if(f.exists()){
            f.delete();
        }

    }

}
