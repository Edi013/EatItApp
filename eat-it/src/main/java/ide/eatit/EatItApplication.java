package ide.eatit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "ide.eatit")
public class EatItApplication {

    public static void main(String[] args) {
        SpringApplication.run(EatItApplication.class, args);
    }

}
