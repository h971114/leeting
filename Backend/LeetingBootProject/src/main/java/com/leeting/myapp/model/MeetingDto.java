package com.leeting.myapp.model;


public class MeetingDto {
	
	private int meetingno;

	private String maintitle;

	private String subtitle;

	private String date;
	
	private String hostid;
	
	private String detail;
	
	private int categoryno;
	
	private String file;
	
	private int meetinglike;
	
	private String enddate;
	
	private int participants;
	




	public MeetingDto(String maintitle, String subtitle, String date, String hostid, String detail, int categoryno,
			String file, int meetinglike, String enddate, int participants) {
		super();
		this.maintitle = maintitle;
		this.subtitle = subtitle;
		this.date = date;
		this.hostid = hostid;
		this.detail = detail;
		this.categoryno = categoryno;
		this.file = file;
		this.meetinglike = meetinglike;
		this.enddate = enddate;
		this.participants = participants;
	}



	public MeetingDto() {
		// TODO Auto-generated constructor stub
	}



	public int getMeetingno() {
		return meetingno;
	}

	public void setMeetingno(int meetingno) {
		this.meetingno = meetingno;
	}

	public String getMaintitle() {
		return maintitle;
	}

	public void setMaintitle(String maintitle) {
		this.maintitle = maintitle;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getHostid() {
		return hostid;
	}

	public void setHostid(String hostid) {
		this.hostid = hostid;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public int getCategoryno() {
		return categoryno;
	}

	public void setCategoryno(int categoryno) {
		this.categoryno = categoryno;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}



	public int getmeetinglike() {
		return meetinglike;
	}



	public void setmeetinglike(int meetinglike) {
		this.meetinglike = meetinglike;
	}



	public String getEnddate() {
		return enddate;
	}



	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}



	public int getParticipants() {
		return participants;
	}



	public void setParticipants(int participants) {
		this.participants = participants;
	}



	@Override
	public String toString() {
		return "MeetingDto [meetingno=" + meetingno + ", maintitle=" + maintitle + ", subtitle=" + subtitle + ", date="
				+ date + ", hostid=" + hostid + ", detail=" + detail + ", categoryno=" + categoryno + ", file=" + file
				+ ", meetinglike=" + meetinglike + ", enddate=" + enddate + ", participants=" + participants + "]";
	}


	
	
	
}
