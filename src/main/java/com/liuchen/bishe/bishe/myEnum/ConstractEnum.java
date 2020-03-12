package com.liuchen.bishe.bishe.myEnum;

/**
 * @program: bishe
 * @description: 合同枚举
 * @author: liuchen
 * @create: 2020-02-16 11:00
 **/
public enum ConstractEnum {
    CONSTRACT_ENUM_JIAFANG("甲方签署",1),
    CONSTRACT_ENUM_YIFANG("乙方签署",2),
    CONSTRACT_ENUM_NOTYIFANG("乙方不签署",3),
    CONSTRACT_ENUM_WEIDAOQI("未到期",4),
    CONSTRACT_ENUM_TODAY("今天到期",5),
    CONSTRACT_ENUM_XUQI("逾期",6),
    CONSTRACT_ENUM_OVER("合同已经完成",7),
    /*
    提前还款，按时还款，逾期还款.
     */
    CONSTRACT_ENUM_TI_QIAN_MONEY("提前还款",8),
    CONSTRACT_ENUM_AN_SHI_MONEY("按时还款",9),
    CONSTRACT_ENUM_YU_QI_MONEY("逾期还款",10);

    private String  name;
    private int index;

    ConstractEnum(String name, int index) {
        this.name = name;
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    @Override
    public String toString() {
        return "ConstractEnum{" +
                "name='" + name + '\'' +
                ", index=" + index +
                '}';
    }
}
