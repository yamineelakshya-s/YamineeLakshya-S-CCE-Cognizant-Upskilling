import java.util.Scanner;
public class MethodOverloading {
    static int add(int a, int b) {
        return a + b;
    }
    static double add(double a, double b) {
        return a + b;
    }
    static int add(int a, int b, int c) {
        return a + b + c;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two integers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Sum of two integers     : " + add(a, b));
        System.out.print("Enter two doubles: ");
        double x = sc.nextDouble();
        double y = sc.nextDouble();
        System.out.println("Sum of two doubles      : " + add(x, y));
        System.out.print("Enter three integers: ");
        int p = sc.nextInt();
        int q = sc.nextInt();
        int r = sc.nextInt();
        System.out.println("Sum of three integers   : " + add(p, q, r));
        sc.close();
    }
}