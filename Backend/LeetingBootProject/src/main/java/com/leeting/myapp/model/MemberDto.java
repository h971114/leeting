package com.leeting.myapp.model;

public class MemberDto {

	private String id;
	private String pw;
	private String name;
	private String nickname;
	private String mobile;
	private String email;
	private String meetinglink;
	private String photo;
	
	public MemberDto() {

	}
	public MemberDto(String id, String pw, String name, String nickname, String mobile, String email) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.nickname = nickname;
		this.mobile = mobile;
		this.email = email;
	}
	public MemberDto(String id, String pw, String name, String nickname, String mobile, String email, String meetinglink) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.nickname = nickname;
		this.mobile = mobile;
		this.email = email;
		this.meetinglink = meetinglink;
	}

	public MemberDto(String id, String pw, String name, String nickname, String mobile, String email,
			String meetinglink, String photo) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.nickname = nickname;
		this.mobile = mobile;
		this.email = email;
		this.meetinglink = meetinglink;
		this.photo = photo;
	}
	
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "MemberDto [id=" + id + ", pw=" + pw + ", name=" + name + ", nickname=" + nickname + ", mobile=" + mobile
				+ ", email=" + email + "]";
	}

	public String getMeetinglink() {
		return meetinglink;
	}

	public void setMeetinglink(String meetinglink) {
		this.meetinglink = meetinglink;
	}
	
	
}
