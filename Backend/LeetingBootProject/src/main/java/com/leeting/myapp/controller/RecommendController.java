package com.leeting.myapp.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.service.MeetingService;
import com.leeting.myapp.service.MemberService;
import com.leeting.myapp.service.RecommendService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recommend")
public class RecommendController {

  // service
  private final MemberService memberService;
  
  private final MeetingService meetingService;
  
  private final RecommendService recommendService;

  @Autowired
  public RecommendController(MeetingService meetingService, MemberService memberService, RecommendService recommendService) {
    this.recommendService = recommendService;
	this.memberService = memberService;
    this.meetingService = meetingService;
  }
  @ApiOperation(value = "추천미팅", notes = "추천미팅", response = Map.class)
  @GetMapping("/cate/{categoryno}")
  public ResponseEntity<List<MeetingDto>> recommendmeets(@PathVariable(value = "categoryno") int categoryno, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /recommend/cate done");
    System.out.println("추천미팅");
    List<MeetingDto> meetslist =  meetingService.listMeeting(categoryno);
    Map<Double, MeetingDto> meetingrecommendmap = new TreeMap<Double, MeetingDto>();
    for(MeetingDto k : meetslist) {
    	double cal = calculatescore(k);
    	while(meetingrecommendmap.containsKey(cal)) {
    		cal += 0.000000000001;
    	}
    	meetingrecommendmap.put(cal, k);
    }
    int i = 1;
    List<MeetingDto> returnlist = new ArrayList<MeetingDto>();
    Map<Integer, MeetingDto> returnmap = new TreeMap<Integer, MeetingDto>();
    for(Double k : meetingrecommendmap.keySet()) {
    	if(i<=5) {
//    		returnmap.put(i, meetingrecommendmap.get(k));
    		returnlist.add(meetingrecommendmap.get(k));
    	}
    	else {
    		break;
    	}
    	i++;
    }
    System.out.println(returnmap.toString());
//    return new ResponseEntity<List>(returnmap, status);
    return new ResponseEntity<List<MeetingDto>>(returnlist, status);
  }
	@ApiOperation(value = "추천미팅", notes = "개인화추천", response = Map.class)
	@GetMapping("/reco")
	public ResponseEntity<List<MeetingDto>> recommend(@RequestParam("id") String memberid,HttpServletRequest req) throws SQLException, InterruptedException {
		System.out.println(req);
		HttpStatus status = HttpStatus.ACCEPTED;
		System.out.println("get to /recommend/reco done");
		System.out.println("추천미팅");
		List<String> meetlist = recommendService.findmeet(memberid);
		List<String> returnmeetingno = findbyitemsimil(meetlist, memberid);
		List<MeetingDto> returnmeetinginfo = new ArrayList<MeetingDto>();
		int count = 0;
		System.out.println(meetlist.toString());
		for(String meetingno : returnmeetingno) {
			if(count>=5) {
				break;
			}
			returnmeetinginfo.add(meetingService.getMeetingInfo(Integer.parseInt(meetingno)));
			count++;
		}
		Map<Double, MeetingDto> meetingrecommendmap = new TreeMap<Double, MeetingDto>();
		for(int i=1; i<=6; i++) {
			List<MeetingDto> meetslist =  meetingService.listMeeting(i);  
		    for(MeetingDto k : meetslist) {
		    	double cal = calculatescore(k);
		    	while(meetingrecommendmap.containsKey(cal)) {
		    		cal += 0.000000000001;
		    	}
		    	meetingrecommendmap.put(cal, k);
		    }	
		}
		Iterator<Double> keyindex = meetingrecommendmap.keySet().iterator();
		for(;count<5; count++) {
			boolean check = false;
			MeetingDto tmpmeeting = meetingrecommendmap.get(keyindex.next());
			for(MeetingDto i : returnmeetinginfo) {
				if(i.getMaintitle().equals(tmpmeeting.getMaintitle())) {
					check = true;
				}
			}
			for(String i : meetlist) {
				if(Integer.parseInt(i) == (tmpmeeting.getMeetingno())) {
					check = true;
				}
			}
			if(!check) {
				returnmeetinginfo.add(tmpmeeting);
			}
			else {
				count--;
			}
		}

		return new ResponseEntity<List<MeetingDto>>(returnmeetinginfo, status);
	}

private List<String> findbyitemsimil(List<String> meetlist, String memberid) {
	Map<String, Double> similmap = new HashMap<String, Double>();
		for(String str : meetlist) {
			Map<String, Set<String>> usermeetmap = new HashMap<String, Set<String>>();
			List<String> userlist = recommendService.meetinuser(str);
			for(String user : userlist) {
				List<String> newmeetinglist = recommendService.findmeet(user);
				for(String newmeets : newmeetinglist) {
					if(!newmeets.equals(str)) {
						if(usermeetmap.containsKey(newmeets)) {
							usermeetmap.get(newmeets).add(user);
						}
						else {
							usermeetmap.put(newmeets, new HashSet<String>());
							usermeetmap.get(newmeets).add(user);
						}
					}
				}
			}
			for(String findsimmeet : usermeetmap.keySet()) {
				if(!meetlist.contains(findsimmeet)) {
					if(usermeetmap.get(findsimmeet).size()>=3) {
						double calculated = calculate(str, findsimmeet, memberid);
						if(similmap.containsKey(findsimmeet)) {
							similmap.put(findsimmeet, similmap.get(findsimmeet)+calculated);
						}
						else {
							similmap.put(findsimmeet, calculated);
						}
					}
				}
			}
		}
		System.out.println(similmap.toString());
		List<String> keySetList = new ArrayList<>(similmap.keySet());
		Collections.sort(keySetList, (o1, o2) -> (similmap.get(o2).compareTo(similmap.get(o1))));
		return keySetList;
	}
private double calculate(String str, String newmeets, String memberid) {
	List<String> userlist = recommendService.meetinuser(str);
	List<String> userlist2 = recommendService.meetinuser(newmeets);
	ArrayList<Integer> score1 = new ArrayList<Integer>();
	ArrayList<Integer> score2 = new ArrayList<Integer>();
	for(String user : userlist) {
		if(user.equals(memberid)) {
			continue;
		}
		if(userlist2.contains(user)) {
			if(recommendService.likestatus(user, str) == "0") {
				score1.add(4);
			}
			else {
				score1.add(5);
			}
			if(recommendService.likestatus(user, newmeets) == "0") {
				score2.add(4);
			}
			else {
				score2.add(5);
			}
		}
	}
	double top = 0;
	double bottom1 = 0;
	double bottom2 = 0;
	for(int i =0; i<score1.size(); i++) {
		int tmp = score1.get(i);
		int tmp2 = score2.get(i);
		top+= tmp*tmp2;
		bottom1 += tmp*tmp;
		bottom2 += tmp2*tmp2;
	}
	bottom1 = Math.sqrt(bottom1);
	bottom2 = Math.sqrt(bottom2);
	double conclusion = top/ (bottom1*bottom2);
	return conclusion;
}
  static Double calculatescore(MeetingDto k) {
	int likes = k.getmeetinglike();
	int participants = k.getParticipants();
	String date = k.getDate();
	SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd");
	Date input;
	try {
		input = format.parse(date);
	} catch (ParseException e) {
		System.out.println("날짜에 문제가 있습니다");
		System.out.println(date.toString());
		e.printStackTrace();
		return Double.MAX_VALUE;
	}
	Date current = new Date();
	long calDate = current.getTime() - input.getTime();
	long calDatedays = calDate / (24*60*60*1000);
	double score = likes* 10 + participants * 10;
	long aging = (long) Math.pow(calDatedays, 2);
	score = score/ aging;
	return score*(-1);
  }
}
