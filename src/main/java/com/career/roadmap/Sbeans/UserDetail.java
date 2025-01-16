package com.career.roadmap.Sbeans;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "usersDetails")
@Data
public class UserDetail {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    @NotNull(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotNull(message = "Full name is required")
    @Size(min = 3, max = 100, message = "Full name must be between 3 and 100 characters")
    private String fullName;

    @NotNull(message = "Date of birth is required")
    private String dob;

    @NotNull(message = "Education status is required")
    private String educationStatus;

    //@Lob
  //  private byte[] profilePic; // This will store the profile picture as binary data in the database

      /*  // Getter and Setter for profilePic
        public byte[] getProfilePic() {
                return profilePic;
        }

        public void setProfilePic(byte[] profilePic) {
                this.profilePic = profilePic;
        }*/

    @Email(message = "Email should be valid")
    @NotNull(message = "Email is required")
    private String email;

    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotNull(message = "Confirm password is required")
    private String confirmPassword;

    @NotNull(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number should be 10 digits")
    private String mobileNumber;

    @NotNull(message = "Description is required")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", length = 500) // Customize column name and length as needed
    private String description;


}


