package com.leeting.myapp.service;

import com.leeting.myapp.model.MemberDto;
import org.springframework.stereotype.Service;

public interface MemberService {

	MemberDto getMemberInfo(String memberId);
    boolean join(MemberDto member);
    boolean login(MemberDto member);
    boolean sameId(String memberId);
    void delete(String memberId);
    void update(MemberDto member);
//    void logout(Long memberId);
	boolean sameNick(String memberNickname);
	String findid(MemberDto member);
	String findpw(MemberDto member);
}

