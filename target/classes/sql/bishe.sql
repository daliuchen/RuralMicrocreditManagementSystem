-- 创建database
drop database if exists bishe;
create database bishe default charset utf8;
set names utf8;
use bishe;

-- 设置包的大小
SET GLOBAL max_allowed_packet=1073741824;


-- 创建客户表
drop table  if exists t_customer;
create table t_customer(
    `id`                   int auto_increment      comment '逻辑主键',
    `name`                 varchar(8)              comment '姓名',
    `idCard`               varchar(18)             comment '身份证号',
    `sex`                  int                     comment '性别',
    `password`             varchar(50)             comment '密码',
    `phone`                varchar(11)             comment '电话号码',
    `email`                varchar(20)             comment '邮箱',
    `address`              varchar(20)             comment '地址代号',
    `addressDetail`        varchar(50)             comment '详细地址',
    `picture`              blob                    comment '头像',
    `idPicture`            longblob                comment '身份证号',
    `isDelete`           int                     comment '是否删除',
    primary key (id)
)
engine=InnoDB
default charset utf8;

-- 创建管理员表
drop table if exists t_user;
create table t_user(
       `id`                 int auto_increment      comment '逻辑主键',
       `name`              varchar(8)              comment '姓名',
       `idCard`               varchar(18)             comment '身份证号',
       `sex`                  int                     comment '性别',
       `account`              varchar(20)             comment '账号',
       `password`             varchar(50)             comment '密码',
       `phone`               varchar(11)             comment '电话号码',
       `email`             varchar(20)             comment '邮箱',
       `address`              varchar(20)             comment '地址代号',
       `addressDetail`        varchar(50)             comment '详细地址',
       `picture`              blob                    comment '头像',
       `idPicture`            longblob                comment '身份证号',
       `isDelete`           int                     comment '是否删除',
       primary key (id)
)
engine=InnoDB
default charset utf8;


-- 创建信用分表
drop table if exists t_score;
create table t_score(
    `id`               int  not null auto_increment   comment '逻辑id',
    `customerId`              int                     comment '客户id',
    `score`                   int                     comment '用户信用分',
    primary key (id)
)
engine=InnoDB
default charset utf8;


-- 贷款申请
drop table if exists loan_application;
create table  loan_application(
    `id`                int auto_increment not null     comment '逻辑id',
    `no`                varchar(50)                     comment '申请编号',
    `customerId`        int                             comment '客户id',
    `money`             double                          comment '贷款金额',
    `time`            int                             comment '贷款时间',
    `createDate`      datetime                        comment '申请创建时间',
   `bondsmanId`      int                              comment '担保人',
   `status`           varchar(10)                     comment '申请状态',
   `assessingOfficerId`   int                         comment '操作员',
    `isDelete`           int                          comment '是否删除',
   primary key (id)
)
engine=InnoDB
default charset utf8;



-- 合同表

create table t_contract(
    `id`            int not null  auto_increment      comment '逻辑id',
    `no`            varchar(50)                       comment '合同号',
    `customerId`    int                               comment '客户id',
    `detail`        longtext                          comment '合同细节',
    `begin`         datetime                          comment '合同开始时间',
    `end`           datetime                          comment '合同结束时间',
    `money`         double                            comment '金额',
    `moneyBack`    datetime                          comment '最终还款时间',
    `status`        varchar(10)                       comment '合同状态',
    `isDelete`      int                               comment '是否删除',
    `assessingOfficerId`   int                        comment '操作员',
    `loanId`       int                               comment '申请id对应那个申请的合同',
    primary key (id)
)
engine=InnoDB
default charset utf8;

-- 创建配置表
drop table if exists t_conf;
create table t_conf(
    `id`              int not null auto_increment         comment 'id',
    `key`             varchar(10)                         comment 'key',
    `value`           varchar(10)                         comment 'value',
    primary key (id)
)
engine=InnoDB
default charset utf8;

















