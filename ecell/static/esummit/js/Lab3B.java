import java.util.*;

public class Lab3B {

    public static void pr(int a[]){
        for(int i = 0; i < a.length; i++){
            System.out.print(a[i] + " ");
        }
    }

    public static int getMinInd(int a[]){
        int s = -1;
        for(int i = 0; i < a.length; i++){
            if(a[i] < 0){
                continue;
            }
            if(s == -1){
                s = i;
            }else if(a[s] > a[i]){
                s = i;
            }
        }
        return s;
    }

    public static int getOp(int a[]){
        int n = a.length;
        int s = getMinInd(a);
        int op = 0;
        while(s != -1){
            for(int i = 0; i < n; i++){
                if(a[i] >= 0)
                    a[i] -= s+1;
            }
            op++;
            s = getMinInd(a);
        }
        return op;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        int n;
        for(int i = 0; i < t; i++){
            n = sc.nextInt();
            int a[] = new int[n];
            for(int j = 0; j < n; j++){
                a[j] = sc.nextInt();
            }
            System.out.println(getOp(a));
        }
    }
}