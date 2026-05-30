class Car {
    private String make;
    private String model;
    private int year;
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    public void displayDetails() {
        System.out.println("Car Details:");
        System.out.println("Make  : " + make);
        System.out.println("Model : " + model);
        System.out.println("Year  : " + year);
        System.out.println("----------------------");
    }
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", "Innova", 2020);
        Car car2 = new Car("Honda", "City", 2022);
        Car car3 = new Car("Hyundai", "Creta", 2023);
        car1.displayDetails();
        car2.displayDetails();
        car3.displayDetails();
    }
}