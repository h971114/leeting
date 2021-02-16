package com.leeting.myapp.model;

import org.springframework.web.multipart.MultipartFile;

public class NoticeDto {

	private int ROWNUM;
	private int no;
	private String title;
	private String detail;
	private String date;
	private String writer;
	private int hit;
	private String file1;
	private String file2;
	private String file3;
	private int meetingno;
	private boolean head;
	
	
	
	public int getROWNUM() {
		return ROWNUM;
	}
	public void setROWNUM(int rOWNUM) {
		ROWNUM = rOWNUM;
	}
	public NoticeDto(int no, String title, String detail, String date, String writer, int hit, String file1,
			String file2, String file3, int meetingno, boolean head) {
		super();
		this.no = no;
		this.title = title;
		this.detail = detail;
		this.date = date;
		this.writer = writer;
		this.hit = hit;
		this.file1 = file1;
		this.file2 = file2;
		this.file3 = file3;
		this.meetingno = meetingno;
		this.head = head;
	}
	public NoticeDto() {
		super();
	}
	public NoticeDto(int no, String title, String detail, String date, String writer, int hit, String file1,
			String file2, String file3) {
		super();
		this.no = no;
		this.title = title;
		this.detail = detail;
		this.date = date;
		this.writer = writer;
		this.hit = hit;
		this.file1 = file1;
		this.file2 = file2;
		this.file3 = file3;
	}
	
	
	
	
	public NoticeDto(int no, String title, String detail, String date, String writer, int hit, String file1,
			String file2, String file3, int meetingno) {
		super();
		this.no = no;
		this.title = title;
		this.detail = detail;
		this.date = date;
		this.writer = writer;
		this.hit = hit;
		this.file1 = file1;
		this.file2 = file2;
		this.file3 = file3;
		this.meetingno = meetingno;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public String getFile1() {
		return file1;
	}
	public void setFile1(String file1) {
		this.file1 = file1;
	}
	public String getFile2() {
		return file2;
	}
	public void setFile2(String file2) {
		this.file2 = file2;
	}
	public String getFile3() {
		return file3;
	}
	public void setFile3(String file3) {
		this.file3 = file3;
	}
	
	@Override
	public String toString() {
		return "NoticeDto [ROWNUM=" + ROWNUM + ", no=" + no + ", title=" + title + ", detail=" + detail + ", date="
				+ date + ", writer=" + writer + ", hit=" + hit + ", file1=" + file1 + ", file2=" + file2 + ", file3="
				+ file3 + ", meetingno=" + meetingno + ", head=" + head + "]";
	}
	public int getMeetingno() {
		return meetingno;
	}
	public void setMeetingno(int meetingno) {
		this.meetingno = meetingno;
	}
	public boolean isHead() {
		return head;
	}
	public void setHead(boolean head) {
		this.head = head;
	}

	
}
