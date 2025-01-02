package ide.eatit.model.dto;

import java.math.BigDecimal;

public class ProductDto {
    private Integer id;

    private String name;

    //Value per 100g
    private double value;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
