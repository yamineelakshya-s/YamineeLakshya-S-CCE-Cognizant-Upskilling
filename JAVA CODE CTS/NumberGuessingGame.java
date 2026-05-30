import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rand = new Random();

        int number = rand.nextInt(100) + 1;
        int guess = 0;
        int attempts = 0;

        System.out.println("================================");
        System.out.println("   Welcome to Number Guessing Game!");
        System.out.println("   Guess a number between 1 and 100");
        System.out.println("================================");

        while (guess != number) {
            System.out.print("\nEnter your guess: ");
            guess = sc.nextInt();
            attempts++;

            if (guess > number) {
                System.out.println("Too High! Try a lower number.");
            } else if (guess < number) {
                System.out.println("Too Low! Try a higher number.");
            } else {
                System.out.println("================================");
                System.out.println("Correct! You guessed it!");
                System.out.println("The number was : " + number);
                System.out.println("Total attempts : " + attempts);
                System.out.println("================================");
            }
        }

        sc.close();
    }
}