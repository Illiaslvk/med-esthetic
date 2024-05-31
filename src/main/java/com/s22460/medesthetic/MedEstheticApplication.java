package com.s22460.medesthetic;

import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MedEstheticApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(MedEstheticApplication.class, args);
    }

    //logic to create admin user in run method
    // can accept a variable number of String arguments
    public void run(String... args){
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if(null == adminAccount){
            User user = new User();

            user.setEmail("admin@gmail.com");
            user.setFirstName("admin");
            user.setLastName("god");
            user.setRole(Role.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));

            userRepository.save(user);
        }
    }

}
