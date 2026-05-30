class Main {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        int result2 = (10 + 5) * 2;
        int result3 = 20 - 4 * 3 + 2;
        int result4 = 100 / 10 + 5 * 3;
        int result5 = (50 - 10) / 2 + 6 * 2;
        System.out.println("Result 1 = 10 + 5 * 2 = " + result1);
        System.out.println("Explanation: * has higher precedence than +");
        System.out.println("Result 2 = (10 + 5) * 2 = " + result2);
        System.out.println("Explanation: () evaluated first");
        System.out.println("Result 3 = 20 - 4 * 3 + 2 = " + result3);
        System.out.println("Explanation: * first, then - and + left to right");
        System.out.println("Result 4 = 100 / 10 + 5 * 3 = " + result4);
        System.out.println("Explanation: / and * first, then +");
        System.out.println("Result 5 = (50 - 10) / 2 + 6 * 2 = " + result5);
        System.out.println("Explanation: () first, then / and *");
    }
}