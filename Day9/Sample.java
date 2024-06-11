class MyClass {
  // Static variable shared among all instances
  static int count = 0;
  
  // Static method to increment the count
  static void incrementCount() {
      count++;
  }
  
  // Static block for one-time initialization
  static {
      System.out.println("Static block executed");
  }
}

 class Main {
  public static void main(String[] args) {
      // Accessing static variable directly
      MyClass.incrementCount();
      System.out.println("Initial count: " + MyClass.count);
      
      // Calling static method to increment count
      MyClass.incrementCount();
      System.out.println("Count after increment: " + MyClass.count);
  }
}
