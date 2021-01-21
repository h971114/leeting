package com.leeting.myapp.service;

import com.leeting.myapp.dao.MemberDao;
import com.leeting.myapp.model.MemberDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService{
    
	private final MemberDao memberDao;
	public MemberServiceImpl(MemberDao memberDao){
	    this.memberDao = memberDao;
	    memberDao.start();
    }

    // DB 필요
    @Override
    public MemberDto getMemberInfo(String memberId) {
	    MemberDto memberDto = null;
        try {
            memberDto = memberDao.userinfo(memberId);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return memberDto;
    }

    @Override
    public boolean join(MemberDto member) {
        try {
            memberDao.join(member);
            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }
    
    @Override
    public boolean login(MemberDto member) {
        try {
            if(memberDao.login(member.getId(), member.getPw()) ==1) {
            	return true;
            }
            else {
            return false;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }
    
    @Override
    public boolean sameId(String memberId) {
        try {
            if(memberDao.sameId(memberId)==1) {
            	return false;
            }
            else {
            return true;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }
    @Override
    public boolean sameNick(String memberNickname) {
        try {
            if(memberDao.sameNick(memberNickname)==1) {
            	return false;
            }
            else {
            return true;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }
    @Override
    public void delete(String memberId) {
        try {
            memberDao.delete(memberId);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    public void update(MemberDto member) {
        try {
            memberDao.modify(member);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

	@Override
	public String findid(MemberDto member) {
		try {
            String memberid = memberDao.findid(member);
            return memberid;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return "fail";
        }
	}
	@Override
	public String findpw(MemberDto member) {
		try {
            String memberpw = memberDao.findpw(member);
            return memberpw;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return null;
        }
	}
    @Override
    public boolean sameEmail(String memberEmail) {
        try {
            if(memberDao.sameEmail(memberEmail)==1) {
            	return false;
            }
            else {
            return true;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }
    @Override
    public List<Object> userMeet(String memberId) {
        try {
           List<Object> meetlist = memberDao.userMeetingFive(memberId);
           return meetlist;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return null;
        }
    }
//    @Override
//    public void logout(Long memberId) {
//
//    }
}
