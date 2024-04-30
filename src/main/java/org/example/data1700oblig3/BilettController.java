package org.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BilettController {
    @Autowired
    private BilettRepository rep;

    @PostMapping("/lagre")
    public void lagreBilett (Bilett innBilett) { rep.lagreBilett(innBilett); }

    @GetMapping("/hentAlle")
    public List<Bilett> hentAlle() { return rep.hentAlleBiletter(); }

    @GetMapping("/slettAlle")
    public void slettAlle() { rep.slettAlleBiletter(); }

    @PostMapping("/slettBillett")
    public void slettBillett(@RequestParam Long id) {
        rep.slettBillett(id);
    }



}
