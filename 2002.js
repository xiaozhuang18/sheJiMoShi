/*
Created by 14486 on 2019/8/30.
    贪心算法:
         一个问题有点难,一时间找不到最优解,那么就把原问题拆成几个小问题;
         分别求每个小问题的最优解,再把这些局部最优解叠起来就算是整体最优解了;
         贪心算法得到的最终结果,很有可能并不是全局最优解,但是可能会比较接近最优解
     三步完成贪心算法
             1:定义什么是最优解
             2:定义什么是子问题的最优解
             3:分别求出子问题的最优解在堆叠出全局最优解
     案列: 0 1 背包问题
            有一个背包,最多能承载150斤的重量,现在有七个物品,重量分别为35,30,60,50,40,10,25
            价值分别为10 40 30 50 35 40 30;
     那么现在想要这个背包北走最多价值的物品 怎么背?
 */
