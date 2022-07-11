import java.util.Scanner;

public class Calc {
    
    static public void main(String[] args) {
        
        Scanner scan = new Scanner(System.in);
        
        Numero n1 = new Numero();
        Numero n2 = new Numero();
        Numero res = new Numero();
        String operacao = "";
        String opc = "S";

        while( opc.equalsIgnoreCase("s") ) {
            
            System.out.println("Digite o valor 1: ");
            n1.setValor(scan.nextInt());

            System.out.println("Digite a operação a ser feita: (+)(-)(*)(/) ");
            operacao = scan.next();
            
            System.out.println("Digite o valor 2: ");
            n2.setValor(scan.nextInt());

            switch(operacao) {
                case "+" :
                    res.setValor(n1.getValor() + n2.getValor());
                    break;
                case "-" :
                    res.setValor(n1.getValor() - n2.getValor());
                    break;
                case "*" :
                    res.setValor(n1.getValor() * n2.getValor());
                    break;
                case "/" :
                    res.setValor(n1.getValor() / n2.getValor());
                    break;
            }
    
            System.out.println("Resultado: " + n1.getValor() + operacao + n2.getValor() + " = " + res.getValor());
        
            System.out.println("Deseja fazer outra conta? Digite 'S' ");
            opc = scan.next();
        }
    
    }
}