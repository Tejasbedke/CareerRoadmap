package com.career.roadmap.controller;

import com.career.roadmap.Sbeans.UserDetail;
import com.career.roadmap.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;



import java.io.IOException;

@Controller
public class roadmapcontroller {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
   public String home() {
        return "index"; // Corresponds to src/main/resources/templates/index.html
   }

   @GetMapping("/law")
    public  String law(){
        return "law";
   }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; // This renders login.html
    }
    @GetMapping("/signup-success")
    public String showsuccessSignup() {
        return "signup-success"; // This renders login.html
    }

    @PostMapping("/login")
    public String login(@RequestParam("username") String username,
                        @RequestParam("pass") String password,
                        Model model) {
        // Check if user exists in the database
        UserDetail user = userRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            model.addAttribute("message", "Login successful!");
            return "/index"; // Redirect to dashboard page after successful login
        } else {
            model.addAttribute("error", "Invalid username or password.");
            return "login"; // Stay on the login page with an error message
        }
    }
    @GetMapping("/signup")
    public  String signup(){
        return "signup";
    }

    @PostMapping("/signup")
    public String handleSignup(@ModelAttribute UserDetail userDetail) throws IOException {

        System.out.println(userDetail);
        // Save user details with profile picture
        userRepository.save(userDetail);

        // Perform a redirect to the signup-success.html page
        return "redirect:/signup-success";  // This will redirect the user to /signup-success
    }


   /* @GetMapping("/profile-pic/{userId}")
    public ResponseEntity<byte[]> getProfilePic(@PathVariable Long userId) {
        UserDetail userDetail = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        byte[] image = userDetail.getProfilePic();

        if (image != null) {
            return ResponseEntity.ok().body(image);  // Return the profile picture as byte array
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
}



