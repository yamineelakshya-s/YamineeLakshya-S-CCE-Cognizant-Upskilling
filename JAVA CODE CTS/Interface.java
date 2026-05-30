interface Playable {
    void play();
}
class Guitar implements Playable {
    @Override
    public void play() {
        System.out.println("Playing Guitar ");
    }
}
class Piano implements Playable {
    @Override
    public void play() {
        System.out.println("Playing Piano ");
    }
}
public class Interface {
    public static void main(String[] args) {
        Playable instrument1 = new Guitar();
        Playable instrument2 = new Piano();
        instrument1.play();
        instrument2.play();
    }
}