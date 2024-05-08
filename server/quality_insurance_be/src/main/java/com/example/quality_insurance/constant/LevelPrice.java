package com.example.quality_insurance.constant;

/**
 * Lưu cấu hình giá điện, giá điện mình đang dùng là lấy theo giá ĐIỆN SINH HOẠT
 * tham khảo tại đây: https://calc.evn.com.vn/
 */

public class LevelPrice {
  public static final double level1 = 1.806; // từ 0-50
  public static final double level2 = 1.866; // từ 51-100
  public static final double level3 = 2.167; // từ 101-200
  public static final double level4 = 2.729; // từ 201-300
  public static final double level5 = 3.050; // từ 301-400
  public static final double level6 = 3.151; // từ 401 trở lên
  public static final double[] levels = {level1, level2, level3, level4, level5, level6};
  public static final int[][] numbers = {{0, 50}, {51, 100}, {101, 200}, {201, 300}, {301, 400}, {401, 99999999}};

}
