package org.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BilettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBilett(Bilett innBilett){
        String sql = "INSERT INTO Bilett (film, antall, fornavn, etternavn, telefonnr, email) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBilett.getFilm(), innBilett.getAntall(), innBilett.getFornavn(),
                innBilett.getEtternavn(), innBilett.getTelefonnr(), innBilett.getEmail());
    }
    public List<Bilett> hentAlleBiletter(){
        String sql = "SELECT * FROM Bilett";
        List<Bilett> alleBiletter = db.query(sql, new BeanPropertyRowMapper(Bilett.class));
        return alleBiletter;

    }
    public void slettAlleBiletter(){
        String sql = "DELETE FROM Bilett";
        db.update(sql);
    }


    public void slettBillett(Long id) {
        String sql = "DELETE FROM Bilett WHERE ID = ?";
        db.update(sql, id);
    }
}
