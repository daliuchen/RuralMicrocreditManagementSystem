/*
* Array 练习
* */
Array.prototype={
    //数组去重
    unique:function(arr){
        var temp=[];
        for(var i=0; i<arr.length; i++){
            if(temp.indexOf(arr[i])==-1){
                temp.push(arr[i])
            }
        }
        return temp;
    },
    //数组排序
    sorts:function(arr){
        var arr1=arr.sort(function (a,b) {
            if(a==b) return 0;
            return a-b;
        });
        return arr1;
    },
    //数组求和
    arrSun:function(arrData){
        var arrData=[1,3,6,8,3],sums=0;
        arrData.forEach(function (value,index,array) {
            console.log(array[index]==value);
            sums+=value
        });
        return sums;
    },
    //数组求平方
    arrSquares:function(arrData){
        var arrayofSquares=arrData.map(function(item,index,arr){
            return  item*item
        });
        return arrayofSquares;
    },
    //获取数组对象中特定的属性
    arrGetDataAttr:function(arrData,arrAttr){
        var emails=arrData.map(function(arrData){ return arrAttr;});
        return emails;
    },
    //二位数组扁平化
    bothArrayDelayering:function (matrix) {
        var flatten = matrix.reduce(function (previous, current) {
            return previous.concat(current);
        });
        return flatten;
    },
    //多维数组扁平化
    multidimensionalArrayDelayering:function (arr) {
        var sef=this;
        var newArr =[];
        for(var i= 0; i < arr.length; i++){
            if(arr[i] instanceof Array){
                newArr = newArr.concat(sef.multidimensionalArrayDelayering(arr[i]));
                // newArr.push.apply(newArr, Flat5(arr[i]));
            }else{
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },
    //数组排序
    compare : function (x, y) {//比较函数
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    },
    //数组去重-字符串排序
    setArr:function (arr1) {
       return Array.from(new Set(arr1))
    }
};
var arr=new Array();
arr.unique([3,5,2,4,5,3,0,3,4,1,3]); //数组去重
arr.sorts([9,8,7,6]);     //数组排序
arr.arrSquares([9,8,7,6]); //数组求平方
var users = [
    {name: "html", "email": "zhang@email.com"},
    {name: "css",   "email": "jiang@email.com"},
    {name: "jquery",  "email": "li@email.com"}
];
arr.arrGetDataAttr(users,users.email); //获取数组对象中特定的属性
var matrix = [[1, 2], [3, 4], [5, 6]];
arr.bothArrayDelayering(matrix);//二位数组扁平化
var arr2 = [[1,2,2],[3, 4, 5, 5],[6, 7, 8, 9,[11,12,[12,13,[14]]]],10];
arr.multidimensionalArrayDelayering(arr2);//多维数组扁平化
var arr1 = [23, 9, 4, 78, 3];
arr1.sort(arr.compare); //数组排序
var arr0 = [1,2,3,2,1];
//arr.setArr(arr0); //数组去重-字符串排序
arr[setArr](arr0);//另一种调用方法
//array.forEach(callback,[thisObject]);




