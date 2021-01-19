package com.leeting.myapp.service;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service("jwtService")
public class JwtServiceImpl implements JwtService{

	private static final String SALT =  "leetingSecret";
	
	@Override
	public <T> String create(String key, T data, String subject){
		Date datetime = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(datetime);
		System.out.println(cal);
		cal.add(Calendar.MINUTE, 10);
		datetime = cal.getTime();
		String jwt = Jwts.builder()
						 .setHeaderParam("typ", "JWT")
						 .setHeaderParam("regDate", System.currentTimeMillis())
						 .setSubject(subject)
						 .claim(key, data)
						 .setExpiration(datetime)
						 .signWith(SignatureAlgorithm.HS256, this.generateKey())
						 .compact();
		return jwt;
	}	

	private byte[] generateKey(){
		byte[] key = null;
		try {
			key = SALT.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			
		}
		
		return key;
	}
	@Override
	public boolean isUsable(String jwt) {
		try{
			Jws<Claims> claims = Jwts.parser()
					  .setSigningKey(this.generateKey())
					  .parseClaimsJws(jwt);
			return true;
			
		}catch (Exception e) {
		}
		return false;
	}
	@Override
	public Object get(String key, String token) {
		String jwt = token;
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser()
						 .setSigningKey(SALT.getBytes("UTF-8"))
						 .parseClaimsJws(jwt);
		} catch (Exception e) {
			return "";
		}
		System.out.println(claims.getBody().toString());
		if(!claims.getBody().containsKey(key)) {
			return "";
		}
		@SuppressWarnings("unchecked")
		Object value =  claims.getBody().get(key);
		return value;
	}
}