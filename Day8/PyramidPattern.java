import java.util.Scanner;

public class PyramidPattern {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the number of rows: ");
        int n = scanner.nextInt();
        
        printPyramid(n);
    }
    
    public static void printPyramid(int n) {
        char middleChar = (char) (90 - (n-1));

        System.out.println(middleChar);

        for (int i = 1; i <n; i++) {

            char c =' ';
            for(int j=0;j<i;j++) {

                 c=(char)(middleChar+i);
                System.out.print(c);

            }
            System.out.print((char)(c-1));
           
            
            System.out.println();
        }
    }
}