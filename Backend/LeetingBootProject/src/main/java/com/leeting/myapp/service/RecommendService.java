package com.leeting.myapp.service;

import com.leeting.myapp.model.MemberDto;

import java.util.List;

import org.springframework.stereotype.Service;

public interface RecommendService {

	List<String> findmeet(String userid);
	List<String> meetinuser(String meetingno);
	String likestatus(String userid, String meetingno);
}

