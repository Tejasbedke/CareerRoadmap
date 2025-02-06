package com.career.roadmap.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service("mailservice")
public class MailService {
    @Autowired
    JavaMailSender mailSender;
    public  String otp;

    public String sendMail(String to){
        String receicver=to;
        SimpleMailMessage smm=new SimpleMailMessage();
        otp=getOtp();
        String subject="Otp for Confirming Career Roadmap Account";
        String msg="Dear ,\n" +
                "The OTP to confirm Careeer Raodmap Account is "+otp+" Valid for the next 2 hours only.";

        smm.setTo(receicver);
        smm.setSubject(subject);
        smm.setText(msg);
        mailSender.send(smm);
        return otp;


    }


    public String getOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates a 4-digit OTP (1000-9999)
        return String.valueOf(otp);
    }


    public boolean verifyOTP( String userOtp) {
        if (otp != null && otp.equals(userOtp)) {
            return  true;
        } else {
            return false;
        }
    }



}
