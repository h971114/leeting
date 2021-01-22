package com.leeting.myapp.model;

public class ParticipationDto {
	
	private int no;
	private int meetingno;
	private String userid;
	private boolean likestatus;
	
	public ParticipationDto() {
		super();
	}

	public ParticipationDto(int no, int meetingno, String userid, boolean likestatus) {
		super();
		this.no = no;
		this.meetingno = meetingno;
		this.userid = userid;
		this.likestatus = likestatus;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getMeetingno() {
		return meetingno;
	}

	public void setMeetingno(int meetingno) {
		this.meetingno = meetingno;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public boolean isLikestatus() {
		return likestatus;
	}

	public void setLikestatus(boolean likestatus) {
		this.likestatus = likestatus;
	}

	@Override
	public String toString() {
		return "ParticipationDto [no=" + no + ", meetingno=" + meetingno + ", userid=" + userid + ", likestatus="
				+ likestatus + "]";
	}
	
	
	
}
