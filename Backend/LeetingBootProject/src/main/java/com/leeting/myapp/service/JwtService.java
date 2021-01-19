package com.leeting.myapp.service;

import java.util.Map;

public interface JwtService {

	<T> String create(String key, T data, String subject);

	boolean isUsable(String jwt);

	Object get(String key, String token);


}
