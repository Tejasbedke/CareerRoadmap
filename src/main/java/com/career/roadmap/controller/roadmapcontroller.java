package com.career.roadmap.controller;

import com.career.roadmap.Sbeans.UserDetail;
import com.career.roadmap.repository.UserRepository;

import com.career.roadmap.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Files;
import java.nio.file.Paths;


import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
@Controller
public class roadmapcontroller {

    @Autowired
    UserRepository userRepository;
    @Autowired
    MailService mailService;


    @GetMapping("/")
   public String home() {
        return "index"; // Corresponds to src/main/resources/templates/index.html

   }
    @GetMapping("/index")
    public String index() {
        return "index"; // Corresponds to src/main/resources/templates/index.html

    }
    @Controller
    public class CardController {

        private static final String TEMPLATE_PATH = "src/main/resources/templates/";

        @GetMapping("/cards/{cardFile}")
        @ResponseBody
        public String getCardFile(@PathVariable String cardFile) throws IOException {
            String filePath = TEMPLATE_PATH + cardFile + ".html";
            try {
                return Files.readString(Paths.get(filePath));
            } catch (IOException e) {
                throw new IOException("Error reading file: " + filePath, e);
            }
        }
    }
   @GetMapping("/law")
    public  String law(){
        return "law";
   }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; // This renders login.html
    }
    @GetMapping("/engineering")
    public String showengineering() {
        return "engineering";
    }
    @GetMapping("/medical")
    public String showmedical() {
        return "medical";
    }
    @GetMapping("/information")
    public String showinformation() {
        return "information";
    }
    @GetMapping("/creative")
    public String showcreative() {
        return "creative";
    }
    @GetMapping("/business")
    public String showbusiness() {
        return "business";
    }
    @GetMapping("/goverment")
    public String showgoverment() {
        return "goverment";
    }
    @GetMapping("/finance")
    public String showfinance() {
        return "finance";
    }
    @GetMapping("/science")
    public String showscience() {
        return "science";
    }
    @GetMapping("/education")
    public String showeducation() {
        return "education";
    }
    @GetMapping("/agriculture")
    public String showagriculture() {
        return "medical";
    }
    @GetMapping("/skilled")
    public String showskilled() {
        return "skilled";
    }
    @GetMapping("/hospitality")
    public String showhospital() {
        return "hospitality";
    }
    @GetMapping("/miscellaneous")
    public String showmiss() {
        return "miscellaneous";
    }
    @GetMapping("/sports")
    public String showsports() {
        return "sports";
    }

    @GetMapping("/signup-success")
    public String showsuccessSignup() {
        return "signup-success"; // This renders login.html
    }
    @GetMapping("/journalism")
    public String showjournalism() {
        return "journalism";
    }
    @GetMapping("/aviation")
    public String showaviation() {
        return "aviation";
    }

    @GetMapping("verification")
    public String showverification(@RequestParam String otp)
      {
        if(mailService.verifyOTP(otp)){
            return "home";
        }
        else
            return "verification";
      }
    @GetMapping("aboutus")
    public String showaboutus() {return "aboutus";}
    @GetMapping("admin")
    public String showadmin() {return "admin";}
    @GetMapping("blog")
    public String showblog() {return "blog";}
    @GetMapping("faq")
    public String showfaq() {return "faq";}
    @GetMapping("myroadmap")
    public String showmyroadmap() {return "myroadmap";}
    @GetMapping("profile")
    public String showprofile() {return "profile";}
    @GetMapping("roadmap")
    public String showroadmap() {return "roadmap";}
    @GetMapping("setting")
    public String showsetting() {return "setting";}
    @Controller
    public class MenuController {

        @GetMapping("/menu")
        public String getMenuPage() {
            return "menu"; // Looks for menu.html in /templates/
        }
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

        mailService.sendMail(userDetail.getEmail());
        // Perform a redirect to the signup-success.html page
        return "redirect:/verification";  // This will redirect the user to /signup-success
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



